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
import Store from "../../store.js";
console.log(Store.fetch());
export default {
    data () {
        return{
           title:'hello',
           list:Store.fetch()?Store.fetch():[],
           newTodo:'',
           finish:'finish'
        }
    },
    methods:{
        cancle:function(item){
            item.value = !item.value;
            console.log(item.value);
        },
        add:function(){
            this.list.push({
                event:this.newTodo,
                value:0
            });
            this.newTodo = '';
            console.log(this.list);
        }
    },
    watch:{
        list:{
            handler:function(list){
                console.log(list);
                Store.save(list);
            },
            deep:true 
        }
        
    }
}
</script>
<style>
.finish{
    text-decoration: underline;
}
</style>


