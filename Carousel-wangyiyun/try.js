/*
  1. 图片
    * 定时切换 -----------√
    * 鼠标放上去停止切换 ------√
    * 鼠标移开开始切换------√
    * 图片点击----------√
  2. 线
    * 定时切换------√
    * 鼠标放上去停止切换-------√
    * 鼠标移开开始切换-------√
    * 放上去，移下来事件 ----√
  3. 向左、向右
    * 鼠标放上上去 开始显示 -----√
    * 鼠标移开隐藏-------√
    * 点击事件（进行切换）-----√
*/
function picChangeError () {
  /*
  将每张图片的位置改变
  offsetLeft属性只读，无法改变
  */
  var picArr = document.querySelectorAll('ul li'),
      len = picArr.length;
  for (var i = 0;i < len;i++) {
    // 图片位置的改变 z-index值的改变
    picArr[i].offsetLeft -= 250;
    if (picArr[i].offsetLeft < 0) {
      picArr[i].offsetLeft = 1250;
    }
    // z-index值的改变
    if (picArr[i].offsetLeft == 0 || picArr[i].offsetLeft == 500) {
      picArr[i].style.zIndex = 0
    }else if (picArr[i].offsetLeft == 250) {
      picArr[i].style.zIndex = 1
    }else {
      picArr[i].style.zIndex = -1
    }
    //透明度的改变
    if (picArr[i].offsetLeft == 0 || picArr[i].offsetLeft == 500) {
      picArr[i].style.opacity = 0.6;
    }else if (picArr[i].offsetLeft == 250) {
      picArr[i].style.opacity = 1;
    }else {
      picArr[i].style.opacity = 0;
    }
  }
}
function picChange () {
  var picArr = document.querySelectorAll('ul li'),
      len = picArr.length,
      i = 0;
  for (;i < len;i++) {
    if (picArr[i].className == 'after') {
      picArr[(i + 1) % len].className = 'after';
      picArr[i].className = 'now';
      if (i - 1 < 0) {
        picArr[len - 1].className = 'before';
      }else {
        picArr[i - 1].className = 'before';
      }
      //把原来的before删除(原来的now、after都被覆盖掉了)
      if (i == 0) {
        picArr[len - 2].className = '';
      }else if (i == 1) {
        picArr[len - 1].className = '';
      }else {
        picArr[i - 2].className = '';
      }
      break;
    }
  }
}
function picPrev () {
  var picArr = document.querySelectorAll('ul li'),
      len = picArr.length,
      i = 0;
  for (;i < len;i++) {
    if (picArr[i].className == 'before') {
      if (i - 1 < 0) {
        picArr[len - 1].className = 'before';
      }else {
        picArr[i - 1].className = 'before';
      }
      picArr[i].className = 'now';
      picArr[(i + 1) % len].className = 'after';
      //删除之前的after
      picArr[(i + 2)% len].className = '';
      break;
    }
  }
}
function lineChange () {
  // 颜色变化
  var lineArr = document.getElementsByClassName('line'),
      len = lineArr.length;
  for (var i = 0;i < len;i++) {
    if (lineArr[i].className.indexOf('active-line') != '-1') {
      lineArr[i].className = 'line';
      lineArr[(i + 1) % len].className = 'active-line line';
      break;
    }
  }
}
function linePrev () {
  // 颜色变化
  var lineArr = document.getElementsByClassName('line'),
      len = lineArr.length;
  for (var i = 0;i < len;i++) {
    if (lineArr[i].className.indexOf('active-line') != '-1') {
      lineArr[i].className = 'line';
      if (i - 1 < 0) {
        lineArr[len - 1].className = 'active-line line';
      }else {
        lineArr[i - 1].className = 'active-line line';
      }
      break;
    }
  }
}
function next () {
  picChange();
  lineChange();
}
function prev () {
  picPrev();
  linePrev();
}
var timer = setInterval(next, 3000)
//鼠标放到轮播图上，暂停切换,显示prev、next按钮
document.getElementsByClassName('carousel')[0].addEventListener('mousemove', function () {
  clearInterval(timer);
  document.getElementsByClassName('prev')[0].style.display = 'block';
  document.getElementsByClassName('next')[0].style.display = 'block';
}, false)
//鼠标离开轮播图上，重新开始切换，隐藏prev、next按钮
document.getElementsByClassName('carousel')[0].addEventListener('mouseleave', function () {
  timer = setInterval(next, 3000);
  document.getElementsByClassName('prev')[0].style.display = 'none';
  document.getElementsByClassName('next')[0].style.display = 'none';
}, false)
document.querySelector('.prev').addEventListener('click', function () {
  prev();
}, false)
document.querySelector('.next').addEventListener('click', function () {
  next();
}, false)
//图片点击事件（只有点击before、after有切换）
document.querySelector('ul').addEventListener('click', function(e) {
  if (e.target.parentNode.className == 'before') {
    prev();
  }else if (e.target.parentNode.className == 'after') {
    next();
  }
}, false)
document.getElementsByClassName('lines')[0].addEventListener('mouseover', function (e) {
  //只有冒泡到div的类是line的时候才进行判断，其他情况不判断
  if (e.target.className == 'line' || e.target.className == 'active-line line') {
    //暂停切换
    clearInterval(timer);
    var lineArr = this.querySelectorAll('.line'),
        len = lineArr.length,
        target,
        temp,
        acitve;
    //找到active的位置和鼠标的位置
    active = index(lineArr,this.querySelector('.active-line'));
    target = index(lineArr,e.target);
    //进行移动
    temp = Math.abs(target - active);
    if (active > target) {
      while (temp) {
        prev();
        temp--;
      }
    }else {
      while (temp) {
        next();
        temp--;
      }
    }
  }

}, false)
document.getElementsByClassName('lines')[0].addEventListener('mouseout', function (e) {
  if (e.target.className == 'line' || e.target.className == 'active-line line') {
    timer = setInterval(next, 3000);
  }
}, false)
//借鉴jquery的index(),找到子元素在父元素中的索引位置(就是给每个子元素添加一个自定义值index)
function index(father,target) {
  var i,
      len = father.length;
  for (i = 0;i < len;i++) {
    father[i].index = i;
  }
  for (i = 0;i < len;i++) {
    if (father[i].index == target.index) {
      return father[i].index;
    }
  }

}