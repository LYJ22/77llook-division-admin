<script setup>
import { supabase } from '@/supabase/supabase'
import { ref } from 'vue'
import StyledButton from './GalleryButton.vue'
import supabaseAPI from '@/supabase/crud'
import editImg from '@/assests/editing_icon.png'
import delImg from '@/assests/delete_remove_icon.png'
import router from '@/router'

const posts = ref([])

const {
  data: { session },
} = await supabase.auth.getSession()

if (session) {
  const { data, error } = await supabase
    .from('gallery')
    .select('uuid,title,info')
    .order('uuid', { ascending: false })
  if (error) {
    console.error('gallery list fetch failed : ', error.message)
  } else {
    posts.value = data
  }
}

const viewPost = (postUuid) => {
  router.push({ name: 'postDetail', params: { uuid: postUuid } })
}

const editPost = (postUuid) => {
  router.push({ name: 'edit', params: { uuid: postUuid } })
}

const deletePost = (uuid) => {
  const isComfirmed = confirm('해당 게시물을 삭제하시겠습니까?')

  if (isComfirmed) {
    supabaseAPI.deletePostFromSupabase(uuid)
    posts.value = posts.value.filter((post) => post.uuid !== uuid)
  }
}
</script>

<template>
  <p class="emptyPost" v-if="posts.length == 0">게시물이 없습니다.</p>
  <ul v-else>
    <li v-for="post in posts" :key="post.uuid">
      <div class="post" @click="() => viewPost(post.uuid)">
        <h3>{{ post.title }}</h3>
        <p>{{ post.info }}</p>
      </div>
      <div class="button-wrapper">
        <StyledButton
          :imgURL="editImg"
          text="수정"
          style="color: #0080ff; background-color: #e5f3fd"
          :clickAction="() => editPost(post.uuid)"
        />
        <StyledButton
          :imgURL="delImg"
          text="삭제"
          style="color: red; background-color: #f9e3e3"
          :clickAction="() => deletePost(post.uuid)"
        />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.emptyPost {
  width: 100%;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  width: 100%;
}
li {
  padding: 12px 0;
  border-bottom: 1px solid #aaaaaa;
  display: flex;
  justify-content: space-between;
}
li:last-child {
  border-bottom: none;
}
.post {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.button-wrapper {
  display: flex;
  align-items: center;
}
</style>
