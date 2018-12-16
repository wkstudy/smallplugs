import {show, hide} from './commonFun.js';
function animate (dom, domBg, direction, time, gap) {
  var t = 0,
      id,
      opty = parseInt(window.getComputedStyle(dom, null).opacity) ,
      top = parseInt(window.getComputedStyle(dom, null).top.split('px')[0]),
      optyTime = 1 / (time / gap),  // opacity 变化为 1
      topTime = 30 / (time / gap);  // 上下移动 20px
  if (direction == 'down') {
    show(domBg, 'show');
    show(dom, 'show-pop');
    id = setInterval(function () {
      t += gap;
      // opty += optyTime;
      // top += topTime;
      opty = opty.add(optyTime);
      top = top.add(topTime);
      dom.style.top = top + 'px';
      dom.style.opacity = opty;
      if (t == time) {
        clearInterval(id);
      }
    }, gap, t, opty, top, time, optyTime, topTime);
  }else if (direction == 'up') {
    hide(domBg, 'show');
    id = setInterval(function () {
      t += gap;
      // opty -= optyTime;
      // top -= topTime;
      opty = opty.sub(optyTime);
      top = top.sub(topTime);
      dom.style.top = top + 'px';
      dom.style.opacity = opty;
      if (t == time) {
        clearInterval(id);
        hide(dom, 'show-pop');
      }
    }, gap, t, opty, top, time, optyTime, topTime);
  }  
} 
export {animate};