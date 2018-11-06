function hidden () {
  document.getElementsByClassName('modal')[0].style.display = 'none';
}
function show () {
  document.getElementsByClassName('modal')[0].style.display = 'block';
}
document.getElementById('pop').addEventListener('click', show, false)
document.getElementById('x').addEventListener('click', hidden, false)
document.getElementById('close').addEventListener('click', hidden, false)
document.getElementsByClassName('modal')[0].addEventListener('click', hidden, false)
document.getElementsByClassName('modal-content')[0].addEventListener('click', function(e) {
  e.stopPropagation()
}, false)
