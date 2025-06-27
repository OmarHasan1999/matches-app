import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/today',
    },
    {
      path: '/:date',
      name: 'today',
      component: HomeView
    },
    
  ]
});
/*
 router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  
  document.title = `${to.name}-MARK`;

  next()
})*/

export default router
