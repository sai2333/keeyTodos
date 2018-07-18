<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <span
                v-for="state in states"
                :key = "state"
                :class = "[state,filter === state ? 'actived' : '']"
                @click = "toggleFilter(state)"
            >
            {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">clear ALLCompleted</span>
    </div>
</template>

<script>
export default {
    props: {
        filter: {
            type: String,
            required: true
        },
        todos: {
            type: Array,
            required:true
        }
    },
    data() {
        return {
            states: ['all','active','completed']
        }
    },
    methods: {
        //切换选中的状态，来进行切换filter的状态
        toggleFilter(state) {
            this.$emit('toggle',state)
        },
        //删除所有todo
        clearAllCompleted() {
            this.$emit('clearAll')
        }
    },
    computed: {
        //计算有多少个待办项目（包括完成和未完成的）
        unFinishedTodoLength() {
            return this.todos.filter(todo => !todo.completed).length
        }
    }
}
</script>

<style lang="scss" scoped>
.helper{
    font-weight: 100;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    line-height: 30px;
    background: #fff;
    font-size: 14px;
    .left,.clear,.tabs{
        padding: 0 10px;
        box-sizing: border-box;
    }
    .left,.clear{
       width: 150px; 
    }
    .left{
        text-align: left;
    }
    .clear{
        text-align: right;
        cursor:pointer;
    }
    .tabs{
        width: 200px;
        display: flex;
        justify-content: space-between;
        *{
            display: inline-block;
            padding: 0 10px;
            cursor: pointer;
            border:1px solid rgba(175,47,47,0);
            &.actived{
                border-color: rgba(175,47,47,.4);
                 border-radius: 5px;
            }
        }
    }
}
</style>
