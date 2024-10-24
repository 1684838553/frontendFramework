<template>
    这是一个学生的信息
    <hr>
    姓：<input type="text" v-model="student.firstName"><br>
    名：<input type="text" v-model="student.lastName"><br>
    <span>全名 {{ student.fullName }}</span>  <br>
    全名：<input type="text" v-model="student.fullName">
    <hr>
    <slot></slot>
    <p>姓名：{{ student.name }}</p>
    <p>年龄：{{ student.age }}</p>
    <p>学校：{{ student.school }}</p>
    <p>地址：{{ student.address }}</p>
    <button @click="test">测试一下触发该组件的hello事件</button>
</template>

<script>
import { computed, reactive } from 'vue';
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
            firstName: '',
            lastName: '',
            ...props
        })

        // // 计算属性（简写：没考虑计算属性被修改的情况）
        // student.fullName = computed(() => {
        //     return student.firstName + '-' + student.lastName;
        // })

        // 完整写法
        student.fullName = computed({
            get() {
                return student.firstName + '-' + student.lastName;
            },
            set(value) {
                const nameArr = value.split('-');
                student.firstName = nameArr[0]
                student.lastName = nameArr[1]
            }
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