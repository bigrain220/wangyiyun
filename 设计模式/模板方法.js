function basePop(word,size){
  this.word=word;
  this.size=size;
  this.dom=null;
}
basePop.prototype.init=function(){
	var div=document.createElement('div');
	div.innerHTML=this.word;
	div.style.width=this.size.width+'px';
	div.style.height=this.size.height+'px';
	this.dom=div;
}
basePop.prototype.hidden=function(){
   //定义基础操作
   this.dom.style.display='none';
}
basePop.prototype.confirm=function(){
   //定义基础操作
   this.dom.style.display='none';
}
function ajaxPop(word,size){
  basePop.call(this,word,size);
}
ajaxPop.prototype=new basePop();
var hidden=ajaxPop.prototype.hidden;
ajaxPop.prototype.hidden=function(){
	hidden.call(this);
	console.log(1);
}
var confirm=ajaxPop.prototype.confirm;
ajaxPop.prototype.confirm=function(){
	confirm.call(this);
	console.log(1);
}
var pop=new ajaxPop('sendmes',{width:100,height:300});
pop.init();
pop.confirm();

var axios={get:function(){
	return Promise.resolve();
}};
 

 //算法计算器

function counter(){
  this.beforeCounter=[];
  this.afterCounter=[];
}

//然后我们把具体的不同部分留到具体使用的时候去扩展
//所以我们定义两个方法来扩展
counter.prototype.addBefore=function(fn){
   this.beforeCounter.push(fn);
}
counter.prototype.addAfter=function(fn){
   this.afterCounter.push(fn);
}

//最终计算方法
counter.prototype.count=function(num){
   //结果边两
   var _resultnum=num;
   //算法队列数组组装
   var _arr=[baseCount];
   _arr=this.beforeCounter.concat(_arr);
   _arr=_arr.concat(this.afterCounter);
   //不同部分的相同算法骨架
   function baseCount(num){
     num+=4;
     num*=2;
     return num;
   }
   //循环执行算法队列
   while(_arr.length>0){
     _resultnum=_arr.shift()(_resultnum);
   }
   return _resultnum;
}
//使用
var countObject=new counter();
countObject.addBefore(function(num){
   num--;
   return num;
})
countObject.addAfter(function(num){
  num*=2;
  return num;
})
countObject.count(10);
