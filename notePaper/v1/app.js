var choosed = null; // 被选中的记录
var choosedbtn = null; //被选中记录的按钮（编辑还是删除）
var arrInfo = [];
document.getElementById('add').addEventListener('click', createList.bind(null, document.getElementsByClassName('lists')[0], document.getElementById('text-in'), arrInfo), false);
document.getElementById('text-in').addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    // enter 键
    createList.call(null, document.getElementsByClassName('lists')[0], document.getElementById('text-in'), arrInfo);
  }
}, false)
document.getElementById('text-in').addEventListener('mousedown', function () {
  var that = this;
  cancelWarning(that);
}, false)
document.getElementById('text-in').addEventListener('keydown', function () {
  var that = this;
  cancelWarning(that);
}, false)



document.getElementsByClassName('lists')[0].addEventListener('click', function (e) {
  var target = e.target;
  if (target.classList.contains('delete')) {
    move(document.getElementById('del'), 'down', 200, 10);
    choosed = target.parentNode;
    choosedbtn = target;
  }
  if (target.classList.contains('edit')) {
    move(document.getElementById('edit'), 'down', 200, 10);
    choosed = target.parentNode;
    choosedbtn = target;
    initEditCnt(choosed.id);
  }
}, false)
document.getElementById('edit').addEventListener('click', function(e) {
  var dom = e.target,
      that = this;
  if (dom.nodeName == 'SPAN') {
    show(dom, 'hide-title');
    hide(that.querySelector('#change-title'), 'hide-title');
  }else if (dom.id != 'change-title') {
    hide(that.querySelector('span'), 'hide-title');
    show(that.querySelector('#change-title'), 'hide-title');
  } 
}, false)
document.getElementById('change-title').addEventListener('change', function (e) {
  var that = this;
  if (that.value == '') {
    that.value = document.getElementsByClassName('title')[0].innerHTML;
  }else {
    document.getElementsByClassName('title')[0].innerHTML = that.value
  }
}, false)
document.getElementById('del-cancel').addEventListener('click', move.bind(null, document.getElementById('del'), 'up', 200, 10 ), false)
document.getElementById('del-sure').addEventListener('click', function (e) {
  move.call(null, document.getElementById('del'), 'up', 200, 10 );
  if (choosed) {
    removeInfo(choosed.id);
    document.getElementsByClassName('lists')[0].removeChild(choosed);
  }
}, false)
document.getElementById('edit-cancel').addEventListener('click', move.bind(null, document.getElementById('edit'), 'up', 200, 10 ), false)
document.getElementById('edit-sure').addEventListener('click', function (e) {
  move.call(null, document.getElementById('edit'), 'up', 200, 10 );
  if (choosed) {
    editInfo(choosed.id);
  }
}, false)
document.getElementById('pop-bg').addEventListener('click', function () {
  if (choosedbtn.classList.contains('delete')) {
    move(document.getElementById('del'), 'up', 200, 10);
  }else if (choosedbtn.classList.contains('edit')) {
    move(document.getElementById('edit'), 'up', 200, 10);
  }  
}, false)


function createList (domParent, dom, arrInfo) {
  if (!dom.value || dom.classList.contains('warning')) {
    dom.value = '不能为空';
    if (!dom.classList.contains('warning')) {
      dom.classList.add('warning');
    }
  }else {
    if (dom.classList.contains('warning')) {
      dom.classList.remove('warning');
    }
    // 建立一条记录
    var li = document.createElement('li'),
      spanText = document.createElement('span'),
      spanEdit = document.createElement('span'),
      spanDel = document.createElement('span');

    var info = new Info(dom.value);
    info.setId();
    li.id = info.getId();
    spanText.innerHTML = info.getTitle();
    spanEdit.className = 'iconfont edit';
    spanEdit.innerHTML = '&#xe603;';
    spanDel.className = 'iconfont delete';
    spanDel.innerHTML = '&#xe62a;';

    li.appendChild(spanText);
    li.appendChild(spanEdit);
    li.appendChild(spanDel);
    domParent.appendChild(li);

    li = null;
    spanText = null;
    spanEdit = null;
    spanDel = null;

    // 删除dom的内容
    dom.value = '';
    arrInfo.push(info);
  } 
}

// dom , 方向（up/down）,time(一共多少毫秒), gap(经过多少毫秒执行一次)
// 这个函数本来只为做弹出框的动画，结果在里面也绑定了背景框的改变
function move (dom, direction, time, gap) {
  var t = 0,
      id,
      opty = parseInt(window.getComputedStyle(dom, null).opacity) ,
      top = parseInt(window.getComputedStyle(dom, null).top.split('px')[0]),
      optyTime = 1 / (time / gap),  // opacity 变化为 1
      topTime = 30 / (time / gap);  // 上下移动 20px
  if (direction == 'down') {
    show(document.getElementById('pop-bg'), 'show');
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
    hide(document.getElementById('pop-bg'), 'show');
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

function show (dom, className) {
  if (!dom.classList.contains(className)) {
    dom.classList.add(className);
  }
}
function hide (dom, className) {
  if (dom.classList.contains(className)) {
    dom.classList.remove(className);
  }
}
function cancelWarning (that) {
  if (that.classList.contains('warning')) {
    that.value = '';
    that.classList.remove('warning');
  }
}

function Info (title) {
  this.id = '';
  this.title = title;
  this.desc = '';
  this.date = '';
}

Function.prototype.method = function(name, func){
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};
Info.method('setId', function () {
  var d = new Date();
  this.id = 'note' + d.getTime();
})
Info.method('getId', function () {
  return this.id;
})
Info.method('setTitle', function (title) {
  this.title = title;
})
Info.method('getTitle', function () {
  return this.title;
})
Info.method('setDesc', function (desc) {
  this.desc = desc;
})
Info.method('getDesc', function () {
  return this.desc;
})
Info.method('setDate', function (date) {
  this.date = date;
})
Info.method('getDate', function () {
  return this.date;
})
function removeInfo (id) {
  var len = arrInfo.length;
  for (var i = 0;i < len;i++) {
    if (arrInfo[i].id == id) {
      break;
    }
  }

  arrInfo.splice(i, 1);
}

function findInfo (id) {
  var len = arrInfo.length;
  for (var i = 0;i < len;i++) {
    if (arrInfo[i].id == id) {
      return arrInfo[i];
    }
  }
}
function initEditCnt (id) {
  var info = findInfo(id);
  document.getElementById('change-title').value = info.getTitle();
  document.getElementById('desc').value = info.getDesc();
  document.getElementById('date').value = info.getDate();

  show(document.getElementById('change-title'), 'hide-title');
  document.getElementsByClassName('title')[0].innerHTML = choosed.querySelector('span').innerHTML;
}
function editInfo (id) {
  var info = findInfo(id);
  info.setTitle(document.getElementsByClassName('title')[0].innerHTML);
  info.setDesc(document.getElementById('desc').value);
  info.setDate(document.getElementById('date').value);
  choosed.querySelector('span').innerHTML = info.getTitle();
}
console.log(arrInfo)