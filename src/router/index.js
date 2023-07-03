import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/front/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    component: () => import('../views/back/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/back/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/back/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/back/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/back/Coupons.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/front/UserBoard.vue'),
    children: [
      {
        path: 'productlist/:category',
        component: () => import('../views/front/ProductList.vue')
      },
      {
        path: 'usercart',
        component: () => import('../views/front/UserCart.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/front/UserProduct.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/front/UserCheckout.vue')
      }
    ]
  },
  {
    path: '/policy',
    component: () => import('../views/front/Policy.vue')
  },
  {
    path: '/contact',
    component: () => import('../views/front/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
