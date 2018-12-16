function move () {
  var bar = document.getElementById('bar'),
      txt = document.getElementById('txt'),
      obj = {};
      obj.num = 0;
  var t = setInterval(change, 2000, bar, txt, obj);
  function change (bar, txt, obj) {
    if (obj.num <= 100) {
      bar.style.width = obj.num + '%';
      txt.innerHTML = obj.num + '%';
      obj.num++;
    }else {
      clearInterval(t);
    }
  }
}

move();
