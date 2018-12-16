## 便签

[v1](https://wkstudy.github.io/smallplugs/notePaper/v1/index.html)

[v2](https://wkstudy.github.io/smallplugs/notePaper/v2/index.html)
### description
* 参考[用户Hwaphon](https://github.com/hwaphon/Html5LocalStorage)
* v1、v2实现的功能相同，区别在于v2实现了：
> * 本地保存（localstroage）
> * 模块化（自己第一次摸索模块化，理解可能不到位）
> * 响应式布局
* v2关于模块化：
> * 原先全部写到app.js中，发现自己对于模块化理解还是很模糊，对于模块之间的调用理解不了，于是学习了es6的模块化[es6module](http://es6.ruanyifeng.com/#docs/module);将app.js进行了拆分。
> * chrome已经支持了es6 import/export语法，但需要在服务器下进行
> * 文件结构：
> > appModuleEs6.js    ----> 入口文件
> > animate.js         ----> js动画
> > too.js             ----> 使用的一些工具函数/类
> > commonFun.js       ----> 常用函数
> > Note.js            -----> Note类
> > stroage.js         -----> 对localstroage的操作
> > handler.js         -----> dom事件绑定

### knowledge
#### v1
* bind/call/apply的区别[refer](http://www.admin10000.com/document/6711.html)
*  bind 中参数的位置奇怪，比如`createList.bind(null, document.getElementsByClassName('lists')[0], document.getElementById('text-in'))`中，arguments中arguments[0]/arguments[1]中是参数中的后两个，arguments[2]是一个鼠标事件(也就是e/e.target的那个e)，记录的鼠标信息
*  对前面实现过的bootstrap类型的弹出框有了一个更深的认识，不只是我们看到的中间显示信息的框，还要有一个覆盖全部页面的框，这两个加一起才是一个完整的弹出框，
*  对于visibility/opacity/display:none的使用
*  弹出窗中使用js实现了上下移动的动画
*  js动画实现过程中发现，因为js计算浮点型数据常常有误差，需要处理，于是借鉴了[js计算精度问题](https://blog.csdn.net/m0_37793545/article/details/79196311)的方法，给基本类型Number添加了加减乘除的计算方法，才能保证计算结果的准确性，对应的是calculate.js文件
#### v2
* 原始值和引用值的区分，原始值是不能添加属性的,比如：
```
var a = null;
a.m = 15;
```
这样写会报错, 那么就不能把null 当做一个引用值来看待了
* 使用`instanceof` 可以区分原始值和引用值，所有的引用值都是Object;所以：
```
var a = null; a instanceof Object
false
var a = {}; a instanceof Object
true
```
`a = null` 不是引用值，`a = {}`是引用值
* es6模块引用需要`<script src = 'xxx.js' type = 'module'></script>`
* es6模块引用时发现不能省略js后缀
```
import {EventUtil} from './tool'; // 找不到文件
import {EventUtil} from './tool.js';
```


### error
#### v1
* bind使用过程中，需要传过来鼠标点击时input中的内容，刚开始时的代码为：`createList.bind(null, document.getElementsByClassName('lists')[0], document.getElementById('text-in').value)`,结果在下面一直获取不到值，显示input内容为空，最后发现如果只传过去`document.getElementById('text-in')`,而在函数中获取input内容时就可以了，我得出的 **结论** 是：bind中的参数的内容可能是在编写的时候就确定的，而不是运行的时候（点击）才获取的。为了验证这个结论，将代码改回去，直接在初始的时候就给input赋值，然后点击，发现可以获取到值，而这个值就是初始给的值,之后无论怎么改变，仍然传递的是初始的值，而现在再改成只传递input的写法，只要input内容改变，那么传递的值就改变。
#### v2
* 生成记录的函数 之前的写法：
```
createNoteDom (parentdom, val) // 定义函数， 接收父元素和 给定的值
EventUtil.addHandler(add, 'click', createNoteDom.bind(null, lists, textIn.value)); // 调用时直接把值传过去
```
由于textIn元素是一开始就获取的,所以调用时获取的是textIn的初始值，而不是点击按钮时的值，这种情况以后必须传递dom元素，而不是值，改为如下：
```
createNoteDom (parentdom, dom) // 定义， dom的值在使用时再获取
EventUtil.addHandler(add, 'click', createNoteDom.bind(null, lists, textIn));// 调用
```
* `choosed`用于记录被点击的li，方便弹出框的删除功能或其他操作，但是实际操作过程中发现当点击确定按钮删除时，`choosed`里面没有保存被点击的li，一直很奇怪在点击li的时候明明已经获取到了，我也很奇怪，于是试着将`choosed = null` 改为`choosed = {}`,结果仍然不对，最后在网上提问，发现可能是我理解的有问题，原来我是讲`choosed = null/{}`当做引用值的，可按照网上的说法，这两种仍然是原始值，所以不对，每次改变时，改为`choosed.a= ...`， 结果就对了，(原始值和引用值1)[https://www.cnblogs.com/lihuijuan/p/8625322.html],(原始值和引用值2)[https://www.cnblogs.com/cxying93/p/6106469.html]，到这里问题已经解决了，如果继续探究的话，就涉及到了深拷贝、浅拷贝的区别(深拷贝，浅拷贝)[https://www.cnblogs.com/dinghuihua/p/6674719.html]。但对于`choosed = null/{}`为什么不是引用值，而是原始值，我仍然不是很理解
