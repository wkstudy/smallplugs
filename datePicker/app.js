document.getElementById('date').addEventListener('click', function () {
  this.value = '';
  document.getElementById('date-picker').style.display = 'block';
  var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth() + 1;

  show(m, y);
}, false)
document.getElementsByClassName('left')[0].addEventListener('click', function () {
  var m = document.getElementById('month').innerHTML,
      y = document.getElementById('year').innerHTML;

  m = convertMonthToLn(m) - 1 == 0 ? 12 : convertMonthToLn(m) - 1;
  if (m == 12) {
    y = y - 1;
  }

  show(m, y)
}, false)

document.getElementsByClassName('right')[0].addEventListener('click', function () {
  var m = document.getElementById('month').innerHTML,
      y = document.getElementById('year').innerHTML;

  m = convertMonthToLn(m) + 1 == 13 ? 1 : convertMonthToLn(m) + 1;
  if (m == 1) {
    y = parseInt(y) + 1;
  }

  show(m, y)
}, false)

document.getElementsByTagName('table')[0].addEventListener('click', function (e) {
  var dom = e.target;
  if (dom.classList.contains('txt')) {
    var d = dom.innerHTML,
        m = document.getElementById('month').innerHTML,
        y = document.getElementById('year').innerHTML;
    m = convertMonthToLn(m);
    var str = m + '\/' + d + '\/' + y;
    console.log(str)
    document.getElementById('date').value = str;
    document.getElementById('date-picker').style.display = 'none';
  }
}, false)

function show (m, y) {
  document.getElementById('month').innerHTML = convertMonthToEn(m);
  document.getElementById('year').innerHTML = y;
  // 删除tbody 所有子节点
  while (document.getElementsByTagName('tbody')[0].childNodes.length) {
    document.getElementsByTagName('tbody')[0].removeChild(document.getElementsByTagName('tbody')[0].childNodes[0]);
  }
  document.getElementsByTagName('tbody')[0].append(createTable(getRow(m, y)));
  var tds = document.getElementsByTagName('tbody')[0].querySelectorAll('td');
  createNumber(m, y, tds);
}
function convertMonthToEn (num) {
  switch (num) {
    case 1:
      num = 'January';
      break;
    case 2:
      num = 'February';
      break;
    case 3:
      num = 'March';
      break;
    case 4:
      num = 'April';
      break;
    case 5:
      num = 'May';
      break;
    case 6:
      num = 'June';
      break;
    case 7:
      num = 'July';
      break;
    case 8:
      num = 'August';
      break;
    case 9:
      num = 'September';
      break;
    case 10:
      num = 'October'; 
      break;
    case 11:
      num = 'November';
      break;
    case 12:
      num = 'December';
      break;
    default:
      console.log(num);
      break;
  }
  return num;
}
function convertMonthToLn(str) {
  var num;
  switch (str) {
    case 'January':
      num = 1;
      break;
    case 'February':
      num = 2;
      break;
    case 'March':
      num = 3;
      break;
    case 'April':
      num = 4;
      break;
    case 'May':
      num = 5;
      break;
    case 'June':
      num = 6;
      break;
    case 'July':
      num = 7;
      break;
    case 'August':
      num = 8;
      break;
    case 'September':
      num = 9;
      break;
    case 'October':
      num = 10; 
      break;
    case 'November':
      num = 11;
      break;
    case 'December':
      num = 12;
      break;
    default:
      console.log(num);
      break;
  }
  return num;
}
function week (m, y) {
  // 这个月一号是星期几
  var str = m + '\/1\/' + y,
      time = new Date(str);
 return time.getDay();
}
function days (m, y) {
  // 这个月的天数
  var  days;
  if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
    days = 31;
  }else if (m == 2) {
    if (isLeapYear(y)) {
      days = 29;
    }else {
      days = 28;
    }
  }else {
    days = 30;
  }
  return days;
}
function getRow (m, y) {
  var w = week(m, y),
      d = days(m, y);
  return Math.ceil((w + d) / 7);
}
function isLeapYear (year) {
  // 是否是闰年
  if (year / 4 == 0 && year / 100 != 0 || year / 400 == 0) {
    return true;
  }else {
    return false;
  }
}
function createTable(row) {
  // 生成 tbody 部分
  var fragment = document.createDocumentFragment(),
      i,
      j;
  for (i = 0;i < row;i++) {
    var tr = document.createElement('tr');
    for(j = 0;j < 7;j ++) {
      var td = document.createElement('td');
      tr.append(td);
    }
    fragment.append(tr);
  }
  return fragment;
}
function createNumber (m, y, tds) {
  var w = week(m, y),
      d = days(m, y),
      i;
      // console.log(w)
  for (i = 1;i <= d;i++ ) {
    tds[i + w - 1].innerHTML = i;
    tds[i + w - 1].classList.add('txt');
    if (today(m, y, i)) {
      tds[i + w - 1].classList.add('now')
    }
  }
}
function today (m, y, d) {
  // 判断是不是当天
  var date = new Date(),
      todayM = date.getMonth() + 1,
      todayY = date.getFullYear(),
      todayD = date.getDate();
  if (m == todayM && y == todayY && d == todayD) {
    return true;
  }else {
    return false;
  }
}