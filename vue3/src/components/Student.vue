<template>
    这是一个学生的信息（组件开始）
    <p>sum: {{ sum }} <button @click="sum++">点我加1</button></p>
    <p>msg: {{ msg }} <button @click="msg += '!'">点我加!</button></p>
    <p>数学成绩: {{ score }} <button @click="score++">点我加1</button></p>
    <hr>
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    <span>全名 {{ fullName }}</span> <br>
    全名：<input type="text" v-model="fullName">
    <hr>
    <slot></slot>
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <p>学校：{{ school }}</p>
    <p>地址：{{ address }}</p>
    <button @click="test">测试一下触发该组件的hello事件</button>
    <br>
    （组件结束）
</template>

<script>
import { computed, reactive, watch, ref, watchEffect, onBeforeMount, onUnmounted, toRef, toRefs } from 'vue';
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
            subjects: {
                maths: {
                    score: 95
                }
            },
            ...props
        })

        onBeforeMount(() => {
            console.log('onBeforeMount')
        })

        onUnmounted(() => {
            console.log('onUnmounted')
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

        let sum = ref(0);
        let msg = ref('你好啊');

        // 情况一：监听ref定义的一个响应式数据
        // watch(sum, (newValue, oldValue) => {
        //     console.log('sum变了', newValue, oldValue)
        // })

        // 情况二：监听ref定义的多个响应式数据
        watch([sum, msg], (newValue, oldValue) => {
            console.log('sum msg变了', newValue, oldValue)
        })

        // 情况三：监视reactive定义的对象
        // watch(student, (newValue, oldValue) => {
        //     console.log('student变了', newValue, oldValue)
        // })

        // 情况四：监听监视reactive定义的对象中某个属性
        // watch(() => student.firstName, (newValue, oldValue) => {
        //     console.log('student.firstName变了', newValue, oldValue)
        // })

        // 情况五：监听监视reactive定义的对象中某些属性
        // watch([() => student.firstName, () => student.lastName], (newValue, oldValue) => {
        //     console.log('student.firstName  student.lastName变了', newValue, oldValue)
        // })

        // 情况六（特殊情况）
        watch(() => student.subjects, (newValue, oldValue) => {
            console.log('修改成绩', newValue, oldValue)
        }, { deep: true });  //此处由于监视的是reactive定义的对象中的属性（依然是对象），所有deep配置有效

        watchEffect(() => {
            console.log('watchEffect~~')
        })

        function test() {
            context.emit('hello', '你好')
        }

        return {
            student,
            test,
            sum,
            msg,
            // 不加 toRef，score是一个写死的数据，初始化数据，加了toRef后，变成响应式数据
            score: toRef(student.subjects.maths, 'score'),
            ...toRefs(student)
        }
    }
}
</script>