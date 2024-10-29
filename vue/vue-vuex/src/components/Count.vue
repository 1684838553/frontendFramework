<template>
    <div class="count">
        <h3>当前求和为：{{sum}}</h3>
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
    name: 'Count',
    data() {
        return {
           sum: 0,
           n: 1
        }
    },
    methods: {
        increment() {
            this.sum += this.n;
        },
        decrement() {
            this.sum -= this.n;
        },
        incrementOdd() {
            this.sum = this.sum % 2 !== 0 ? this.sum + this.n :  this.sum;
        },
        incrementWait() {
            setTimeout(() => {
                this.sum += this.n
            }, 500)
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