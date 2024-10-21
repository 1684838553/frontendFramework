<template>
  <div class="message">
    <ul>
        <li v-for="message in messageList" :key="message.id">
            <!-- 跳转路由并携带query参数，to的字符串写法 -->
            <!-- <router-link :to="`/home/message/detail?id=${message.id}&title=${message.title}`">{{message.title}}</router-link> -->

            <!-- 跳转路由并携带query参数，to的对象写法 -->
            <router-link :to="{
                // path: '/home/message/detail',
                name: 'messageDetail',
                query: {
                    title: message.title
                },
                params: {
                    id: message.id
                }
            }">{{message.title}}</router-link>

            <button @click="pushShow(message)">push查看</button>
            <button @click="repaceShow(message)">replace查看</button>
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "Message",
  data() {
    return {
        messageList: [
            { id: '001', title: '消息001'},
            { id: '002', title: '消息002'},
            { id: '003', title: '消息003'},
            { id: '004', title: '消息004'},
        ]
    };
  },
  methods: {
    pushShow(message) {
        this.$router.push({
            name: 'messageDetail',
            query: {
                title: message.title
            },
            params: {
                id: message.id
            }
        })
    },
    repaceShow(message) {
        this.$router.replace({
            name: 'messageDetail',
            query: {
                title: message.title
            },
            params: {
                id: message.id
            }
        })
    }
  },
};
</script>

<style scoped>
li {
    list-style: none;
    margin: 5px;
}

button {
    margin-left: 12px;
}
</style>