<template>
    <div id="secret">
        <h1>Secret</h1>
        <div>
            <div>
                <el-button type="primary" @click="dialogSecretVisible = true">Add a Secret</el-button>
                <el-dialog title="Add Your Secret" :visible.sync="dialogSecretVisible">
                    <el-form :model="form">
                        <el-form-item label="Secret" :label-width="formLabelWidth">
                            <el-input v-model="secret.content" auto-complete="off" style="width:500px"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogSecretVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addSecret">确 定</el-button>
                    </div>
                </el-dialog>
                
            </div>
            <el-row>
            <el-col :span="8" v-for="(o, index) in 10" :key="o" :offset="index > 0 ? 2 : 0" type="flex" class="row-bg" justify="space-around">
                <el-card :body-style="{ padding: '0px' }">
                <img src="" class="image">
                <div style="padding: 14px;">
                    <span>好吃的汉堡</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button" @click="dialogFormVisible = true">Comment</el-button>
                    <el-dialog title="Add Comment" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="Comment" :label-width="formLabelWidth">
                        <el-input v-model="form.name" auto-complete="off" style="width:500px"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addComment(index)">确 定</el-button>
                    </div>
                    </el-dialog>
                    </div>
                </div>
                </el-card>
            </el-col>
            </el-row>

        </div>
        
    </div>
</template>
<script>
import qs from 'qs';
import { Message } from 'element-ui';
export default {
    data(){
        return{
            visible2: false,
            currentDate: new Date(),
            dialogFormVisible : false,
            dialogSecretVisible : false,
            form: {
                name: '',
            },
            secret:{
                content :''
            },
            formLabelWidth: '120px'
      
        }
    },
    methods:{
        secretList:function(){
            this.$ajax.post('http://localhost:8082/secret/list',{}).then(function(res){
                if(res.data.code == 0){
                    this.secretList = res.data.data
                }else{
                    Message({
                        message : 'Server Cilent Error!',
                        tyep : 'error'
                    })
                }
            })
        },
        addComment:function(id){
            this.$ajax.post('http://localhots:8082/comment/add',qs.stringify({
                s_id : id,
                content : this.form.content
            })).then(function(res){
                if(res.data.code == 0){
                    Message({
                        message: 'Success！',
                        type: 'success'
                    });
                }else{
                    Message({
                        message : 'Fail!',
                        tyep : 'error'
                    })
                }
            })
            this.dialogFormVisible = false
        },
        addSecret:function(){
            this.$ajax.post('http://loacalhost:8082/secret/add',qs.stringify({
                content:this.secret.content
            })).then(function(res){
                if(res.data.code == 0){
                    Message({
                        message: 'Success！',
                        type: 'success'
                    });
                }else{
                    Message({
                        message : 'Fail!',
                        tyep : 'error'
                    })
                }
            })
            this.dialogSecretVisible = false
        }
    }
}
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .el-col {
    border-radius: 40px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
