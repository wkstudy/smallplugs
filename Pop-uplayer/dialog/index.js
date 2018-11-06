/*
* 拖拽功能
    mousedown 获取鼠标坐标
    mouseup
    mousemove(只有mosedown下才能进行)
    mousemove时不能出边界
* 鼠标样式
    靠近dialog时 不同边有不同的样式
* 改变大小
    mousedown
    mousemove
    mouseup
*/
// 移动部分
var disx = 0,
    disy = 0, // 移动时鼠标到元素的距离 
    mflag = false; // 移动flag
// 改变鼠标样式部分
var positionTop = 0,
    positionBtm = 0,
    positionLft = 0,
    positionRht = 0;
// 改变大小时
var cflag = false,
    disTop = 0,
    disBtm = 0,
    disLft = 0,
    disRht = 0; // 鼠标到各条边的距离
    dx = 0,
    dy = 0,
    disWidth = 0,
    disHeight = 0; // mousedown时dialog的位置
//  弹出框活动的范围
var cnt = document.getElementsByClassName('cnt')[0];
var range = {
      top: cnt.getBoundingClientRect().top,
      right: cnt.getBoundingClientRect().right,
      bottom: cnt.getBoundingClientRect().bottom,
      left: cnt.getBoundingClientRect().left
    }
document.getElementById('pop').addEventListener('click', show, false)
document.getElementById('close').addEventListener('click', hidden, false)

// 移动
document.getElementsByTagName('header')[0].addEventListener('mousedown', function(e) {
    mflag = true;
    // 计算鼠标到dialog元素的左上角的距离，如果能够同步移动，这个距离是不变的
    disx = e.clientX - this.parentNode.getBoundingClientRect().left,
    disy = e.clientY - this.parentNode.getBoundingClientRect().top;

}, false)

