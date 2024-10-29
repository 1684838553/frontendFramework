<template>
    <div>
        当前点击鼠标的坐标x: {{ point.x }}  y: {{ point.y }}

        <p>祖先组件的数据： {{ person }}</p>
    </div>
</template>

<script>
import { inject } from 'vue';
// import { onBeforeUnmount, onMounted, reactive } from 'vue';
import usePoint from '../hooks/usePoint';

export default {
    name: 'Location',

    setup() {
        let person = inject('person');
        // const point = reactive({
        //     x: 0,
        //     y: 0
        // })

        // function savePoint(e) {
        //     point.x = e.clientX
        //     point.y = e.clientY
        // }

        // onMounted(() => {
        //     window.addEventListener('click',savePoint);
        // })

        // onBeforeUnmount(() => {
        //     window.removeEventListener('click', savePoint);
        // })
        const point = usePoint();

        return {
            point,
            person
        }
    }
}
</script>