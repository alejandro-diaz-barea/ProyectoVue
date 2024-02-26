import News from '../comics/pages/News.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import checkAuthentication from '../comics/store/authstore'

const routes = [
    {
        path: '/',
        component: () => import("../comics/layout/LayoutPublic.vue"),
        children: [
            {
              path: '',
              component: News
            },
            {
              path: 'contact',
              component: () => import('../comics/pages/Contact.vue')
            },
            {
              path: 'comics',
              component: () => import('../comics/pages/Comics.vue'),
            }, 
            {
              path: 'ofertas',
              component: () => import('../comics/pages/Ofertas.vue'),
            },
            {
              path: 'login',
              component: () => import('../comics/pages/Login.vue'),
            },
            {
              path: 'signUp',
              component: () => import('../comics/pages/CreateAcount.vue'),
            },
        ]
    },
    {
        path: '/private',
        component: () => import("../comics/layout/LayoutPrivate.vue"),
        children: [
            {
              path: 'details-comics/:id', 
              name: 'details-comics', 
              beforeEnter: (to, from, next) => {
                  const loggedIn = checkAuthentication()
                  if (!loggedIn) {
                      next('/login')
                  } else {
                      next()
                  }
              },
              component: () => import('../comics/pages/DetallesComics.vue')
            },
            {
              path: '/perfil',
              beforeEnter: (to, from, next) => {
                  const loggedIn = checkAuthentication()
                  if (!loggedIn) {
                      next('/login')
                  } else {
                      next()
                  }
              },
              component: () => import('../comics/pages/Profile.vue')
            },
            {
              path: '/perfil/carrito',
              beforeEnter: (to, from, next) => {
                  const loggedIn = checkAuthentication()
                  if (!loggedIn) {
                      next('/login')
                  } else {
                      next()
                  }
              },
              component: () => import('../comics/pages/Carrito.vue')
            },
        ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../comics/pages/NotFound404.vue')
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
