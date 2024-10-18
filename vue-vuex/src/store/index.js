// 该文件用于创建vuex的核心vuex
import Vue from 'vue'
import Vuex from 'vuex';

// Vuex插件的使用应该在new Vuex.Store之前
Vue.use(Vuex);

// 用于响应组件中的动作
const actions = {};

// 用于操作数据
const mutations = {};

// 用于存储数据
const state = {};

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
});

