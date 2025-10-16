<script setup>
import { supabase } from '@/supabase/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  localStorage.removeItem('last_active_time')
  router.push({ name: 'login' })
}

function moveToMain() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div id="header" class="alfa-slab-one-regular">
    <div @click="moveToMain" class="title-wrapper">
      <h1 class="title">uncrushable</h1>
      <h3 class="title">admin</h3>
    </div>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<style scoped>
#header {
  position: sticky;
  width: 80vw;
  min-width: 1024px;
  height: 120px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    min-width: 0;
  }
}
.title-wrapper {
  height: fit-content;
  display: flex;
  align-items: end;
  margin: 0 0 0 20px;
}
.title {
  line-height: 100%;
}

h1 {
  color: #1a00ff;
  font-size: 60px;
  @media (max-width: 767px) {
    font-size: 42px;
  }
  @media (max-width: 479px) {
    font-size: 24px;
  }
}
h3 {
  margin-left: 10px;
  color: #ffffff;
  font-size: 40px;
  @media (max-width: 767px) {
    margin-left: 7px;
    font-size: 28px;
  }
  @media (max-width: 479px) {
    margin-left: 4px;
    font-size: 16px;
  }
}

button {
  height: fit-content;
  border: none;
  color: #ffffff;
  font-size: 18px;
  background: none;
  margin-right: 20px;

  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (max-width: 479px) {
    font-size: 6px;
  }
}
</style>
