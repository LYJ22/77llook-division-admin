<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import supabaseAPI from '@/supabase/crud'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const isLoading = ref(true)
const title = ref('')
const content = ref('')
const route = useRoute()
const uuid = route.params.uuid

onMounted(async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabaseAPI.fetchPostFromSupabase(uuid)

    if (error) throw error
    title.value = data.title
    content.value = data.content
  } catch (error) {
    console.error('post fetch failed : ', error.message)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <Header />
  <div id="post-wrapper">
    <div v-if="isLoading" class="loading">
      <div class="loading">loading...</div>
    </div>
    <div v-else>
      <div class="post-title pretendard-jp">{{ title }}</div>
      <div class="post-content ql-editor" v-html="content"></div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
#post-wrapper {
  width: 90%;
  margin: auto;
  height: fit-content;
  min-height: 100px;
  padding: 12px;

  background-color: #e4e4e4;
  border-radius: 35px;
}
.post-title {
  margin: 0 12px;
  padding: 12px 0;
  border-bottom: 2px solid #000000;

  color: #02000b;
  font-weight: 900;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0;
}
.post-content {
  width: 100%;
}
.post-content :deep(img) {
  max-width: 100%;
  height: auto;
}
.loading {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
