import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2)


Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/SignUp')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home'),
    meta: {
      requiresAuth: true
    }
  },
 
]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLoggedin)) {
      if (!localStorage.getItem('token')) {
          router.push('/login')
      }else{
          next()
      }
  } else {
      next()
  }
})


export default router
