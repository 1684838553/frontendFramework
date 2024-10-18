<template>
  <div class="person">
    <h3>人员列表</h3>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add">添加</button>
    <ul>
        <li v-for="person in personList" :key="person.id">{{person.name}}</li>
    </ul>
    <div>上方组件的和为：{{sum}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { nanoid } from 'nanoid';

export default {
  name: "Person",
  data() {
    return {
        name: ''
    };
  },
  computed: {
    ...mapState('personAbout', ["personList"]),
    ...mapState('countAbout', ['sum'])
  },
  mounted() {},
  methods: {
    add() {
        const person = { id: nanoid(), name: this.name }
        this.$store.commit('personAbout/ADD_PERSON', person);
        this.name = '';
    }
  },
};
</script>

<style scoped>
.person {
  width: 300px;
  margin: auto;
}

button {
  height: 28px;
  margin-left: 12px;
}

input {
  width: 70%;
  height: 24px;
}

.select {
  margin-bottom: 8px;
}
button {
  margin-right: 12px;
  margin-bottom: 8px;
}
</style>