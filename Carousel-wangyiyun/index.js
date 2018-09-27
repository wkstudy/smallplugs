/*
  * function prev
    * function prevPic
    * function preLine

  * function next
    * function nextPic
    * function nextLine
*/
function nextPic () {
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
function prevPic () {
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
function nextLine () {
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
function preLine () {
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
//上一张
function prev () {
  prevPic();
  preLine();
}
//下一张
function next () {
  nextPic();
  nextLine();
}
//初始时定时切换
var timer = setInterval(next, 3000);
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
//上一张
document.querySelector('.prev').addEventListener('click', function () {
  prev();
}, false)
//下一张
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
//移动到线上，切换图片
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
//离开线，重新开始定时切换
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