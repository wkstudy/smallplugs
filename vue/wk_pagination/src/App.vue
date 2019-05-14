<template>
  <div id="app">
    <h1>Used for debugging this component</h1>
    <h2>a Vue paging component</h2>
    <section>
      <my-pagination
      :totalPage = totalPage
      :currentPage = currentPage
      v-on:current-change='currentChange'
      ></my-pagination>
    <p>{{msg}}</p>
    </section>
  </div>
</template>

<script>
import MyPagination from './packages/pagination/index.js'
export default {
  name: 'app',
  data () {
    return {
    totalPage: 100,
    currentPage: 1,
    msg: ''
    }
  },
  components: {
    MyPagination
  },
  methods: {
    currentChange (val) {
      this.msg = `正在请求第${val}页`
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}
section {
  margin-top: 60px;
}
p {
  margin-top: 30px;
}
</style>
