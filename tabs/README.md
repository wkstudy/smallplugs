# 选项卡（tabs）
[demo1](https://wkstudy.github.io/smallplugs/tabs/index.html)
[demo2](https://wkstudy.github.io/smallplugs/tabs/another.html)
## 说明
* 两个页面,css不同，js相同，都是看layui,jqueryui写的，demo1.html用的伪元素，demo2.html用的相对定位

## knowledge
* demo1.html

>* 样式：下划线用的::after伪元素

>* 点击每个li，使用html5的data-*属性得到要显示content的id，并设置其display属性为block，其他都是none

* demo2.html

>* 样式：使用的是border属性，思路为li都设置为inline-block,然后都相对于自己本身的位置进行相对定位，向下.1rem，正好使得li的bordr-bottom覆盖ul的border-bottom,那么默认情况下显示li的border-bottom和ul的border-bottom颜色相同#e6e6e6，点击时，设置li的border-bottom为白色，就达到目的了。

            ```
            ul {
              list-style-type: none;
              border-bottom: .1rem solid #e6e6e6;
            }
            ul li {
              display: inline-block;
              width: 9.0rem;
              font-size: 1.4rem;
              line-height: 4.0rem;
              text-align: center;
              cursor: pointer;
              border: .1rem solid white;
              position: relative;
              top: .1rem;// 关键点在于相对定位后往下移动.1rem,覆盖ul的border-bottom
              border-bottom: .1rem solid #e6e6e6;
            }
            .active {
              border-top: .1rem solid #e6e6e6;
              border-left: .1rem solid #e6e6e6;
              border-right: .1em solid #e6e6e6;
              border-bottom: .1rem solid white;
            }
            ```
>* 点击每个li，使用html5的data-*属性得到要显示content的id，并设置其display属性为block，其他都是none（和demo1.html一样）