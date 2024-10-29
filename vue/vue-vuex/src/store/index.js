// 该文件用于创建vuex的核心vuex
import Vue from 'vue'
import Vuex from 'vuex';

// Vuex插件的使用应该在new Vuex.Store之前
Vue.use(Vuex);

// // 用于响应组件中的动作
// const actions = {
//     // 这两个方法没有业务逻辑，可以不写，在组件里面直接调用$store.commit
//     // increment(context, value) {
//     //     context.commit('Increment', value);
//     // },
//     // decrement(context, value) {
//     //     context.commit('Decrement', value);
//     // },
//     incrementOdd(context, value) {
//         if (context.state.sum % 2) {
//             context.commit('Increment', value);
//         }
//     },
//     incrementWait(context, value) {
//         setTimeout(() => {
//             context.commit('Increment', value);
//         }, 500)
//     }
// };

// // 用于操作数据（函数名一般大写）
// const mutations = {
//     Increment(state, value) {
//         state.sum += value
//     },
//     Decrement(state, value) {
//         state.sum -= value;
//     },
//     ADD_PERSON(state, value) {
//         state.personList.unshift(value);
//     }
// };

// // 用于存储数据(相当于组件中的data)
// const state = {
//     sum: 0,
//     school: '尚硅谷',
//     subject: '前端',
//     personList: [{ id: '001', name: '张三' }]
// };

// // 用于将state中的数据进行加工(相当于组件中的computed)
// const getters = {
//     bigSum(state) {
//         return state.sum * 10
//     }
// }

const countAbout = {
    namespaced: true,
    actions: {
        incrementOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit('Increment', value);
            }
        },
        incrementWait(context, value) {
            setTimeout(() => {
                context.commit('Increment', value);
            }, 500)
        }
    },
    mutations: {
        Increment(state, value) {
            state.sum += value
        },
        Decrement(state, value) {
            state.sum -= value;
        },
    },
    state: {
        sum: 0,
        school: '尚硅谷',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}

const personAbout = {
    namespaced: true,
    actions: {},
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value);
        }
    },
    state: {
        personList: [{ id: '001', name: '张三' }]
    },
    getters: { }
}

// 创建并暴露store
export default new Vuex.Store({
    modules: {
        personAbout,
        countAbout
    }
});

