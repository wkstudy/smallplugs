## 进度条
[demo](https://wkstudy.github.io/smallplugs/progressbar/index.html)


### knowledge
* z-index只对定位元素有效
*  关于定时器的使用，自己了解的太少，需要参考[阮一峰](http://javascript.ruanyifeng.com/advanced/timer.html)

> * 比如定时器执行环境为全局
> * 参数的传递（apply、匿名函数、bind方法），都是用来解决定时器的执行环境为全局的问题
> * 防抖技术

### 注意
* 自己原来将change函数放在外面定义，导致t不被识别，所以定义到了里面
* 使用obj.num而不适用num的原因是，对象传递的引用，而基本类型（Undefined、Null、Boolean、Number、String 5种基本数据类型）是进行复制。
*  发现chrome默认fontsize不是16px，在火狐里面设置html的`font-size： 62.5%`,也就是10px，而Chrome中是12px