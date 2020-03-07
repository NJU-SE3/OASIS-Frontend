import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/views/mainpage'
import SearchRes from '@/views/result'
import Ranking from '@/views/ranking'
import Admin from "@/views/admin"

import {getRequest} from "../utils/request"

Vue.use(Router)

const router= new Router({

  mode: "history",

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/mainpage',
      name: "MainPage",
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
    {
      path: '/admin',
      name: "Admin",
      component: Admin
    }
  ],
});

router.beforeEach((to, from, next) => {

  if(to.name=='Admin'){
    next();
  }
  getRequest("/api/permission/paper").then((response) => {
    if(response.data){
      next();
    }
    else{
      console.log("error");
      next("/admin");
    }
  })
})

export default router;
