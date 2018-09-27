# 网易云音乐轮播图实现
## knowledge
* offsetLeft属性只读
* 判断两个dom节点完全相同[mdn](https://developer.mozilla.org/en-US/docs/Web/API/Node/isEqualNode)
`Node.isEqualNode()`
* juqery的index()方法，查找元素在父元素的位置（索引值）

## 尝试（try.js）
* 关于图片的切换，刚开始是让每个图片相对于整个ul定位，排成一整行，每次改变一下offsetLeft值picChangeError(),因为offsetLeft只读，所以没法改变，失败了。

* 现在初始时让所有图片都居中显示（所有图片在第一张下方），设置两个类before、after，位置在第一张图片左右两侧，给第一张图片紧挨着的两个图片添加类,第一张图片添加类now，现在每次切换时，只需要把改变这三个类对应的img就行了。 picChange()

* 在做prev功能的时候，发现一开始的定时切换的function设计其实就是图片、线往后移，而prev功能其实就是图片、线往前移动。那么一开始的时候功能设计就可以改为两个function prev(),nextImg(),每个function又分为两个小部分prevImg(),prevLine(),nextImg(),nextLine()

* 事件代理的时候，一定要在e.target符合自己需要的时候再进行判断你，否则会出现很多想象不到的bug
```
document.getElementsByClassName('lines')[0].addEventListener('mouseover', function (e) {
  if (e.target.className == 'line' || e.target.className == 'active-line line') {}
  },false)
  //一开始在没有判断div是line的时候就找target、active的位置进行操作，导致浏览器崩溃
```

## 目录
* icons  --> 向左向右箭头
* imgs  -->图片
* iconfont.css -->  向左向右箭头样式
* index.css  --->布局
* index.html  ---> 页面
* index.js  ---> js事件
* try.js ----->初始尝试（页面不需要）
* [demo](https://wkstudy.github.io/smallplugs/Carousel-wangyiyun/index.html)