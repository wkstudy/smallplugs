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
// 移动
var mflag = false;
var movemousex = 0;
var movemousey = 0;
var movetp = 0;
var movelft = 0;
var movewdh = 0;
var movehgt = 0;
var moveparent = getBoundary(document.getElementsByClassName('cnt')[0]); // 因为父容器元素大小一直不变，所以没必要在事件中重复获取

// 改变大小
var flag = false;
var mousex = 0; // mousedown 时的鼠标位置
var mousey = 0;
var tp = 0;   // mousedown 时元素的信息
var lft = 0;
var wdh = 0;
var hgt = 0;
var tparent = getBoundary(document.getElementsByClassName('cnt')[0]); // 因为父容器元素大小一直不变，所以没必要在事件中重复获取
var acitvePos = {   // mousedown 时记录鼠标的位置，供 mousemove 使用
  ontop: false,
  onlft: false,
  onrht: false,
  onbtm: false
}


document.getElementById('pop').addEventListener('click', show, false)
document.getElementById('close').addEventListener('click', hidden, false)

// 移动
document.getElementsByTagName('header')[0].addEventListener('mousedown', function(e) {
    mflag = true;
    // 计算鼠标到dialog元素的左上角的距离，如果能够同步移动，这个距离是不变的
    // disx = e.clientX - this.parentNode.getBoundingClientRect().left,
    // disy = e.clientY - this.parentNode.getBoundingClientRect().top;
    var _this = this;
    var parent = _this.parentNode;
    movemousex = e.clientX;
    movemousey = e.clientY;
    movetp = parent.offsetTop
    movelft = parent.offsetLeft;
    movewdh = parent.offsetWidth;
    movehgt = parent.offsetHeight;
}, false)

// 如果绑定在 header 上，鼠标移动过快的话会出 header ,同理 mouseup 也是这样
document.addEventListener('mousemove', function (e) {
  var dom = document.getElementById('dialog');

  if (mflag) {
    move(e, dom, movemousex, movemousey, movetp, movelft, movewdh, movehgt, moveparent, 5)
  }
}, false)
document.addEventListener('mouseup', function (e) {
  mflag = false
}, false)


// 鼠标样式
document.addEventListener('mousemove', function(e) {
  var dom = document.getElementById('dialog');
  var obj = getBoundary(dom);
  var dis  = dise(e, obj);
  mouseStyle(e, dis, 5, dom)
}, false)

// 改变大小
document.getElementById('dialog').addEventListener('mousedown', function (e) {
  var _this = this;
  var temp = getBoundary(_this);
  var obj = dise(e, temp);

  e.preventDefault(); // 阻止默认行为，使得文本不被选中

  mousex = e.clientX;
  mousey = e.clientY;
  tp = _this.offsetTop;
  lft = _this.offsetLeft;
  wdh = _this.offsetWidth;
  hgt = _this.offsetHeight;

  MousePos(obj, 10)
}, false)
document.addEventListener('mousemove', function (e) {
  if (flag) {
    var t = document.getElementById('dialog');
    var  temp = getBoundary(t);
    var obj = dise(e, temp);
    changeSize(mousex, mousey, wdh, hgt, tp, lft, e, t, temp, tparent, 5, 320, 100)
  }
}, false)
document.addEventListener('mouseup', function() {
  flag = false
  acitvePos.ontop = false
  acitvePos.onbtm = false
  acitvePos.onlft = false
  acitvePos.onrht = false
}, false)
function hidden () {
  document.getElementById('dialog').style.display = 'none';
}
function show () {
  document.getElementById('dialog').style.display = 'block';
}

function move (e, dom, movemousex, movemousey, movetp, movelft, movewdh, movehgt, moveparent, dis) {
  if (movetp + e.clientY - movemousey < dis || moveparent.btm - moveparent.top - (movetp + e.clientY - movemousey) - movehgt < dis) {
    // 上下出界
    dom.style.left = movelft + e.clientX - movemousex + 'px';
  }
  if (movelft + e.clientX - movemousex < dis || moveparent.rht - moveparent.lft - (movelft + e.clientX - movemousex) - movewdh < dis) {
    // 左右出界
    dom.style.top = movetp + e.clientY - movemousey + 'px';
  }

  if (movetp + e.clientY - movemousey >= dis && moveparent.btm - moveparent.top - (movetp + e.clientY - movemousey) - movehgt >= dis && movelft + e.clientX - movemousex >= dis && moveparent.rht - moveparent.lft - (movelft + e.clientX - movemousex) - movewdh >= dis) {
    // 中间部分
    dom.style.top = movetp + e.clientY - movemousey + 'px';
    dom.style.left = movelft + e.clientX - movemousex + 'px';
  }
  // 四个角落
  if (movetp + e.clientY - movemousey < dis && movelft + e.clientX - movemousex < dis) {
    // left top
    dom.style.top = dis + 'px';
    dom.style.left = dis + 'px';
  }

  if (movetp + e.clientY - movemousey < dis && moveparent.rht - moveparent.lft - (movelft + e.clientX - movemousex) - movewdh < dis) {
    // right top
    dom.style.top = dis + 'px';
    dom.style.left = moveparent.rht - moveparent.lft - movewdh - dis + 'px';
  }

  if (moveparent.btm - moveparent.top - (movetp + e.clientY - movemousey) - movehgt < dis && moveparent.rht - moveparent.lft - (movelft + e.clientX - movemousex) - movewdh < dis) {
    // right bottom
    dom.style.top = moveparent.btm - moveparent.top - movehgt - dis + 'px';
    dom.style.left = moveparent.rht - moveparent.lft - movewdh - dis + 'px';
  }

  if (moveparent.btm - moveparent.top - (movetp + e.clientY - movemousey) - movehgt < dis && movelft + e.clientX - movemousex < dis) {
    // left bottom
    dom.style.top = moveparent.btm - moveparent.top - movehgt - dis + 'px';
    dom.style.left = dis + 'px';
  }
}

