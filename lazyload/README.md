## demo
[view](https://wkstudy.github.io/smallplugs/lazyload/index.html)

## time
19.03.23

## 效果图

[图片地址](https://wkstudy.github.io/smallplugs/lazyload/GIF.gif)
##  参考

* 关于懒加载的实践部分主要参考[原生js实现图片懒加载（lazyLoad） - 天之蓝源的文章 - 知乎](https://zhuanlan.zhihu.com/p/55311726)
* 关于节流部分的使用主要参考的是[JS简单实现防抖和节流](https://blog.csdn.net/sml115/article/details/81280101)

## 说明

* 本次懒加载实现主要使用getBoundingClientRect() 这个api
* throttle 函数两个都可以用
* `data-default` 用来判断是否加载过了