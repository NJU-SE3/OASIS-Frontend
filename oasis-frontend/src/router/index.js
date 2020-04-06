import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'

import MainPage from '@/views/mainpage'
import SearchRes from '@/views/result'
import Ranking from '@/views/ranking'
import Admin from "@/views/admin"

import Sort from "@/views/sort"

import AuthorProfile from "@/views/authorProfile"
import AffiliationProfile from "@/views/affiliationProfile"
import ConferenceProfile from "@/views/conferenceProfile"
import FieldProfile from "@/views/fieldProfile"


import {getRequest} from "../utils/request"

Vue.use(Router)

const router= new Router({

  mode: "history",

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },

  routes: [
    {
      path: '/',
      redirect: '/mainpage'
    },
    {
      path: '/mainpage',
      name: "MainPage",
      component: MainPage,
    },
    {
      path: '/result',
      name: "SearchRes",
      component: SearchRes,
    },
    {
      path: '/ranking',
      name: "Ranking",
      component: Ranking,
    },
    {
      path: '/admin',
      name: "Admin",
      component: Admin
    },
    {
      path: "/sort",
      name: "Sort",
      component: Sort
    },
    {
      path: "/author-profile",
      name: "AuthorProfile",
      component: AuthorProfile
    },
    {
      path: "/affiliation-profile",
      name: "AffiliationProfile",
      component: AffiliationProfile
    },
    {
      path: "/conference-profile",
      name: "ConferenceProfile",
      component: ConferenceProfile
    },
    {
      path: "/field-profile",
      name: "FieldProfile",
      component: FieldProfile
    },
  ],
});

//   router.beforeEach((to, from, next) => {
//   if (to.name == 'Admin') {
//     next();
//   } else {
//     getRequest("/api/permission/paper").then((response) => {
//       if (response.data) {
//         next();
//       }
//       else {
//         console.log("error");
//         if (to.name != 'MainPage') {
//           Message({
//             type: "warning",
//             message: 'Data has not been initialized.',
//             center: true
//           })
//           next("/mainpage");
//         } else {
//           next();
//         }
//       }
//     })
//       .catch(err => {
//         console.log("err")
//         Message({
//           type: "error",
//           message: '服务正在疯狂恢复中，烦请稍候。',
//           center: true
//         })
//       })
//   }

// })

export default router;
