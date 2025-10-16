<script setup>
import router from '@/router'
const moveToMain = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="wrapper">
    <div @click="moveToMain">
      <h1 class="alfa-slab-one-regular">uncrushable</h1>
      <h2 class="alfa-slab-one-regular">admin page</h2>
    </div>
    <div class="preview">
      <p>잘못된 접근입니다</p>
      <RouterLink to="/">메인으로 이동</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 90%;
  height: 100%;
  margin: auto;
  padding: 10vh 0;
  @media (max-height: 500px) {
    height: 500px;
    padding: 50px 0;
  }
}
.preview {
  background-color: #e4e4e4;
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  color: #1a00ff;
  font-size: 80px;
  display: flex;
  justify-content: center;
  line-height: 100%;

  @media (max-width: 767px) {
    font-size: 64px;
  }
  @media (max-width: 479px) {
    font-size: 48px;
  }
}
h2 {
  color: #ffffff;
  font-size: 60px;
  display: flex;
  justify-content: center;
  line-height: 100%;
  margin-bottom: 40px;

  @media (max-width: 767px) {
    font-size: 48px;
  }
  @media (max-width: 479px) {
    font-size: 36px;
  }
}
p {
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    font-size: 21px;
  }
  @media (max-width: 479px) {
    font-size: 12px;
  }
}
</style>
