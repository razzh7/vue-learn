import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import commonjs from 'rollup-plugin-commonjs'
const path = require('path')
const currentPath = '7.响应式系统之异步队列'

export default {
  input: `./${currentPath}/index.js`,
  output: {
    format: 'umd',
    name: 'Vue',
    file: 'dist/vue.js',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      open: true,
      port: 8787,
      contentBase: '',
      openPage: '/index.html'
    }),
    commonjs()
  ]
}
