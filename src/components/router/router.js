import News from '../comics/pages/News.vue'


import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
  { path: '/', 
  component: News },

  { path: '/contact', 
  component: () => import('../comics/pages/Contact.vue') },

  { path: '/comics', 
  component: () => import('../comics/pages/Comics.vue') },

  { path: '/ofertas', 
  component: () => import('../comics/pages/Ofertas.vue') },

  { path: '/login', 
  component: () => import('../comics/pages/Login.vue') },

  { path: '/signUp', 
  component: () => import('../comics/pages/CreateAcount.vue') },

  { path: '/detallesComics', 
  component: () => import('../comics/pages/DetallesComics.vue') },

  { path: '/perfil', 
  component: () => import('../comics/pages/Profile.vue') },

  { path: '/parfil/carrito', 
  component: () => import('../comics/pages/Carrito.vue') },

  { path: '/:pathMatch(.*)*', 
  component: () => import('../comics/pages/NotFound404.vue') }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes,
})

export default router
