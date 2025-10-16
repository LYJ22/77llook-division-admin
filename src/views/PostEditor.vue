<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import ImageDropAndPaste from 'quill-image-drop-and-paste'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'formula'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],

  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]
const modules = [
  {
    // 이미지 크기 조절, 정렬
    name: 'blotFormatter',
    module: BlotFormatter,
    options: {},
  },
  {
    // 이미지 드래그앤드롭으로 삽입
    name: 'imageDropAndPaste',
    module: ImageDropAndPaste,
    options: {},
  },
]

import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import supabaseAPI from '@/supabase/crud'
import { useRoute } from 'vue-router'

const quillEditor = ref(null)
const title = ref('')
const info = ref('')
const content = ref('')
const imagePaths = ref('')

const route = useRoute()
const uuid = route.params.uuid
const isEditMode = !!uuid
const isSubmitting = ref(false)

const handleSubmit = async () => {
  // 다중 실행 방지
  if (isSubmitting.value) {
    return
  }
  isSubmitting.value = true

  // 에디터 내용 가져오기
  const quill = quillEditor.value.getQuill()
  const delta = quill.getContents()
  const hasContent = delta.ops.some((op) => {
    if (typeof op.insert === 'string') {
      return op.insert.trim().length > 0
    }
    return op.insert && typeof op.insert === 'object' // 이미지 등
  })

  //제목 없음
  if (title.value.length == 0) {
    isSubmitting.value = false
    alert('제목을 입력해주세요.')
    return
  }
  //본문 없음
  else if (!hasContent) {
    isSubmitting.value = false
    alert('내용을 입력해주세요.')
    return
  } else {
    const updatedHtml = await supabaseAPI.replaceBase64WithUrls(content.value)
    modeAction(updatedHtml)
    isSubmitting.value = false
  }
}

const modeAction = async (updatedHtml) => {
  if (isEditMode) {
    //수정
    const isComfirmed = confirm('해당 게시물을 수정하시겠습니까?')
    if (isComfirmed) {
      let imagePathsAfterEdit = supabaseAPI.findImageURLFromHTML(updatedHtml)
      let deletedPaths = imagePaths.value.filter((path) => !imagePathsAfterEdit.includes(path))

      await supabaseAPI.updatePostToSupabase(
        uuid,
        title.value,
        info.value,
        updatedHtml,
        deletedPaths,
      )
    }
  } else {
    //저장
    await supabaseAPI.savePostToSupabase(title.value, info.value, updatedHtml)
  }
}

onMounted(async () => {
  if (isEditMode) {
    const { data, error } = await supabaseAPI.fetchPostFromSupabase(uuid)
    if (error) {
      console.error('post fetch failed : ', error.message)
    } else {
      title.value = data.title
      info.value = data.info
      content.value = data.content

      imagePaths.value = supabaseAPI.findImageURLFromHTML(data.content)
    }
  }
})
</script>

<template>
  <Header />
  <div class="title-wrapper">
    <h1>{{ isEditMode ? '게시물 수정' : '게시물 생성' }}</h1>
    <button @click="handleSubmit">{{ isEditMode ? '수정' : '저장' }}</button>
  </div>

  <div class="textarea-wrapper">
    <h2>제목:</h2>
    <input type="text" maxlength="50" placeholder="제목을 입력하세요(최대50자)" v-model="title" />
  </div>
  <div class="textarea-wrapper">
    <h2>설명:</h2>
    <textarea
      maxlength="200"
      placeholder="부제/설명을 입력하세요(선택, 최대200자)"
      v-model="info"
    ></textarea>
  </div>
  <div class="quill-wrapper">
    <QuillEditor
      ref="quillEditor"
      v-model:content="content"
      content-type="html"
      style="height: 500px"
      :toolbar="toolbarOptions"
      placeholder="내용을 입력하세요..."
      :modules="modules"
    />
  </div>
  <div style="background-color: white; width: 100%; height: 200px">
    {{ content }}
  </div>
  <Footer />
</template>

<style scoped>
.quill-wrapper {
  width: 90%;
  margin: auto;

  background-color: #fff;
}

.title-wrapper {
  width: 90%;
  margin: auto;
  color: #ffffff;

  display: flex;
  justify-content: space-between;
}
button {
  width: 80px;
  border-radius: 35px;
  font-size: 16px;
}
.textarea-wrapper {
  width: 90%;
  margin: 12px auto;
  color: #ffffff;
  display: flex;

  h2 {
    width: fit-content;
    margin: 8px 8px 0 0;
  }
  input {
    flex-grow: 1;
    margin-top: 8px;
    padding: 0 4px;
  }
  textarea {
    flex-grow: 1;
    margin-top: 8px;
    padding: 4px;
    height: 56px;
  }
}
</style>
