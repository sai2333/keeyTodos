<template>
    <section class="real-app">
        <input type="text" 
            @keyup.enter = "addTodo"
            placeholder="接下来需要做什么"
            autofocus
            class="add-input"
        >
        <items :todo="todo"
            v-for= "todo in filteredTodos"
            :key= "todo.id"
            @del = "deleteTodo"
        >
        </items>
        <tabs 
            :filter="filter" 
            :todos="todos"
            @toggle="toggleFilter"
            @clearAll = "clearAllCompleted"
        >
        </tabs>
    </section>
</template>
<script>
import Items from './items.vue'
import Tabs from './tabs.vue'
let id = 0;
export default {
    data() {
        return {
            todos:[],
            filter: 'all'
        }
    },
    methods: {
        //添加items的方法
        addTodo(e) {    
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false
            })
            e.target.value = ''
        },
        deleteTodo(id) {
            //从子组件中通信的id，进行删除该id的todo
            this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
        },
        //子组件传个state过来进行filter 把你们离开了昆明 
        toggleFilter(state) {
            this.filter = state;
        },
        //清除完成的todo
        clearAllCompleted() {
            // this.todos.splice(this.todos.findIndex(todo => todo.completed === true),1)
            //把没完成的todo直接留下来，赋值给现在的todos
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    },
    computed: {
        //过滤过的todos
        filteredTodos() {
            if(this.filter === 'all') {
                return this.todos
            }
            //如果filter是完成状态，那么返回todos里面的所有completed为true的todo
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => completed === todo.completed);
        }
    },
    components: {
        Items,
        Tabs
    }

}
</script>

<style lang="scss" scoped>
.real-app{
    width: 600px;
    margin: 0 auto;
    // box-shadow: 0 0 5px #666;
    box-shadow: inset 0 -1px 5px 0 rgba(0,0,0,.6);
    .add-input{
        position: relative;       
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color:inherit;
        padding: 6%;
        // box-shadow: inset 0 -1px 5px 0 rgba(0,0,0,.6);
        box-sizing: border-box;
        padding: 16px 16px 16px 60px;
        
    }
}
</style>
