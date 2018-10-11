document.querySelector('ul.easy-tab').addEventListener('click', function(event){
  var that = this
  var e = event.target
  if (e.nodeName == 'LI') {
    if (e.classList.contains('active')) {
      // nothing to do
    }else {
      // 清除active
      var liArr = that.querySelectorAll('li');
      liArr.forEach( function(element) {
        if (element.classList.contains('active')) {
          element.classList.remove('active')
          //顺便让这个元素对应的content为display none
          var id = element.dataset.id;
          document.getElementById(id).style.display = 'none'
        }
      });
      // 添加 active
      e.classList.add('active')

      // 显示content
      var id = e.dataset.id;
      document.getElementById(id).style.display = 'block'
    }
  }

}, false)