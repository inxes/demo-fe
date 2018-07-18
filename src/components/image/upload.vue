<template>
    <div id="upload">
        <h1>{{msg}}</h1>
        <div class="row">
        <span class="personattr">:):</span>
        <input type="hidden" name="img"  id="thumbUrl"/>
        <input type="file" name="logoFile" id="logoFile" onchange="setImg(this);">
        <span><img id="thumburlShow" src="" width="120" height="120"/></span>
    </div>
    </div>
    
</template>
<script>
export default {
    name: 'upload',
    data () {
        return{
            msg: 'upload your file'
        }
    },
    methods:{

    },
    watch:{
        //监听data值的变化
        msg:function(val,oldval){
            console.log(val,oldval);
        }
    },
}
</script>


