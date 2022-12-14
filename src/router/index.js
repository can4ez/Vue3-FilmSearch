import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import MovieView from '@/views/MovieView.vue'
import TopView from '@/views/TopView.vue'

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory(), // createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    },
    {
      path: '/movie',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/top250',
      name: 'top',
      component: TopView
    }
  ]
})

export default router
