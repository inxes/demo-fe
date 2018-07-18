<template>
<html>
    <head>
        <link rel="stysheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    </head>
    <body>
    <div class="todoList">
        <h1>{{title}}</h1>
        <input type="text" class="addTodo" id="addTodo" v-model="newTodo" @keyup.enter="add">
        <ul v-if="list !== []">
            <li v-for="li in list" :class="{finish:li.value}" @click="cancle">
                <el-button>{{li.event}}</el-button><span v-if="li.value === 0">未完成</span><span v-else>已完成</span>
            </li>
        </ul>
    </div>
    </body>
</html>
</template>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<script>
export default {
    data () {
        return{
           title:'hello',
           list:[
           ],
           newTodo:'',
           finish:'finish'
        }
    },
    methods:{
        cancle:function(){

        },
        add:function(){
            this.list.push({
                event:this.newTodo,
                value:0
            });
            this.newTodo = '';
            console.log(this.list);
        }
    }
}
</script>
<style>
.finish{
    text-decoration: underline;
}
</style>


