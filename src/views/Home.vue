<template>
  <div id="home-wrapper">
    <h1 class="alfa-slab-one-regular menu-title">home</h1>
    <div id="home-component">
      <div class="img-wrapper">
        <!-- 506 183 -->
      </div>
      <div class="button-wrapper"></div>
    </div>
  </div>
</template>

<style scoped>
#home-wrapper {
  width: 90%;
  margin: auto;
}
#home-component {
  height: 300px;
  width: 100%;

  background-color: #e4e4e4;
  border-radius: 35px;

  display: flex;
  @media (max-width: 767px) {
    display: block;
  }
}
.img-wrapper {
  background-color: rebeccapurple;
  width: 75%;
  height: 100%;
  border-radius: 8px;
  @media (max-width: 767px) {
    width: 100%;
  }
}

.button-wrapper {
  background-color: skyblue;
  width: 25%;
  height: 100%;
  border-radius: 8px;
  @media (max-width: 767px) {
    width: 100%;
  }
}
.img {
  width: 506px;
  height: 183px;
  background-color: pink;
}
</style>
