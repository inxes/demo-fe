import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/user/login'
import todoList from '@/components/test/todoList'
import upload from '@/components/image/upload'
import uploadToWall from '@/components/image/uploadToWall'
import myWorkSpace from '@/components/user/myWorkSpace'
import secret from '@/components/secret/secret'
import show from '@/components/show'
import Axios from 'axios';

Vue.use(Router)

Axios.defaults.withCredentials = true;

Axios.interceptors.request.use(config => {
  if(Cookie.get('Token')) {
    config.headers.Authorization = Cookie.get('Token');
  }
  return config;
}, err => {
  return Promise.reject(err);
})

Axios.interceptors.response.use(response => {
  return response;
},error => {
  if(error.response){
    switch(error.response.status){
      case 123:
        Cookie.remove("Token")
        Router.replace({
          path:'/login',
          query:{
            redirect:Router.currentRoute.fullPath
          }
        })
    }
  }
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'show',
      component: show
    },
    {
      path: '/myWorkSpace',
      name : 'myWorkSpace',
      component : myWorkSpace
    },
    {
      path : '/uploadToWall',
      name : 'uploadToWall',
      component : uploadToWall,
      meta : {
        requireAuth : true
      }
    },
    {
      path : '/secret',
      name : 'secret',
      component : secret,
      meta: {
        requireAuth : true
      },
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload,
      meta: {
        requireAuth : true
      }
    },
    {
      path: '/123',
      name: 'todoList',
      component: todoList,
      meta: {
        requireAuth : true
      },
    },{
      path: '/login',
      name: 'login',
      component: login
    }
  ],
})
