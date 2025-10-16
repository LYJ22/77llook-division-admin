<script setup>
import Header from '@/components/Header.vue'
// import Home from '@/views/Home.vue'
import Gallery from '@/views/Gallery.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <div>
    <Gallery />
  </div>
  <Footer />
</template>

<style>
h1 {
  font-size: 32px;
  @media (max-width: 767px) {
    font-size: 26px;
  }
  @media (max-width: 479px) {
    font-size: 20px;
  }
}
</style>
