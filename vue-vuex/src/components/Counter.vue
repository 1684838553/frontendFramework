<template>
    <div class="count">
        <h3>当前求和为(使用vuex存储状态)：
            <div>{{$store.state.sum}}</div>
        </h3>
        <h3>当前求和放大10倍：
            <div>{{$store.getters.bigSum}}</div>
        </h3>
        <div class="select">
            请选择每次操作的数值：
            <select v-model.number="n">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
        <button @click="increment">加{{n}}</button>
        <button @click="decrement">减{{n}}</button>
        <button @click="incrementOdd">当前和为奇数再加{{n}}</button>
        <button @click="incrementWait">等一等再加{{n}}</button>
    </div>
</template>

<script>
export default {
    name: 'Counter',
    data() {
        return {
           n: 1
        }
    },
    mounted() {
        
    },
    methods: {
        increment() {
            this.$store.commit('Increment', this.n);
        },
        decrement() {
            this.$store.commit('Decrement', this.n);
        },
        incrementOdd() {
            this.$store.dispatch('incrementOdd', this.n);
        },
        incrementWait() {
            this.$store.dispatch('incrementWait', this.n);
        }
    },
}
</script>

<style scoped>
.count {
    width: 300px;
    margin: auto;
}

select, button {
    height: 28px;
}

select {
    width: 80%;
}

.select {
    margin-bottom: 8px;
}
button {
    margin-right: 12px;
    margin-bottom: 8px;
}
</style>