export default {
    install(Vue, a, b) {
        // 第一个参数是Vue, 后面的参数是使用时传入的参数
        console.log(a, b)
        // 全局过滤器
        Vue.filter('mySlice', function(value) {
            return value.slice(0, 4)
        })

        // 定义全局指令
        Vue.directive('fbind', {
             bind(element, binding) {
                element.value = binding.value
            },
            inserted(element) {
                element.focus()
            },
            update(element, binding) {
                element.value = binding.value
            }
        })


        // 定义混入
        Vue.mixin({
            data() {
                return {
                    y: 200
                }
            }
        })

        // 给Vue原型上添加方法
        Vue.prototype.hello = function () {
            console.log('hello')
        }
    }
}