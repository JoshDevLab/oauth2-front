import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/Login.vue'
import redirect from "@/views/Redirect";
import home from "@/views/HomeView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/oauth/redirect', 
    name: 'redirect', 
    component: redirect
  }
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && to.name !== 'register' && !VueCookies.get('accessToken')) {
//     // If the user is not logged in and is trying to access a protected route,
//     // redirect them to the login page
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })

export default router