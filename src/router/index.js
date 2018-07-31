import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/user/login'
import todoList from '@/components/test/todoList'
import upload from '@/components/image/upload'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/123',
      name: 'todoList',
      component: todoList
    },{
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
