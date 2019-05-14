import MyPagination from './packages/pagination/index.js'
//  如果还有别的组件的话可以继续加

const components = [
  MyPagination
]

const install = function (Vue, opts = {}) {
  components.MyPagination(component => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  MyPagination
}