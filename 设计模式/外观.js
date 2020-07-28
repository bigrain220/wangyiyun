//选项卡插件
function tab(){
  this.dom=null
}
tab.prototype.initHTML=function(){

}
tab.prototype.changeTab=function(){
      
}
tab.prototype.eventBind=function(){
   var self=this;
   this.dom.onclick=function(){
     self.changeTab();
   }
}
tab.prototype.init=function(config){
  this.initHTML(config);
  this.eventBind();
}
 
 
//dom支持检测
function addEvent(dom,type,fn){
  if(dom.addEventListener){
  	dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
  	dom.attachEvent('on'+type,fn)
  }else{
  	dom['on'+type]=fn
  }
}