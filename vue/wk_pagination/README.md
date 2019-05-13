# wk_pagination

> A Vue paging component

## 安装与基本用法
### install
```
npm install wk_pagination --save
```
### 全局注册
```
import Vue from 'vue'
import MyPagination from 'wk_pagination'

Vue.component('MyPagination', MyPagination)
```
### 使用
```
<template>
  <div id="app">
      <my-pagination
      :totalPage = totalPage
      :currentPage = currentPage
      v-on:current-change='currentChange'
      ></my-pagination>
  </div>
</template>
<script>
import MyPagination from 'wk_pagination'
export default {
  name: 'app',
  data () {
    return {
    totalPage: 100,
    currentPage: 1
    }
  },
  components: {
    MyPagination
  },
  methods: {
    currentChange (val) {
      console.log(val)
    }
  }
}
</script>
```
### Attributes
* totalPage

type： Number

description：总页数
* currentPage

type: Number

description: 当前页

### Events

event_name： current-change

description： 当前页面改变时触发
