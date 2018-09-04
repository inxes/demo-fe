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
                        <el-form-item label="Upload" :label-width="formLabelWidth">
                            <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8082/secret/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogSecretVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addSecret">确 定</el-button>
                    </div>
                </el-dialog>
                
            </div>
            <el-row>
            <el-col :span="8" v-for="(o, index) in secretLists" :key="o" :offset="index > 0 ? 2 : 0" type="flex" class="row-bg" justify="space-around">
                <el-card :body-style="{ padding: '0px' }">
                <img :src="servicePath+o.img" class="image">
                <div style="padding: 14px;">
                    <span>{{o.content}}</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ o.createTime }}</time>
                    <el-button type="text" class="button" @click="commentList()">Comment</el-button>
                    <el-button type="text" class="button" @click="closeCard()">Close</el-button>
                    <el-dialog title="Add Comment" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="Comment" :label-width="formLabelWidth">
                        <el-input v-model="form.name" auto-complete="off" style="width:500px"></el-input>
                        </el-form-item>
                        
                    </el-form>
                        <div slot="body">
                            <ul>
                                <li v-for="commentItem in commentlists">{{commentItem.content}}</li>
                            </ul>
                        </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addComment(o.id)">确 定</el-button>
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
            secretLists : {},
            commentlists: [],
            servicePath:"http://localhost:8082/secret_img/",
            visible2: false,
            currentDate: new Date(),
            dialogFormVisible : false,
            dialogSecretVisible : false,
            imageUrl : "",
            form: {
                name: '',
                img : ""
            },
            secret:{
                content :''
            },
            formLabelWidth: '120px'
        }
    },
    mounted:function(){
        this.secretList();
    },
    methods:{
        secretList:function(){
            var _this = this;
            this.$ajax.post('http://localhost:8082/secret/list',{}).then(function(res){
                if(res.data.code == 0){
                    _this.secretLists = res.data.data
                }else{
                    Message({
                        message : 'Server Cilent Error!',
                        tyep : 'error'
                    })
                }
            })
        },
        handleAvatarSuccess(res, file) {
            console.log(res);
            if(res.code != 0){
                Message({
                    message : 'Upload Fail!',
                    tyep : 'error'
                });
            }else{
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form.img = res.data;
                console.log(this.form.img);
            }
            
        },
        beforeAvatarUpload(file) {
            var alltype = "image/png,image/jpg";
            const isJPG = alltype.indexOf(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (isJPG < 0) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
                return isJPG && isLt2M;
            
        },
        addComment:function(id){
            this.$ajax.post('http://localhost:8082/comment/add',qs.stringify({
                id : id,
                content : this.form.name
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
            this.dialogFormVisible = false;
            this.form.name = "";
        },
        addSecret:function(){
            this.$ajax.post('http://localhost:8082/secret/add',qs.stringify({
                img : this.form.img,
                content:this.secret.content
            })).then(function(res){
                if(res.data.code == 0){
                    Message({
                        message: 'Success！',
                        type: 'success'
                    });
                    this.form = "";
                    this.secret = "";
                }else{
                    Message({
                        message : 'Fail!',
                        tyep : 'error'
                    })
                }
            })
            this.secret.content = '';
            this.dialogSecretVisible = false
        },
        commentList:function(){
            var _this = this;
            this.dialogFormVisible = true;
            this.$ajax.post('http://localhost:8082/comment/list',{}).then(function(res){
                if(res.data.code == 0){
                    _this.commentlists = res.data.data;
                    console.log(_this.commentlists);
                }else{
                    Message({
                        message : 'Fail!',
                        tyep : 'error'
                    })
                }
            })
        },
        closeCard:function(){
            console.log("closeCard");
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
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
