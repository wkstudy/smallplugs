[demo](https://wkstudy.github.io/smallplugs/Resize/index.html)

* 放大缩小

## knowledge
思路：
>mousedonwn: 记录元素的width,height,到上面父元素的距离，到左边父元素的距离,和此时鼠标的位置，并设置flag = true
>mousemove: 进行大小的改变，原理就是：记录此时鼠标的位置，元素原来的width/height加上鼠标mousedown和mousemove之间的差值
>mouseup: 设置flag= false
* 改变元素大小时，可分为四类：

> 上： 改变 height 和元素的top
> 
> 下： 改变 height
> 
> 左： 改变 width 和 left
> 
> 右： 改变 width

* 目标元素位置必须是absolute或者fixed
* dom.getBoundingClientRect().width获取的是距离客户端的距离
* offsetTop是元素到offsetParent的顶部的距离，offsetParent是离元素元素最近的定位（position：absolute、fixed、relative）的父元素,如果没有，那么就是body元素
* 由于元素内的文本会被选中，所以需要阻止默认事件，两种方法：一是`function(e) {e.preventDefault()}`,二是`function(e) {return false}`
* 限定元素必须在父元素内的条件（以右边举例）`if (wdh + e.clientX - mousex < tparent.rht - temp.lft - dis) `，原来的判断方法为：`if(temp.rht < tparent.rht - dis)`,导致一旦元素达到最大值就不变了，这里的条件判断你一定要保证是个变量，如e.clientX
* 边界判断：
```
 // 上：tp + (e.clientY - mousey)   ----> dom.style.top值
 if (tp + (e.clientY - mousey) > dis) {}
 // 下：hgt + e.clientY - mousey     ----> dom.style.height值
 if (hgt + e.clientY - mousey < tparent.btm - temp.top - dis) {}
 // 左：lft + (e.clientX - mousex)   ----> dom.style.left 值
if (lft + (e.clientX - mousex) > dis) {}
 // 右：wdh + e.clientX - mousex  -----> dom.style.width值
 if (wdh + e.clientX - mousex < tparent.rht - temp.lft - dis) {}
 不直接用dom.style.top/left/width/height的原因是鼠标mousedown后第一次执行mousemove时，这几个都是空
 
```


## 修复bugs
问题：top边和left边分别向下、右拖拽改变大小时，会把元素拖出父元素之外，此时需要通过设置最小width/height解决，为了保证统一，top/left/bottom/right边都添加最小width/height的判断,修改如下：
```
// 上
if (tp + (e.clientY - mousey) > dis && hgt - (e.clientY - mousey) > minhgt) {}   ----> dom.style.top值 dom.style.height
// 下
if (hgt + e.clientY - mousey < tparent.btm - temp.top - dis && hgt + e.clientY - mousey > minhgt) {}    ----> dom.style.height值（最大最小）
// 左
if (lft + (e.clientX - mousex) > dis && wdh - (e.clientX - mousex) > minwdh) {}        ----> dom.style.left 值 和dom.style.width值
 // 右
if (wdh + e.clientX - mousex < tparent.rht - temp.lft - dis && wdh + e.clientX - mousex > minwdh) {}   -----> dom.style.width值（最大最小）
```

## error
* 函数传参，**基本类型**的都是传递了一个副本，原本把几个全局变量都通过函数传参，发现都不起作用
* 全局变量获取元素到上面的距离原来起的变量名是top,结果获取的值不对，改为了tp(原因是全局变量top就相当于window.top，指的是窗口，类似的还有window.self,window.parent，以后千万别起self、top之类的变量名)
* 在移动上面和左边的时候发现元素的大小和改变的位置改变的和我们想的不太一样，最后发现是给元素的父元素设置了position：relative，所以改变大小时dom.style.top和dom.style.left相对的位置就是父元素，而不是body,而前面我们用getBoundingClientRect()方法得到的是元素距离视口（相当于body）的位置，这里相对的位置不一样，就导致和我们预想的不太一样了，这时最好用的就是offsetTop、offsetLeft,这是相对于offsetParent的距离，这样就保证和dom.style.top、dom.style.left一致了。
* 原来改变大小时的函数(**问题：** 每次mousemove时还要再判断一次鼠标位于哪里，导致鼠标移动过快的情况下失灵，比如鼠标在右边，往右移动无论多快都是可以的，但是如果往左移动的速度过快，那么obj.disRht < dis的条件就不成立了，就不能改变大小，每条边都有这样的问题)
```
function changeSize (obj, mousex, mousey, wdh, hgt, tp, lft, e, dom, temp, tparent, dis) {
  if (obj.disTop < dis) {
    // 上
    dom.style.top = tp + (e.clientY - mousey) + 'px';
    dom.style.height = hgt - (e.clientY - mousey) + 'px';  
  }
  if (obj.disBtm < dis) {
   // 下
    dom.style.height = hgt + e.clientY - mousey + 'px';
  }
  if (obj.disLft < dis) {
   // 左
    dom.style.left = lft + (e.clientX - mousex) + 'px';
    dom.style.width = wdh - (e.clientX - mousex) + 'px';
  }
  if (obj.disRht < dis) {
    // 右
    dom.style.width = wdh + e.clientX - mousex + 'px';
  }
}
```
改版后的改变大小的函数:(在mousedown时 记录下鼠标位于上下左右那个区域，mousemove时 就不再判断了，直接改变大小)
```
function MousePos (obj, dis) { //  mousedown 时判断
  if (obj.disTop >= 0 && obj.disTop < dis) {
    acitvePos.ontop = true;
    flag = true;
  }
  if (obj.disBtm >= 0 && obj.disBtm < dis) {
    acitvePos.onbtm = true;
    flag = true;
  }
  if (obj.disLft >= 0 && obj.disLft < dis) {
    acitvePos.onlft = true;
    flag = true;
  }
  if (obj.disRht >= 0 && obj.disRht < dis) {
    acitvePos.onrht = true;
    flag = true;
  }
}
function ChangeSize(mousex, mousey, wdh, hgt, tp, lft, e, dom) {
  if (acitvePos.ontop) {
    // 上
    dom.style.top = tp + (e.clientY - mousey) + 'px';
    dom.style.height = hgt - (e.clientY - mousey) + 'px'; 
  }
  if (acitvePos.onbtm) {
     // 下
    dom.style.height = hgt + e.clientY - mousey + 'px';
  }
  if (acitvePos.onlft) {
    // 左
    dom.style.left = lft + (e.clientX - mousex) + 'px';
    dom.style.width = wdh - (e.clientX - mousex) + 'px';
  }
  if (acitvePos.onrht) {
    // 右
    dom.style.width = wdh + e.clientX - mousex + 'px';
  }
}
```
