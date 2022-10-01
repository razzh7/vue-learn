import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import commonjs from 'rollup-plugin-commonjs'
const path = require('path')
const currentPath = '10.响应式系统之immediate和deep'

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
      port: 8785,
      contentBase: '',
      openPage: '/index.html'
    }),
    commonjs()
  ]
}
