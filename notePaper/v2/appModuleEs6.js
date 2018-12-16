import {EventUtil} from './tool.js';
import {isEmpty, removeEmptyWarning, show, hide} from './commonFun.js';
import {animate} from './animate.js';
import {saveStroage, delStroage} from './stroage.js';
import {createLiHandler, cancel, delNote, initEditCnt, editHandler, changeTitleHandler, changeNoteHandler, initLists} from './handler.js';

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