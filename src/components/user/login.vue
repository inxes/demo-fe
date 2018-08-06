<template>
    <div id='login'>
        <div id="usn" class="normal">
            <h3>Username</h3>
            <el-input
            placeholder="请输入账号"
            clearable
            class="inputs"
            v-model="username"
            @change="chooseUsername()">
            </el-input>
        </div>
        <div v-show="hasRepeatUsername" class="tips">
            <span>该用户名已被使用</span>
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
        <div id='button' class="normal">
            <el-button type="success" plain @click="login">Login</el-button>
        </div>
        <div class="logon">
            <el-button type="text" @click="dialogFormVisible = true">没有账号？点击注册</el-button>

            <el-dialog title="注册" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.pwd" auto-complete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input v-model="form.checkpwd" auto-complete="off" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="logon()">确 定</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import Cookie from 'js-cookie'
import { Message } from 'element-ui';
import router from '@/router'
import { MessageBox } from 'element-ui';
import app from '@/App';

export default {
    name: 'login',
    data(){
        return{
            username:'',
            pwd:'',
            hasRepeatUsername:false,
            newname:'',
            dialogFormVisible:false,
            form: {
                name: '',
                pwd:'',
                email:'',
                checkpwd:'',
            },
            formLabelWidth: '50px'
        }
    },
    mounted:function(){
        this.login();
    },
    methods:{
        login:function(){
            console.log("appSHowlogin"+app.data.showLogin);
            this.$ajax.post('http://localhost:8082/auth/login',
            qs.stringify({
                username:this.username,
                pwd:this.pwd
            })).then(function(res){
                if(res.data.code == 0){
                    Cookie.set("Token",res.data.data);
                    Message({
                        message: '登陆成功！',
                        type: 'success'
                    });
                    router.push({path:'/123'})
                    app.data.showLogin = false;
                    console.log("appSHowlogin"+app.data.showLogin);
                }else{
                    Message({
                        message: '登陆失败！清检查您的用户名和密码',
                        type: 'error'
                    });
                }
                console.log(res);
            }).catch(function(error){
                console.log(error)
            })
        },
        chooseUsername:function(){
            const _this = this;
            this.$ajax.post('http://localhost:8082/auth/checkUsername',
            qs.stringify({
                username:this.username
            })).then(function(res){
                if(res.data.code == 0){
                    if(res.data.data == true){
                        _this.hasRepeatUsername = true;
                    }else{
                        _this.hasRepeatUsername = false;
                    }
                }
            }).catch(function(error){
                console.log(error)
            })
        },
        logon:function(){
            const _this = this;
            if(this.form.checkpwd == null){
                Message({
                    message: "请再次输入密码！",
                    type: 'error'
                });
            }
            if(this.form.pwd !== this.form.checkpwd){
                Message({
                    message: "两次输入的密码不一致！",
                    type: 'error'
                });
            }
            this.$ajax.post('http://localhost:8082/auth/logon',qs.stringify({
                username:this.form.name,
                pwd : this.form.pwd,
                email : this.form.email,
            })).then(function(res){
                if(res.data.code == 0){
                    Cookie.set("Token",res.data.data);
                    Message({
                        message: '注册成功！',
                        type: 'success'
                    });
                    router.push({path:'/123'})
                    _this.form = {};
                    _this.dialogFormVisible = false;
                }else{
                    Message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
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
.logon{
    margin-top: 10px;
    font-size: 10px;
    color:cadetblue
}
.tips{
    margin-top: 10px;
    font-size: 10px;
    color: red
}
</style>


