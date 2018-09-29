# 图片放大镜
[demo](https://wkstudy.github.io/smallplugs/picEnlarge/index.html)
## knowledge
### 通用
* mouseover、mouseenter、mouseleave等的区别
> 一般情况下使用mouseover就行了，mousemove在元素内部移动会不断的触发

* [js获取元素的位置](https://www.cnblogs.com/cloud-k/p/7681386.html)

> * 内高度、内宽度： 内边距 + 内容框 
  `clientWidth clientHeight` 

> * 外高度，外宽度： 边框 + 内边距 + 内容框
  `offsetWidth offsetHeight`
> * 上边框、左边框
>  `clientTop clientLeft`
* 每次都获取元素太浪费了，要定义变量
### 放大镜
* 放大倍数的确定(放大了三倍)
```
.large img {
  position: absolute;
  width: 300%;
  height: 300%;
}
.total img {
  width: 100%;
  height: 100%;
}
```
* span的移动，当鼠标(这就是代码里的那段if else)
[图片](https://wkstudy.github.io/smallplugs/picEnlarge/img/demo.jpg)

> 1. 位于中间的5，span中心位置和鼠标的位置是一样的
 
> 2. 位于上方或下方（6、7）市，span的左右移动和鼠标是同步的，但上下是不变的
>>位于上方（6），span的style.top是0
>>位于上方（7），span的style.top是total.clientTop + this.clientHeight - spanHeight

>3. 位于左边或右边（8、9）市，span的上下移动和鼠标是同步的，但左右是不变的
>> 位于左边（8），span的style.left是0 
>> 位于左边（8），span的style.left是total.clientLeft + total.clientWidth - spanWidth
>> 
> 4. 位于四个角落是（1、2、3、4）span的位置是固定的，不随鼠标的移动而移动

>>位于左上（1）位置参考代码就好了

>> 位于右上（2）。。。

>> 位于左下（3）。。。

>> 位于右下（4）。。。

* span 和放大镜中图片的关系

>使用的offsetLeft、 offsetTop,相对于父元素(total)的偏移值,图片的父元素也是total，所以正好确定了图片的位置
 
