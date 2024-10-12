<template>
    <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleClick(todo.id)"/>
      <!--v-model数据的双向绑定，checkbox使用v-model来双向绑定其是否被勾选,也可以实现效果但不推荐(因为其实修改了props中的数据)-->
      <!--这里修改了从List修改过来的props,这里的不允许改是浅层次，就是如果props是一个对象则这个修改这个对象的某一个属性vue是放行的-->
      <!-- <input type="checkbox" v-model="todo.done"/>-->
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
  export default {
    name: 'MyItem',
    // props: ['todo', 'checkTodo', 'deleteTodo'],
    props: ['todo'],
    data(){
      return {
        
      }
    },
    methods:{
      handleClick(id) {
        // this.checkTodo(id);
        this.$bus.$emit('checkTodo', id)
      },
      handleDelete(id) {
        if(confirm(`确定删除编号为${id}的todo吗`)){
            // this.deleteTodo(id);
            this.$bus.$emit('deleteTodo', id)
        }
      }
    },
  };
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover{
  background: #ddd;
}

li:hover button{
  display: block;
}
</style>