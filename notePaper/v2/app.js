(function () {
  Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
      this.prototype[name] = func;
    }
    return this;
  }

  //加法   
  Number.prototype.add = function(arg){   
      var r1,r2,m;   
      try{r1=this.toString().split(".")[1].length}catch(e){r1=0}   
      try{r2=arg.toString().split(".")[1].length}catch(e){r2=0}   
      m=Math.pow(10,Math.max(r1,r2))   
      return (this*m+arg*m)/m   
  }     
  //减法   
  Number.prototype.sub = function (arg){   
    return this.add(-arg);   
  }   
  //乘法   
  Number.prototype.mul = function (arg){   
    var m=0,s1=this.toString(),s2=arg.toString();   
    try{m+=s1.split(".")[1].length}catch(e){}   
    try{m+=s2.split(".")[1].length}catch(e){}   
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)   
  }  
  //除法   
  Number.prototype.div = function (arg){   
      var t1=0,t2=0,r1,r2;   
      try{t1=this.toString().split(".")[1].length}catch(e){}   
      try{t2=arg.toString().split(".")[1].length}catch(e){}   
      with(Math){   
          r1=Number(this.toString().replace(".",""))   
          r2=Number(arg.toString().replace(".",""))   
          return (r1/r2)*pow(10,t2-t1);   
      }   
  } 

  var EventUtil = {
    addHandler: function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false); // 默认冒泡 
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler); // ie8及更早版本支持支冒泡，所以会被默认添加到冒泡阶段
      } else {
        element["on" + type] = handler; // dom 0级事件
      }
    },
    removeHandler: function (element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(element, type, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);      
      } else {
        element["on" + type] = null;
      }
    },
    getEvent: function (event) {
      return event ? event : window.event; //dom 0 级 event为window的属性
    },
    getTarget: function (event) {
      return event.target || event.srcElement;
    },
    preventDefault: function (event) {
      if (event.preventDefault()) {
        event.preventDefault();
      } else {
        event.returnValue = false;0
      }
    },
    stopPropagation: function (evnet) {
      if (event.stopPropagation()) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    }
  }

  function Note (title) {
    this.id = '';
    this.title = title;
    this.desc = '';
    this.date = '';
  }
  Note.method('setId', function () {
    var id = new Date();
    this.id = 'note' + id.getTime();
  })
  Note.method('getId', function () {
    return this.id;
  })
  Note.method('setTitle', function (title) {
    this.title = title;
  })
  Note.method('getTitle', function () {
    return this.title;
  })
  Note.method('setTitle', function (title) {
    this.title = title;
  })
  Note.method('getTitle', function () {
    return this.title;
  })
  Note.method('setDesc', function (desc) {
    this.desc = desc;
  })
  Note.method('getDesc', function () {
    return this.desc;
  })
  Note.method('setDate', function (date) {
    this.date = date;
  })
  Note.method('getDate', function () {
    return this.date;
  })
  var animate = (function () {
    return function (dom, domBg, direction, time, gap) {
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
  })();

  var stroage = localStorage,
      add = document.getElementById('add'),
      lists = document.getElementsByClassName('lists')[0],
      textIn = document.getElementById('text-in'),
      popBg = document.getElementById('pop-bg'),
      del = document.getElementById('del'),
      edit = document.getElementById('edit'),
      title = document.getElementsByClassName('title')[0],
      changeTitle = document.getElementById('change-title'),
      delCancel = document.getElementById('del-cancel'),
      delSure = document.getElementById('del-sure'),
      editSure = document.getElementById('edit-sure'),
      editCancel = document.getElementById('edit-cancel'),
      choosed = new Object(); // 被点击的li


  EventUtil.addHandler(add, 'click', createLiHandler.bind(null, lists, textIn, stroage));
  EventUtil.addHandler(textIn, 'keyup', function (event) {
    var event = EventUtil.getEvent(event);
    if (event.keyCode == 13) {
      // enter 键
      createLiHandler.call(null, lists, textIn, stroage);
    }
  });
  EventUtil.addHandler(textIn, 'mousedown', removeEmptyWarning.bind(null, textIn));
  EventUtil.addHandler(textIn, 'keydown', removeEmptyWarning.bind(null, textIn));
  EventUtil.addHandler(lists, 'click', cancel.bind(null, choosed, stroage, del, edit, popBg, 'down', 200, 10));

  EventUtil.addHandler(delCancel, 'click', animate.bind(null, del, popBg, 'up', 200, 10));
  EventUtil.addHandler(delSure, 'click', delNote.bind(null, lists, choosed));
  EventUtil.addHandler(delSure, 'click', delStroage.bind(null, stroage, choosed));
  EventUtil.addHandler(delSure, 'click', animate.bind(null, del, popBg, 'up', 200, 10));

  EventUtil.addHandler(edit, 'click', editHandler.bind(null, title, changeTitle, 'hide-title'));
  EventUtil.addHandler(changeTitle, 'change', changeTitleHandler.bind(null, changeTitle, title));
  EventUtil.addHandler(editCancel, 'click', animate.bind(null, edit, popBg, 'up', 200, 10));

  EventUtil.addHandler(editSure, 'click', changeNoteHandler.bind(null, choosed, stroage, edit));
  EventUtil.addHandler(editSure, 'click', animate.bind(null, edit, popBg, 'up', 200, 10));

  initLists(stroage, lists);

  function createLiHandler (parentdom, dom, stroage) {
    if(isEmpty(dom)) {
      dom.value = '输入不能为空';
      if (!dom.classList.contains('empty-warning')) {
        dom.classList.add('empty-warning');
      }
    } else {
      if (!dom.classList.contains('empty-warning')) {
        var note = new Note(dom.value);
        note.setId();

        saveStroage(stroage, note);

        var obj = {};
        obj.id = note.getId();
        obj.title = note.getTitle();
        obj.desc = note.getDesc();
        obj.date = note.getDate();
        createDom(parentdom, obj);

        dom.value = '';
      }
    }
  }
  function isEmpty (dom) {
    return dom.value == '';
  }
  function removeEmptyWarning (dom) {
    if (dom.classList.contains('empty-warning')) {
      dom.classList.remove('empty-warning');
      dom.value = '';
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
  function cancel (choosed ,stroage, del, edit, popBg, direction, time, gap) {
    // 此函数中调用了animatehe和initEditCnt, 应该将这两个函数的参数传进来的，现在偷懒不传了。
    var dom = EventUtil.getTarget(arguments[8]);
    if (dom.classList.contains('icon-shanchu')) {
      animate(del, popBg, direction, time, gap);
      choosed.li = dom.parentNode;
    } else if (dom.classList.contains('icon-bianji')) {
      choosed.li = dom.parentNode;
      initEditCnt(choosed.li.id, edit, stroage);
      animate(edit, popBg, direction, time, gap);
    }
  }
  function delNote (parentdom, choosed) {
    if (choosed.li) {
      parentdom.removeChild(choosed.li)  
    }
  }
  function initEditCnt (id, dom, stroage) {
    var title = dom.querySelector('.title'),
        titleInput = dom.querySelector('#change-title'),
        desc = dom.querySelector('#desc'),
        date = dom.querySelector('#date'),
        obj =  JSON.parse(stroage.getItem(id));
        title.innerHTML = obj.title;
        titleInput.value = obj.title;
        show(titleInput, 'hide-title');
        desc.value = obj.desc;
        date.value = obj.date;
       
  }
  function editHandler (title, changeTitle, className) {
    var dom = EventUtil.getTarget(arguments[3]);
    if (dom.nodeName == 'SPAN') {
      hide(changeTitle, className);
      show(dom, className);
    } else if (dom.id != 'change-title') {
      hide(title, className);
      show(changeTitle, className);
    }
  }
  function changeTitleHandler (changeTitle, title) {
    if (changeTitle.value == '') {
      changeTitle.value = title.innerHTML;
    }else {
      title.innerHTML = changeTitle.value
    }
  }
  function changeNoteHandler (choosed, stroage, dom) {
    if (choosed.li) {
      var id = choosed.li.id,
          title = dom.querySelector('.title'),
          desc = dom.querySelector('#desc'),
          date = dom.querySelector('#date'),
          obj = {};
      // 同步到 localstorage
      obj.id = id;
      obj.title = title.innerHTML;
      obj.desc = desc.value;
      obj.date = date.value;
      stroage.setItem(id, JSON.stringify(obj));
      
      choosed.li.querySelector('span').innerHTML = obj.title;
    }
  }
  function initLists (stroage ,dom) {
    if (stroage.getItem('noteArray')) {
      var arr = stroage.getItem('noteArray').split(','),
          len = arr.length,
          i;
      for (i = 0;i < len;i++) {
        var obj = JSON.parse(stroage.getItem(arr[i]));
        createDom(dom, obj);
      }
    }
  }
  function createDom (dom, obj) {
    var li = document.createElement('li'),
          spanVal = document.createElement('span'),
          iEdit = document.createElement('i'),
          iDel = document.createElement('i');
      li.id = obj.id;
      spanVal.innerHTML = obj.title;
      iEdit.className = 'iconfont icon-bianji';
      iDel.className = 'iconfont icon-shanchu';

      li.appendChild(spanVal);
      li.appendChild(iEdit);
      li.appendChild(iDel);
      dom.appendChild(li);

      li = null;
      spanVal = null;
      iEdit = null;
      iDel = null;
  }

  function saveStroage (stroage, note) {
    if (!stroage.getItem('noteArray')) {
      stroage.setItem('noteArray', note.getId());
    }else {  
      // 新增
      var str = stroage.getItem('noteArray') + ',' + note.getId();
      stroage.setItem('noteArray', str);
    }
    
    stroage.setItem(note.getId(), JSON.stringify(note));
  }
  function delStroage (stroage, choosed) {
    var id = choosed.li.id,
        arr = stroage.getItem('noteArray').split(','),
        index,
        i,
        len = arr.length;
    if (len == 1) {
      stroage.removeItem('noteArray');
      stroage.removeItem(arr[0]);
    } else {
      for (i = 0;i < len;i++) {
        if (arr[i] == id) {
          index = i;
          break;
        }
      }
      stroage.removeItem(arr[i]);
      arr.splice(i, 1);
      stroage.setItem('noteArray', arr.toString());
    }  
  }
})()