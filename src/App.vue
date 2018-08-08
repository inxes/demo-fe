<template>
  <div id="app">
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router=true
  >
    <el-menu-item index="/123">任务list</el-menu-item>
    <el-menu-item index="/upload">百度识图</el-menu-item>
    <el-menu-item index="/secret">secret</el-menu-item>
    <!-- <el-menu-item index="/">Library</el-menu-item> -->
    <el-submenu index="2" style="float: right;">
      <template slot="title">我的工作台</template>
      <el-menu-item index="/myWorkSpace">选项1</el-menu-item>
    </el-submenu>
    <el-menu-item index="/login" style=" float: right;" v-show="showLogin">Login</el-menu-item> 
  </el-menu>
    <router-view/>
  </div>
</template>

<script>
import qs from "qs";
import Cookie from 'js-cookie'
import router from './router';
import Axios from 'axios';

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){
    if(Cookie.get("Token")){
      next()
    }else{
      next({
        path:"/login",
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
})

export default {
  name: 'App',
  data() {
    return {
      activeIndex2: '1',
      showLogin:false
    };
  },
  mounted: function (){
    this.getLoginStatus();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getLoginStatus(){
      console.log("appShowLogin"+this.showLogin)
      if(Cookie.get("Token")){
        this.showLogin = false;
      }else{
        this.showLogin = true;
      }
    }
  },
  watch:{
    showLogin:function(newValue,oldValue){
      this.getLoginStatus();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
