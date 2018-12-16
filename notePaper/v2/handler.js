import {EventUtil} from './tool.js';
import {isEmpty, removeEmptyWarning, show, hide} from './commonFun.js';
import Note from './Note.js';
import {saveStroage, delStroage} from './stroage.js';
import {animate} from './animate.js';
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

function cancel (choosed ,stroage, del, edit, popBg, direction, time, gap) {
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

export {createLiHandler, cancel, delNote, initEditCnt, editHandler, changeTitleHandler, changeNoteHandler, initLists};