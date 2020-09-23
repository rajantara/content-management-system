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

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
 
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {


  if (to.matched.some(record => record.meta.requiresAuth)) {

    // this route requires auth, check if logged in
    if (localStorage.getItem('Authorization')) {
      console.log(localStorage.getItem('Authorization'))
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      }
      try {
        const { data: { valid } } = await axios.post('http://localhost:3000/api/users/check', {}, {
          headers
        })
        //check if token still valid (in some case token could expire)
        if (!valid) {
          alert('Seem your token is invalid please login again')
          localStorage.removeItem("email");
          localStorage.removeItem("Authorization");
          router.push('/login')
        } else {
          next()
        }
      } catch (error) {
        console.log(error)
      }
      //seting up req.headers with axios need to pass object req.body as 2nd parameter and object headers as 3th parameter, if you forget to put second parameter, server will send response error!

    } else {
      router.push('/')
    }

  } else {
    next()
  }
})

export default router
