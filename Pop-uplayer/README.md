# 弹出层
* [modal](https://wkstudy.github.io/smallplugs/Pop-uplayer/modal/modal.html)
* [dialog](https://wkstudy.github.io/smallplugs/Pop-uplayer/dialog/dialog.html)

## 介绍
* modal.html为模仿bootstrap模态框
* dialog.html为模仿jqueryui、layui弹出框
* 两者主要区别：bootstrap点击除了模态框之外的地方会隐藏模态框，jqueryui中的弹出框可以进行拖动，改变大小，点击其他地方不会对弹出框有影响。

## knowledge
* modal.html

> 整个的设计为弹出框覆盖整个页面，中间的文本框是其主要显示部分
>
> 弹出框position为fixed，相对于整个浏览器布局，使得弹出框覆盖在整个页面上，设置其背景色透明度，使得能看见下面的元素
> 
> 点击背景色部分，弹出框显示，点击文本框部分，弹出框不动，由于文本框是整个弹出框的子元素，要完成这种效果，只能让点击文本框的时候，click事件不冒泡。
> 
>  不足之处是没有动画效果 
  
* dialog.html

> 特点主要是能够拖动和改变大小，现在已经实现拖动，改变大小分为两部分（鼠标样式的改变[完成]和大小的改变[未完成]）
> 使用old.js,index.js是将拖动和改变大小进行整合，但是由于改变大小未完成，暂不使用
> 
> * 拖动
> 
> >> 关于众多位置，参考了[获取元素相对窗口位置及元素大小](https://www.cnblogs.com/jidi/p/get_position.html)、[原生JS获取元素的位置与尺寸](https://www.cnblogs.com/cloud-k/p/7681386.html)


> >> 注意 mousemove、mouseup考虑到如果移动太快的话导致鼠标可能会出dialog这个元素，所以绑定在document上
> >> 
> >> mousemove的原理是：如果让diaolog和鼠标移动的大小相同，那么鼠标相对于dialog左上角的位置时不变的 
> >> 
> >> 必须注意移动时dialog 不能出了窗口
> >> 
> >> 获取一个元素相对于浏览器视口的**位置，大小**
> >> ```
> >>    var cnt = document.getElementsByClassName('cnt')[0];
        var range = {
              top: cnt.getBoundingClientRect().top,
              right: cnt.getBoundingClientRect().right,
              bottom: cnt.getBoundingClientRect().bottom,
              left: cnt.getBoundingClientRect().left
            }
        // getBoundingClientRect() 为获得元素到视口的位置、大小
> >> ```
> >> 
> >> offsetLeft、offsetTop等都是对于offsetparent的偏移的位置，据此属性计算元素相对于窗口的的位置时：
> >> 
> >> ```
> >> 
> >> //获取元素的纵坐标（相对于窗口
>>>>
     function getTop(e){
       var offset=e.offsetTop;
       if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
       return offset;
     }
        //获取元素的横坐标（相对于窗口）

>>>function getLeft(e){
           var offset=e.offsetLeft;
           if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
          return offset;
         }

> >> ```
> >> 对于被拖动的元素位置可分为四大类（中间部分、上下出界部分、左右出界部分、四个角落）
> 
> * 改变大小(有错误)
> 
> > 和拖动的思路基本一样，分三步（mousedown、mousemove、mousedown）
> > 
> > 改变大小情况分类：
> > > 上方： 改变元素的top、height
> > > 
> > > 下方： 改变元素的height
> > > 
> > > 左方： 改变元素的left 、width
> > > 
> > > 右方： 改变width
> > > 
> > > 左上方： 改变元素的left、top
> > > 
> > > 右上方： 改变元素的width、top
> > >  
> > > 右下方： 改变元素的width、height
> > > 
> > > 左下方： 改变元素的left 、height