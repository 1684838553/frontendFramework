import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import watch from "rollup-plugin-watch";
// import clean from 'rollup-plugin-clean';

export default [
    {
        input: "sidepanel/index.js",
        output: {
            file: "dist/sidepanel.js",
            // 将打包后的代码包裹在一个立即调用的函数表达式（IIFE）中
            format: "iife",
        },
        plugins: [
            // clean({ targets: 'dist/**' }),
            watch({
                dir: "./sidepanel",
                exclude: ['node_modules/**'],
                delay: 2000,
            }),
            // nodeResolve 是 Rollup 的一个插件，用于解析 Node.js 模块，使得 Rollup 能够正确地导入和处理 Node.js 风格的模块
            nodeResolve({
                // Rollup 会优先使用 package.json 中的 jsnext 字段来确定模块的入口点。jsnext 通常指向使用 ES6 模块语法的入口文件
                jsnext: true,
                // Rollup 会使用 package.json 中的 main 字段来确定模块的入口点。main 字段通常指向 CommonJS 格式的入口文件
                main: true,
                // Rollup 会使用 package.json 中的 browser 字段来确定在浏览器环境中使用的模块入口点。这对于在浏览器中使用 Node.js 模块非常有用
                browser: true
            }),
            // commonjs 插件的作用是将 CommonJS 模块转换为 Rollup 支持的格式，以便 Rollup 能够正确打包和处理这些模块
            commonjs(),
            // copy 插件用于在打包过程中复制指定的文件或目录到目标位置
            copy({
                // targets 这是一个数组，每个元素是一个对象，包含 src 和 dest 两个属性
                targets: [
                    {
                        // src ：指定要复制的文件或目录的路径
                        src: ['sidepanel', 'background.js', 'manifest.json', 'images'],
                        // 指定目标目录的路径
                        dest: 'dist'
                    }
                ]
            })
        ]
    },
    {
        input: 'scripts/background.js',
        output: {
            file: 'dist/background.js',
        },
        plugins: [
            watch({
                dir: "./scripts",
                exclude: ['node_modules/**'],
                delay: 2000,
            }),
            commonjs(),
            nodeResolve(),
        ]

    }
]