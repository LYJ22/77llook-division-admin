<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    // 1. 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      throw error
    }
    // 2. 로그인 성공 시 로그인 시간 저장
    localStorage.setItem('last_active_time', Date.now())

    // 3. 메인 페이지로 이동
    router.push({ name: 'home' })
  } catch (err) {
    if (err.message === 'Invalid login credentials') {
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
    } else {
      console.error('로그인 오류:', err.message)
      alert('로그인 중 오류가 발생했습니다. 관리자에게 문의하세요.')
    }
  }
}
</script>

<template>
  <div id="login-wrapper">
    <h1 class="alfa-slab-one-regular">uncrushable</h1>
    <h2 class="alfa-slab-one-regular">admin page</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="email" placeholder="이메일" />
      <input type="password" v-model="password" placeholder="비밀번호" />
      <button type="submit" class="hvr-back-pulse">Login</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
#login-wrapper {
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  margin: auto;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-height: 373px) {
    top: 0;
    transform: none;
  }
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
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  width: 200px;
  padding: 12px;
  margin: 10px;
  border: 1px solid #1a00ff;
}
button {
  width: 120px;
  padding: 8px;
  margin-top: 40px;
  border: 0;
}

/* Back Pulse */
@-webkit-keyframes hvr-back-pulse {
  50% {
    background-color: rgba(26, 0, 255, 0.75);
  }
}
@keyframes hvr-back-pulse {
  50% {
    background-color: rgba(26, 0, 255, 0.75);
  }
}
.hvr-back-pulse {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  overflow: hidden;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: color, background-color;
  transition-property: color, background-color;
}
.hvr-back-pulse:hover,
.hvr-back-pulse:focus,
.hvr-back-pulse:active {
  -webkit-animation-name: hvr-back-pulse;
  animation-name: hvr-back-pulse;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background-color: #1a00ff;
  background-color: #1a00ff;
  color: white;
}
</style>
