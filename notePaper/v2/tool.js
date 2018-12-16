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
      // with(Math){   
      //     r1=Number(this.toString().replace(".",""))   
      //     r2=Number(arg.toString().replace(".",""))   
      //     return (r1/r2)*pow(10,t2-t1);   
      // }   
      r1=Number(this.toString().replace(".",""))   
      r2=Number(arg.toString().replace(".",""))   
      return (r1/r2)*pow(10,t2-t1);
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


  export {EventUtil};