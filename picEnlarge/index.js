/*
  * span的显示 ---√
  * span的位置随着鼠标位置移动
    将total分为了9个部分，每个部分span的位置的设置都不同
  * 放大图片和span对应
*/
function show () {
  document.getElementsByTagName('span')[0].style.display = 'block';
  document.getElementsByClassName('large')[0].style.display = 'block';
}
function hidden () {
  document.getElementsByTagName('span')[0].style.display = 'none';
  document.getElementsByClassName('large')[0].style.display = 'none';
}
document.getElementsByClassName('total')[0].addEventListener('mouseover', function (e) {
  show();
}, false)
document.getElementsByClassName('total')[0].addEventListener('mouseleave', function () {
  hidden();
}, false)

document.getElementsByClassName('total')[0].addEventListener('mousemove', function (e) {
    var spanWidth = document.getElementsByTagName('span')[0].clientWidth,
        spanHeight = document.getElementsByTagName('span')[0].clientHeight,
        totalClientLeft = this.clientLeft,
        totalWidth = this.clientWidth,
        totalClientTop = this.clientTop,
        totalHeight = this.clientHeight;
        
    if (e.clientX > totalClientLeft + spanWidth / 2 && e.clientX < totalClientLeft + totalWidth - spanWidth / 2 && e.clientY > totalClientTop + spanHeight / 2 && e.clientY < totalClientTop + totalHeight - spanHeight / 2) {
      //在中间部分，鼠标点位于span中心
      document.getElementsByTagName('span')[0].style.left = e.clientX - spanWidth / 2 + 'px';
      document.getElementsByTagName('span')[0].style.top = e.clientY - spanHeight / 2 + 'px';
      largeImgPostion();
    }else if (e.clientY < totalClientTop + spanHeight / 2 && e.clientX > totalClientLeft + spanWidth / 2 && e.clientX < totalClientLeft + totalWidth - spanWidth / 2 || e.clientY > totalClientTop + totalHeight - spanHeight / 2 && e.clientX > totalClientLeft + spanWidth / 2 && e.clientX < totalClientLeft + totalWidth - spanWidth / 2) {
      //位于上方或者下方，span可以跟着鼠标左右移动，而不能上下移动
       document.getElementsByTagName('span')[0].style.left = e.clientX - spanWidth / 2 + 'px';
       if (e.clientY < totalClientTop + spanHeight / 2) {
        //上方
        document.getElementsByTagName('span')[0].style.top = 0 + 'px';
       }else {
        //下方
        document.getElementsByTagName('span')[0].style.top = totalClientTop + totalHeight - spanHeight + 'px';
       }
       largeImgPostion();
    }else if (e.clientX < totalClientLeft + spanWidth / 2 && e.clientY > totalClientTop + spanHeight / 2 && e.clientY < totalClientTop + totalHeight - spanHeight / 2 || e.clientX > totalClientLeft + totalHeight - spanWidth / 2 && e.clientY > totalClientTop + spanHeight / 2 && e.clientY < totalClientTop + totalHeight - spanHeight / 2) {
      //位于左边或右边，span可以跟着鼠标上下移动，而不能左右移动
      document.getElementsByTagName('span')[0].style.top = e.clientY - spanHeight / 2 + 'px';
      if (e.clientX < totalClientLeft + spanWidth / 2) {
        //左边
        document.getElementsByTagName('span')[0].style.left = 0 + 'px';
       }else {
        //右边
        document.getElementsByTagName('span')[0].style.left = totalClientLeft + totalWidth - spanWidth + 'px';
       }
      largeImgPostion();
    }else {
      //位于四个角落，span不随鼠标移动 
      if (e.clientX < totalClientLeft + spanWidth / 2 && e.clientY < totalClientTop + spanHeight / 2) {
        //左上
        document.getElementsByTagName('span')[0].style.left = 0 + 'px';
        document.getElementsByTagName('span')[0].style.top = 0 + 'px';
      }else if (e.clientX > totalClientLeft + totalWidth - spanWidth / 2 && e.clientY < totalClientTop + spanHeight / 2) {
        //右上
        document.getElementsByTagName('span')[0].style.left = totalClientLeft + totalWidth - spanWidth + 'px';
        document.getElementsByTagName('span')[0].style.top = 0 + 'px';
      }else if (e.clientX < totalClientLeft + totalHeight - spanWidth / 2 && e.clientY > totalClientTop + totalHeight - spanHeight / 2) {
        //左下
        document.getElementsByTagName('span')[0].style.left = 0 + 'px';
        document.getElementsByTagName('span')[0].style.top = totalClientTop + totalHeight - spanHeight + 'px';
      }else if (e.clientX > totalClientLeft + totalWidth - spanWidth / 2 && e.clientY > totalClientTop + totalHeight - spanHeight / 2) {
        //右下
        document.getElementsByTagName('span')[0].style.left = totalClientLeft + totalWidth - spanWidth + 'px';
        document.getElementsByTagName('span')[0].style.top = totalClientTop + totalHeight - spanHeight + 'px';
      }
      largeImgPostion();
    }
}, false)
function largeImgPostion () {
  document.querySelector('.large img').style.left = -document.getElementsByTagName('span')[0].offsetLeft * 3 + 'px';
  document.querySelector('.large img').style.top =  -document.getElementsByTagName('span')[0].offsetTop * 3 + 'px';
}
