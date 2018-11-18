document.getElementsByTagName('section')[0].addEventListener('click', function (ev) {
  var dom = ev.target;
  var _this = this;

  if (dom.nodeName == 'H2') {    
    if (_this.querySelectorAll('.show')[0]) {
      // 存在show
      if (!dom.nextElementSibling.classList.contains('show')) {
        _this.querySelector('.show').previousElementSibling.querySelector('span').innerHTML = '&#xe6bf;';
        _this.querySelector('.show').classList.remove('show');

        dom.nextElementSibling.classList.add('show');
        dom.querySelector('span').innerHTML = '&#xe600;';
      }else {
        dom.querySelector('span').innerHTML = '&#xe6bf;';
        dom.nextElementSibling.classList.remove('show');
      }

    }else {
      dom.nextElementSibling.classList.add('show');
      dom.querySelector('span').innerHTML = '&#xe600;'
    }
    
  }
}, false)