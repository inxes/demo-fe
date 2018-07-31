<template>
    <div id="upload">
        <h1>百度识图</h1>
        <div class="row">
        <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:8082/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :file-list="fileLists"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </div>
        <div id="list" v-for="infos in info">
                <el-button @click="show2 = !show2">{{uploadFile.name}}</el-button>
            <div>
                <div style="display: flex; margin-top: 20px; height: 100px; margin-left:400px">
                <transition name="el-zoom-in-center" id="show" v-for="res in infos">
                    <div v-show="show2" class="transition-box" :style="{width:(res.score<0.5?0.5:res.score)*200+'px',height:100*(res.score<0.5?0.5:res.score)+'px'}">{{res.root}}<br>{{res.keyword}}</div>
                </transition>
                </div>
            </div>
        </div>
       
    </div>
    
</template>
<script>
export default {
    name: 'upload',
    data () {
        return{
            msg: 'upload your file',
            fileLists:[],
            show:false,
            info:[],
            uploadFile:'',
            show2:true
        }
    },
    methods:{
        handleChange(file, fileList) {
            this.fileLists = fileList.slice(-3);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleAvatarSuccess(res,file){
            this.uploadFile = file;
            if(res.code === 0){
                console.log(this.fileLists);
                this.show = true;
                this.info.push(JSON.parse(res.data).result);
            }
            console.log(this.info);
        }
    },
    watch:{
        //监听data值的变化
        msg:function(val,oldval){
            console.log(val,oldval);
        }
    },
}
</script>
<style>
  .transition-box {
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>



