import { createRouter, createWebHistory } from 'vue-router'
import landingView from '../views/landingView.vue'
import axios from 'axios';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'О сервисе',
      component: landingView
    },
    {
      path: '/checker',
      name: 'Чекер',
      meta : {
        guard : true
      },
      component: () => import(/* webpackChunkName: "checker" */ '../views/checkerView.vue'),
    },
    {
      path: '/checker/finish',
      name: 'Чекер - Результаты',
      meta : {
        guard : true
      },
      component: () => import(/* webpackChunkName: "payment" */ '../views/checkerFinishView.vue')
    },
    {
      path: '/dashboard',
      name: 'Личный аккаунт',
      meta : {
        guard : true
      },
      component: () => import(/* webpackChunkName: "payment" */ '../views/dashboardView.vue')
    },
    {
      path: '/payment',
      meta : {
        guard : true
      },
      name: 'Оплата',
      component: () => import(/* webpackChunkName: "payment" */ '../views/paymentView.vue')
    },
    {
      path: '/tools',
      name: 'Инструменты',
      component: () => import(/* webpackChunkName: "tools" */ '../views/toolsView.vue')
    },
    {
      path: '/faq',
      name: 'F.A.Q.',
      component: () => import(/* webpackChunkName: "faq" */ '../views/faqView.vue')
    },
    {
      path: '/register',
      name: 'Регистрация',
      component: () => import(/* webpackChunkName: "register" */ '../views/registerView.vue')
    },
    {
      path: '/login',
      name: 'Вход',
      component: () => import(/* webpackChunkName: "login" */ '../views/loginView.vue')
    },
    {
      path: '/404',
      name: 'Not Found - 404',
      component: () => import('../views/errorView.vue'),
      meta: { notFound: true }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = `TG•Service - ${to.name}`;
  try {
    
    if(to.meta.guard && !store.state.meActive){
    
      let user = await axios.get('https://checker.tg-service.pro/api/me')
      if(user.status == 200){
        if(user.data.email){
          store.state.meActive = true;
          next()
        }
        else{
          router.push('/')
        }
      }
      else{
        router.push('/')
      }
    }
    else{
      next();
    }
  } catch (error) {
    console.log(error);
    
    router.push('/')
  }
  
  
});

export default router
