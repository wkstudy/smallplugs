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

export {isEmpty, removeEmptyWarning, show, hide}