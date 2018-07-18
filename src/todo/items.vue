<template>
    <!-- 根据todo.completed的值来进行添加已经完成的item的样式 -->
    <div :class="['todo-item',todo.completed ? 'completed' : '']">
        <!-- completed作为checkbox的value -->
        <input type="checkbox"
            class="toggle"
            v-model="todo.completed"
        >
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo">

        </button>
    </div>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteTodo() {
            //使用$emit来进行通信，（父组件使用，第二个参数是要删除的id.第一个参数是父组件v-on使用）
            this.$emit('del',this.todo.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.todo-item{
    position: relative;
    background-color: #fff;
    font-size: 24px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    &:hover{
        .destory:after{
            content: 'x'
        }
    }
    label{
        white-space: pre-line;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color .4s;
    }
    &.completed{
        label{
            color:#d9d9d9;
            text-decoration: line-through;
        }
    }
    .toggle{
        text-align: center;
        width: 40px;
        height: 0px;
        position: absolute;
        top: 10px;
        // bottom: 0;
        border:none;
        // appearance: none;
        outline: none;
        &:after{
            content: url(../assets/images/round.svg)
        }
        &:checked:after{
            content: url(../assets/images/done.svg)
        }
    }
    .destory{
        position: absolute;
        top: 10px;
        right: 10px;
        // bottom:0;
        width: 40px;
        height: 0px;
        margin: auto 0;
        font-size: 30px;
        color:#cc9a9a;
        margin-bottom: 11px;
        transition: color .2s ease-out;
        background-color: transparent;
        border-width: 0;
        cursor:pointer;
        outline: none;
    }
}
</style>
