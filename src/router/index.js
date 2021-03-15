import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    component: () => import('./../components/Login.vue')
  },
  {
    path: '/home',
    component: () => import('./../components/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('./../components/Welcome.vue')
      },
      {
        path: '/users',
        component: () => import('./../components/user/User.vue')
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径跳转回来
  //next 函数，表示放行
  //next() 放行 
  //next('/login') 强制跳转
  if(to.path === '/login'){
    next();
  }else{
    //获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr){
      next('/login');
    }else{
      next();
    }
  }
});

export default router
