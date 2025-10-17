<script setup>
import { defineProps } from 'vue'
const props = defineProps({ imgURL: String, text: String, clickAction: Function })
</script>

<template>
  <button @click="clickAction">
    <img :src="props.imgURL" />
    <p>{{ props.text }}</p>
  </button>
</template>

<style scoped>
button {
  width: 80px;
  height: 40px;
  margin: 0 8px;
  padding: 0;
  border: none;
  border-radius: 50px;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
  }
  p {
    margin-left: 4px;
    margin-bottom: 2px;
  }
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 4px;
    p {
      display: none;
    }
  }
  @media (max-width: 479px) {
    width: 32px;
    height: 32px;
  }
}
</style>
