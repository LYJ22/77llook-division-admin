<script setup>
import StyledButton from '@/components/GalleryButton.vue'
import GalleryList from '@/components/GalleryList.vue'
import addImg from '@/assests/add_icon.png'
import router from '@/router'

const moveToCreatePost = () => {
  router.push({ name: 'create' })
}
</script>

<template>
  <div id="home-wrapper">
    <div style="display: flex; justify-content: space-between">
      <h1 class="alfa-slab-one-regular menu-title">gallery</h1>
      <StyledButton :imgURL="addImg" text="추가" :clickAction="moveToCreatePost" />
    </div>

    <div id="home-component">
      <Suspense>
        <GalleryList />
        <template #fallback>
          <div class="loading">loading...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
#home-wrapper {
  width: 90%;
  margin: auto;
}
#home-component {
  width: 100%;
  height: fit-content;
  padding: 8px 16px;

  background-color: #e4e4e4;
  border-radius: 35px;

  display: flex;
  @media (max-width: 767px) {
    display: block;
  }
}
.loading {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
