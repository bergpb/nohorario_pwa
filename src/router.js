import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './views/Inicio.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/linhas',
      name: 'linhas',
      component: () => import('./views/Linhas.vue')
    },
    {
      path: '/horarioslinha',
      name: 'horarioslinha',
      component: () => import('./views/HorariosLinha.vue')
    },
    {
      path: '/horariosproximos',
      name: 'horariosproximos',
      component: () => import('./views/HorariosProximos.vue')
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('./views/Sobre.vue')
    }
  ]
})
