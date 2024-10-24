<template>
    这是一个学生的信息
    <slot></slot>
    <p>姓名：{{ student.name }}</p>
    <p>年龄：{{ student.age }}</p>
    <p>学校：{{ student.school }}</p>
    <p>地址：{{ student.address }}</p>
    <button @click="test">测试一下触发该组件的hello事件</button>
</template>

<script>
import { reactive } from 'vue';
export default {
    name: 'Student',
    props: ['school', 'address'],
    emits: ['hello'],
    setup(props, context) {
        console.log(props, 'props')
        console.log(context, 'context')

        const student = reactive({
            name: '张三',
            age: 23,
            ...props
        })

        function test() {
            context.emit('hello', '你好')
        }

        return {
            student,
            test
        }
    }
}
</script>