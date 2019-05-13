<template>
  <ul v-if="totalPage >= 7"
    @click="handleClick($event)"
  >
    <li :class="[{forbid: current === 1}, 'prev']">&laquo;</li>
    <li :class="{active:current === 1}">1</li>
    <li v-if="1 !== pages[0] - 1">...</li>
    <li v-for="val in pages"
      :key="val"
      :class="{active:current === val}"
    >{{val}}</li>
    <li v-if="pages[pages.length - 1] !== totalPage - 1">...</li>
    <li :class="{active:current === totalPage}">{{totalPage}}</li>
    <li :class="[{forbid: current === totalPage}, 'next']">&raquo;</li>
  </ul>
  <ul v-else
    @click="handleClick($event)"
  >
    <li :class="[{forbid: current === 1}, 'prev']">&laquo;</li>
    <li v-for="val in pages"
      :key="val"
      :class="{active: current === val}"
    >{{val}}</li>
    <li :class="[{forbid: current === totalPage}, 'next']">&raquo;</li>
  </ul>
</template>
<script>
export default {
  name: 'MyPagination.vue',
  props: {
    totalPage: {
      required: true,
      type: Number
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      current: 0
    }
  },
  created () {
    this.current = this.currentPage
  },
  watch: {
    currentPage () {
      var _this = this
      _this.current = _this.currentPage
    }
  },
  computed: {
    pages () {
      // 中间五个数
      // 当current > 4 && current < totalPage - 3时，发现每次加减页码，中间的五个数都会变，而当current < 4|| current >= totalPage - 3时，中间的五个数都是稳定的
      var _this = this,
        ct = _this.current,
        tp = _this.totalPage
      if (tp >= 7) {
        //  页数超过6页
        if (ct > 3 && ct < tp - 3) {
          return [ct - 2, ct - 1, ct, ct + 1, ct + 2]
        } else if (ct <= 3) {
          return [2, 3, 4, 5, 6]
        } else {
          return [tp - 5, tp - 4, tp - 3, tp - 2, tp - 1]
        }
      } else {
        // 页数少于7页，直接全部渲染出来
        return [1, 2, 3, 4, 5, 6].filter(item => item <= tp)
      }
    }
  },
  methods: {
    handleClick (e) {
      var el = e.target,
        _this = this
      if (el.classList.contains('prev')) {
        if (!el.classList.contains('forbid')) {
          _this.current--
          _this.$emit('current-change', _this.current)
        }
      } else if (el.classList.contains('next')) {
        if (!el.classList.contains('forbid')) {
          _this.current++
          _this.$emit('current-change', _this.current)
        }
      } else {
        _this.current = Number(el.innerHTML)
        _this.$emit('current-change', _this.current)
      }
    }
  }
}
</script>
<style scoped>
.active {
  color: green;
}
.forbid {
  cursor: no-drop;
}
ul {
  margin-top: 0;
  padding-top: 1rem;
  padding-left: 1rem;
  list-style-type: none;
  font-size: 0;
  background-color: #fff;
}
li {
  display: inline-block;
  color: #778087;
  font-size: 1.4rem;
  padding: 4px 1.2rem;
  line-height: 2rem;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
li + li {
  border-left: none;
}
</style>