// 获取目标元素各条边的位置(距离视口)
function getBoundary (dom) {
  return {
    top: dom.getBoundingClientRect().top,
    btm: dom.getBoundingClientRect().bottom,
    lft: dom.getBoundingClientRect().left,
    rht: dom.getBoundingClientRect().right,
  }

}
// 获取鼠标到各条边的距离
function dise (e, obj) {
  return {
    disTop: e.clientY - obj.top,
    disBtm: obj.btm - e.clientY,
    disLft: e.clientX - obj.lft,
    disRht: obj.rht - e.clientX
  }
}
// 设置鼠标样式
function mouseStyle (e, obj, dis, dom) {
  if (obj.disTop >= 0 && obj.disTop < dis && obj.disLft >=0 && obj.disLft < dis) {
    // 左上
    dom.style.cursor = 'nw-resize'
    return
  }
  if (obj.disTop >= 0 && obj.disTop < dis && obj.disRht >=0 && obj.disRht < dis) {
    // 右上
    dom.style.cursor = 'ne-resize'
    return
  }
  if (obj.disBtm >=0 && obj.disBtm < dis && obj.disLft >= 0 && obj.disLft < dis) {
    // 左下
    dom.style.cursor = 'sw-resize'
    return
  }
  if (obj.disBtm >=0 && obj.disBtm < dis && obj.disRht >= 0 && obj.disRht < dis) {
    // 右下
    dom.style.cursor = 'se-resize'
    return
  }
  if (obj.disTop >= 0 && obj.disTop < dis) {
    // 上
    dom.style.cursor = 'n-resize'
    return
  }
  if (obj.disBtm >= 0 && obj.disBtm < dis) {
   // 下
    dom.style.cursor = 's-resize'
    return
  }
  if (obj.disLft >= 0 && obj.disLft < dis) {
   // 左
    dom.style.cursor = 'e-resize'
    return
  }
  if (obj.disRht >= 0 && obj.disRht < dis) {
    // 右
    dom.style.cursor = 'w-resize'
    return
  }
  dom.style.cursor = 'auto';
}

// 判断 mousedown 时，鼠标位于上下左右哪个区域，便于 mousemove 时改变大小
function MousePos (obj, dis) {
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

function changeSize(mousex, mousey, wdh, hgt, tp, lft, e, dom, temp, tparent, dis, minwdh, minhgt) {
  if (acitvePos.ontop) {
    // 上
    if (tp + (e.clientY - mousey) > dis && hgt - (e.clientY - mousey) > minhgt) {
      dom.style.top = tp + (e.clientY - mousey) + 'px';
      dom.style.height = hgt - (e.clientY - mousey) + 'px'; 
    }
  }
  if (acitvePos.onbtm) {
     // 下
     if (hgt + e.clientY - mousey < tparent.btm - temp.top - dis && hgt + e.clientY - mousey > minhgt) {
      //  (hgt + e.clientY - mousey)指高度， 当高度小于最大高度（tparent.btm - temp.top - dis）
      dom.style.height = hgt + e.clientY - mousey + 'px';
    }
  }
  if (acitvePos.onlft) {
    // 左
    if (lft + (e.clientX - mousex) > dis && wdh - (e.clientX - mousex) > minwdh) {
      dom.style.left = lft + (e.clientX - mousex) + 'px';
      dom.style.width = wdh - (e.clientX - mousex) + 'px';
    }
  }
  if (acitvePos.onrht) {
    // 右
    if (wdh + e.clientX - mousex < tparent.rht - temp.lft - dis && wdh + e.clientX - mousex > minwdh) {
      //  (wdh + e.clientX - mousex)指宽度， 当宽度小于最大宽度（tparent.rht - temp.lft - dis）
      dom.style.width = wdh + e.clientX - mousex + 'px';
    }
  }
}