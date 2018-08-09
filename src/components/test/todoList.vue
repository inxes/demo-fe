<template>
    <div class="todoList">
        <h1>List</h1>
        <input type="text" class="addTodo" id="addTodo" v-model="newTodo" @keyup.enter="add">
        <el-button @click="remove">clear</el-button>
        <ul v-if="list !== []">
            <li v-for="li in list" :class="{finish:li.value}" @click="cancle(li)">
                <span>{{li.event}}</span><span v-if="li.value == 0">未完成</span><span v-else>已完成</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Store from "../../store.js";
console.log(Store.fetch());
export default {
    data () {
        return{
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
        },
        remove(){
            Store.remove();
            this.list = [];
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


