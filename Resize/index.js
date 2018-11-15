/*
  * 鼠标样式
  * resize
    * 改变大小

    * 不能超过边界
*/ 

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
document.addEventListener('mousemove', function (e) {
  var t = document.getElementById('target');
  var obj = getBoundary(t);
  var dis  =dise(e, obj);
  mouseStyle(e, dis, 10, t)
}, false)

// 改变大小
var flag = false;
var mousex = 0; // mousedown 时的鼠标位置
var mousey = 0;
var tp = 0;   // mousedown 时元素的信息
var lft = 0;
var wdh = 0;
var hgt = 0;
var acitvePos = {   // mousedown 时记录鼠标的位置，供 mousemove 使用
  ontop: false,
  onlft: false,
  onrht: false,
  onbtm: false
}
document.getElementById('target').addEventListener('mousedown', function (e) {
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
    var t = document.getElementById('target');
    var  temp = getBoundary(t);
    var  tparent = getBoundary(t.offsetParent);
    var obj = dise(e, temp);
    ChangeSize(mousex, mousey, wdh, hgt, tp, lft, e, t, temp, tparent, 10, 10, 10)
  }
}, false)

document.addEventListener('mouseup', function() {
  flag = false
  acitvePos.ontop = false
  acitvePos.onbtm = false
  acitvePos.onlft = false
  acitvePos.onrht = false
}, false)
function ChangeSize(mousex, mousey, wdh, hgt, tp, lft, e, dom, temp, tparent,dis, minwdh, minhgt) {
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


/*
* 老版改变大小，有问题
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
    if (temp.rht < tparent.rht) {
      dom.style.width = wdh + e.clientX - mousex + 'px';
    }else {
      console.log(1)
      dom.style.width = tparent.rht - temp.lft + 'px';
    }
  }
}
*/