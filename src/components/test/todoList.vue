<template>
    <div class="todoList">
        <h1>{{title}}</h1>
        <input type="text" class="addTodo" id="addTodo" v-model="newTodo" @keyup.enter="add">
        <ul v-if="list !== []">
            <li v-for="li in list" :class="{finish:li.value}" @click="cancle">
                <span>{{li.event}}</span><span v-if="li.value === 0">未完成</span><span v-else>已完成</span>
            </li>
        </ul>
    </div>
</template>
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


