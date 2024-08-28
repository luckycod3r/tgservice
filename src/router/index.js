import { createRouter, createWebHistory } from 'vue-router'
import landingView from '../views/landingView.vue'

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
      component: () => import(/* webpackChunkName: "checker" */ '../views/checkerView.vue'),
    },
    {
      path: '/checker/finish',
      name: 'Чекер - Результаты',
      component: () => import(/* webpackChunkName: "payment" */ '../views/checkerFinishView.vue')
    },
    {
      path: '/dashboard',
      name: 'Личный аккаунт',
      component: () => import(/* webpackChunkName: "payment" */ '../views/dashboardView.vue')
    },
    {
      path: '/payment',
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

router.beforeEach((to, from, next) => {
  document.title = `TG•Service - ${to.name}`;
  next();
});

export default router
