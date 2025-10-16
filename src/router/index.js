import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import MainView from '@/views/Main.vue'
import PostView from '@/views/Post.vue'
import PostEditor from '@/views/PostEditor.vue'
import WarningView from '@/views/Warning.vue'
import { supabase } from '@/supabase/supabase'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: MainView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/post/:uuid',
    name: 'postDetail',
    component: PostView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/post',
    name: 'uuidMissing',
    redirect: '/warning',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/post/new',
    name: 'create',
    component: PostEditor,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/post/edit/:uuid',
    name: 'edit',
    component: PostEditor,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/post/edit',
    name: 'uuidMissing',
    redirect: '/warning',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/warning',
    name: 'warning',
    component: WarningView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    redirect: '/warning',
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const THREE_DAYS_MS = 60 * 60 * 24 * 3 * 1000
  const lastActiveTime = localStorage.getItem('last_active_time')
  const currentTime = Date.now()

  // 3일 이상 미접속 자동 로그아웃
  if (lastActiveTime && currentTime - parseInt(lastActiveTime) > THREE_DAYS_MS) {
    await supabase.auth.signOut()
    localStorage.removeItem('last_active_time')

    if (to.name !== 'login') {
      next('/login')
    } else {
      next()
    }
    return
  }
  // 마지막 활성화 시간 업데이트
  if (lastActiveTime) {
    localStorage.setItem('last_active_time', currentTime)
  }

  // 로그인 상태 확인
  const requireAuth = to.matched.some((record) => record.meta.requireAuth)
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const isAuth = session

  if (requireAuth && !isAuth) {
    next('/login')
  } else if (to.path == '/login' && isAuth) {
    next('/')
  } else {
    next()
  }
})

export default router
