<template>
    <input type="text" v-model="keyword">
    <h3>{{ keyword }}</h3>
</template>

<script>
import { customRef } from 'vue';
export default {
    name: 'Demo',

    setup() {
        function myRef(value) {
            let timer;
            const x = customRef((tarck, trigger) => {
                return {
                    get() {
                        // 通知vue追踪value的变化
                        tarck();
                        return value;
                    },
                    set(newValue) {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                        value = newValue;
                        // 通知vue重新解析模板
                        trigger();
                       }, 500)
                    }
                }
            });
            return x;
        }

        let keyword = myRef('hello')

        return {
            keyword
        }
    }
}
</script>