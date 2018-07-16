import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
    // {
    //   path: '/',
    //   name: 'upload',
    //   component: upload
    // }
    {
      path: '/',
      name: 'todoList',
      component: todoList
    }
  ]
})
