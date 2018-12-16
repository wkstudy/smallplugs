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

export {saveStroage, delStroage};