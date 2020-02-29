import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/views/mainpage'
import SearchRes from '@/views/result'
import Ranking from '@/views/ranking'
import Testing from '@/views/copy'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/mainpage',
      name:"MainPage",
      component: MainPage,
    },
    {
      path: '/result',
      name:"SearchRes",
      component: SearchRes,
    },
    {
      path: '/ranking',
      name:"Ranking",
      component: Ranking,
    },
  ]
})
