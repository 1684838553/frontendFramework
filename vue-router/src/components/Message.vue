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
                    id: message.id,
                    title: message.title
                }
            }">{{message.title}}</router-link>
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Detail from './Detail';

export default {
  name: "Message",
  comments: { Detail },
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
};
</script>

<style scoped>
li {
    list-style: none;
    margin: 5px;
}
</style>