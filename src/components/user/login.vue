<template>
    <div id='login'>
        <div id="usn" class="normal">
            <h3>Username</h3><el-input
            placeholder="请输入账号"
            clearable
            class="inputs"
            v-model="username">
            </el-input>
        </div>
        <div id="pwd" class="normal">
            <h3>Password</h3><el-input
            placeholder="请输入账号"
            clearable
            type="password"
            class="inputs"
            v-model="pwd">
            </el-input>
        </div>
        <div id='button' class="normal"><el-button type="success" plain @click="login">Login</el-button></div>
    </div>
</template>
<script>
import qs from "qs";
import Cookie from 'js-cookie'
import { Message } from 'element-ui';
export default {
    name: 'login',
    data(){
        return{
            username:'',
            pwd:''
        }
        
    },
    methods:{
        login:function(){
            var username = this.username;
            var pwd = this.pwd;
            this.$ajax.post('http://localhost:8082/auth/login',
            qs.stringify({
                username:this.username,
                pwd:this.pwd
            })).then(function(res){
                Cookie.set("Token",res.data.data);
                if(res.data.code == 0){
                    Message({
                        message: '登陆成功！',
                        type: 'success'
                    });
                }
                console.log(res);
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>
<style>
.inputs {
    width: 200px
}
.normal {
    margin-top: 50px
}
</style>


