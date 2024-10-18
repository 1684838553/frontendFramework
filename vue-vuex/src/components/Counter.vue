<template>
  <div class="count">
    <p>我在{{ school }}学习{{ subject }}</p>
    <h3>
      当前求和为(使用vuex存储状态)：
      <div>{{ sum }}</div>
    </h3>
    <h3>
      当前求和放大10倍：
      <div>{{ bigSum }}</div>
    </h3>
    <div class="select">
      请选择每次操作的数值：
      <select v-model.number="n">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
    <button @click="increment(n)">加{{ n }}</button>
    <button @click="decrement(n)">减{{ n }}</button>
    <button @click="incrementOdd(n)">当前和为奇数再加{{ n }}</button>
    <button @click="incrementWait(n)">等一等再加{{ n }}</button>
    <p>下方组件的总人数是：{{personList.length}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Counter",
  data() {
    return {
      n: 1,
    };
  },
  computed: {
    // // 借助mapState生成计算属性，从state中获取数据（对象写法）
    // ...mapState({ sum: "sum", school: "school", subject: "subject" }),

    // 借助mapState生成计算属性，从state中获取数据（数组写法）
    ...mapState(["sum", "school", "subject", 'personList']),

    // 借助mapGetters生成计算属性，从getters中获取数据（数组写法）
    ...mapGetters(["bigSum"]),
  },
  mounted() {},
  methods: {
    // increment() {
    //   this.$store.commit("Increment", this.n);
    // },
    // decrement() {
    //   this.$store.commit("Decrement", this.n);
    // },

    // 参数在事件绑定时传入
    // 借助mapMutations生成对应的方法，方法中调用commit去联系mutations(对象)  
    ...mapMutations({ increment: "Increment", decrement: "Decrement" }),

    // // 借助mapMutations生成对应的方法，方法中调用commit去联系mutations(数组) (这样写，绑定事件时，事件名应与数组中一致)
    // ...mapMutations([ "Increment", "Decrement" ]),

    // incrementOdd() {
    //   this.$store.dispatch("incrementOdd", this.n);
    // },
    // incrementWait() {
    //   this.$store.dispatch("incrementWait", this.n);
    // },

    // 参数在事件绑定时传入
    // 借助mapActions生成对应的方法，方法中调用dispatch去联系actions(数组)  
    ...mapActions(['incrementOdd', 'incrementWait'])
  },
};
</script>

<style scoped>
.count {
  width: 300px;
  margin: auto;
}

select,
button {
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