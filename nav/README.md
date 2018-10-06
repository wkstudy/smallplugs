# 导航栏
* 水平导航
* 垂直导航

---
## 水平导航
* 下方的表示状态的是li的::after伪元素
* li使用float，为了让ul包住li，一开始使用了overflow：hidden属性，但是子菜单定位到外面的haul就显示不出来了，所以只好不使用overflow，让ul也浮动，最后清除浮动，当然也可以可以不浮动li，而改为display:inline-block
```
 //法一(都浮动)：
 .horizonal {
  background-color: #393d49;
  float: left;
}
.horizonal::after {
  clear: both;
}
.horizonal>li {
  float: left;
  margin-right: 2.0em;
  cursor: pointer;
  position: relative;
}
.son {
  border: .1em solid black;
  position: absolute;
  bottom: -3em;
  background-color: red;
}
//法二（li为inline-block）
代码没写，这里于上面不同的是li改为inline-block后，他的width是需要设置的
```
* 子菜单：
```
//法一：使用display：block,none
.horizonal>li:hover .son {
  display: block;
}
.son {
  border: .1em solid #d2d2d2;
  position: absolute;
  font-size: 1.2em;
  margin-top: .4em;
  display: none;
}
//法二： 使用position ，定位到页面之外
.horizonal>li:hover .son {
  top: auto;
}
.son {
  border: .1em solid #d2d2d2;
  position: absolute;
  font-size: 1.2em;
  margin-top: .4em;
  top: -999em;
}
```
* js部分控制上下箭头

>这里主要是用mouseenter、mouseleave，两者都不冒泡，所以adEventListener（'',function(){},true）

## 垂直导航
* li相对定位，让li:before定位到左边，span定位到右边，a在中间
* 要给li的子菜单ul设置bgclolor，由于li已经设置了padding，为了让子菜单ul旁边不是li的背景色，需要重新设置marign

 ```
 .vertical ul {
  background-color: #212d3c;
  display: none;
  margin-top: 1.0em;
  margin-left: -1.2em;
  margin-right: -1.2em;
  margin-bottom: -1.2em;
}
 ```

* 原来的代码为：

 ```
<li>
    <a href=''>默认展开</a>
    <span class="iconfont">&#xe629;</span>
    <ul>
    </ul> 
</li>
//给li做了click的事件代理，但是每次点击a、span的时候，事件都不冒泡，而且要consol的时候也常常打印不出来，发现原来，每次点击a，页面都相当于要跳转一下（即要刷新一次）,导致每次console还没显示出来就被刷新了，实际上这里点击的话功能也是显示二级菜单，不需跳转，所以把a改为span标签，但是每次点击span的时候仍然没有冒泡到父元素上，不知道怎么回事，于是，js中只好多进行一次判断
```