// 如果绑定在 header 上，鼠标移动过快的话会出 header ,同理 mouseup 也是这样
document.addEventListener('mousemove', function (ev) {
  var dom = document.getElementById('dialog');
  // 鼠标样式
  getPosition(dom);
  mouseStyle(ev, dom, 5) 

  // 拖动
  if (mflag) {
      move(ev, dom);
  }  

  // 改变大小
  if (cflag) {
    var dom = document.getElementById('dialog');
    getPosition(dom);
    changeSize(ev, dom, 5)
  } 
}, false)
document.addEventListener('mouseup', function (e) {
  mflag = false
  cflag = false
}, false)
function hidden () {
  document.getElementById('dialog').style.display = 'none';
}
function show () {
  document.getElementById('dialog').style.display = 'block';
}
function move (ev, dom) {
  if (ev.clientX - disx < range.left || ev.clientX - disx + Number(window.getComputedStyle(dom, null).width.split('px')[0]) > range.right ) {
    // 左右出界
    dom.style.top = ev.clientY - disy + 'px';
  }
  if (ev.clientY -disy < range.top || ev.clientY - disy + Number(window.getComputedStyle(dom, null).height.split('px')[0]) > range.bottom) {
    // 上下出界
    dom.style.left = ev.clientX - disx + 'px';
  }
  // 四个角落
  if (ev.clientX - disx < range.left && ev.clientY - disy < range.top) {
    // 左上角
    dom.style.left = range.left + 'px'
    dom.style.top = range.top + 'px'
  }
  if (ev.clientX - disx + dom.getBoundingClientRect().width > range.right && ev.clientY - disy < range.top) {
    // 右上角
    dom.style.left = range.right - dom.getBoundingClientRect().width + 'px'
    dom.style.top = range.top + 'px'
  }
  if (ev.clientX - disx < range.left && ev.clientY - disy + dom.getBoundingClientRect().height > range.bottom) {
    // 左下角
    dom.style.left = range.left + 'px'
    dom.style.top = range.bottom - dom.getBoundingClientRect().height + 'px'
  }
  if (ev.clientX - disx + dom.getBoundingClientRect().width > range.right && ev.clientY - disy + dom.getBoundingClientRect().height > range.bottom) {
    // 右下角
    dom.style.left = range.right - dom.getBoundingClientRect().width + 'px'
    dom.style.top = range.bottom  - dom.getBoundingClientRect().height + 'px'
  }
  // 中间部分
  if (ev.clientX - disx >= range.left && ev.clientX - disx + dom.getBoundingClientRect().width <= range.right && 
    ev.clientY - disy >= range.top && ev.clientY - disy + dom.getBoundingClientRect().height <= range.bottom) {
    // 在中间
    dom.style.left = ev.clientX - disx + 'px';
    dom.style.top = ev.clientY - disy + 'px';
  }
}
function getPosition (dom) {
  positionTop = dom.getBoundingClientRect().top,
  positionBtm = dom.getBoundingClientRect().bottom,
  positionLft = dom.getBoundingClientRect().left,
  positionRht = dom.getBoundingClientRect().right;
}
function mouseStyle (e, dom, n) {
  // 在上下左右 到边界 n px范围内,设置鼠标样式  
  if (e.clientY - positionTop <= n && e.clientY - positionTop >= 0) {
    // 上
    dom.style.cursor = 'n-resize'
  }
  if (positionBtm - e.clientY <= n && positionBtm - e.clientY >= 0) {
    // 下
    dom.style.cursor = 's-resize'
  }
  if (e.clientX - positionLft <= n && e.clientX - positionLft >= 0) {
    // 左
    dom.style.cursor = 'e-resize'
  }
  if (positionRht - e.clientX <= n && positionRht - e.clientX >= 0) {
    // 右
    dom.style.cursor = 'w-resize'
  }
  if (e.clientY - positionTop <= n && e.clientY - positionTop >= 0 && e.clientX - positionLft <= n && e.clientX - positionLft >= 0) {
    // 左上
    dom.style.cursor = 'nw-resize'
  }
  if (e.clientY - positionTop <= n && e.clientY - positionTop >= 0 && positionRht - e.clientX <= n && positionRht - e.clientX >= 0) {
    // 右上
    dom.style.cursor = 'ne-resize'
  }
  if (positionBtm - e.clientY <= n && positionBtm - e.clientY >= 0 && e.clientX - positionLft <= n && e.clientX - positionLft >= 0) {
    // 左下
    dom.style.cursor = 'sw-resize'
  }
  if (positionBtm - e.clientY <= n && positionBtm - e.clientY >= 0 && positionRht - e.clientX <= n && positionRht - e.clientX >= 0) {
    // 右下
    dom.style.cursor = 'se-resize'
  }

}

// 改变大小 --问题：向右向下 只能往一边拉

document.getElementById('dialog').addEventListener('mousedown', function (e) {
  var _this = this;

  cflag = true;
  dx = e.clientX;
  dy = e.clientY;
  disTop = e.clientY - _this.getBoundingClientRect().top;
  disBtm = e.clientY - _this.getBoundingClientRect().bottom;
  disLft = e.clientX - _this.getBoundingClientRect().left;
  disRht = e.clientX - _this.getBoundingClientRect().right;
  disWidth = _this.getBoundingClientRect().width;
  disHeight = _this.getBoundingClientRect().height;
}, false)

function changeSize (e, dom, n) {
  if (e.clientY - positionTop <= n && e.clientY - positionTop >= 0) {
    // 上
    dom.style.top = e.clientY - disTop + 'px';
    dom.style.height = disHeight + dy - e.clientY + 'px';
  }
  if (positionBtm - e.clientY <= n && positionBtm - e.clientY >= 0) {
    // 下
    dom.style.height = disHeight + e.clientY - dy + 'px';
  }
  if (e.clientX - positionLft <= n && e.clientX - positionLft >= 0) {
    // 左
    dom.style.left = e.clientX - disLft + 'px';
    dom.style.width = dx - e.clientX+ disWidth + 'px'
  }
  if (positionRht - e.clientX <= n && positionRht - e.clientX >= 0) {
    // 右
    dom.style.width = e.clientX - dx + disWidth + 'px'
  }
}