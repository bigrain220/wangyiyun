//menu1,menu2,menu3
/*function menuItem(word){
  this.word="";
  this.dom=document.createElement('div');
  this.dom.innerHTML=this.word;  
}
var menu1=new menuItem('menu1');
var menu2=new menuItem('menu2');
var menu3=new menuItem('menu3');
menu1.onmouseover=function(){
  menu1.style.color='red';
}
menu2.onmouseover=function(){
  menu1.style.color='green';
}
menu3.onmouseover=function(){
  menu1.style.color='blue';
}
menu1.onmouseout=function(){
  menu1.style.color='white';
}
menu2.onmouseout=function(){
  menu1.style.color='white';
}
menu3.onmouseout=function(){
  menu1.style.color='white';
}*/

function menuItem(word,color){
  this.word=word;
  this.color=color;
  this.dom=document.createElement('div');
  this.dom.innerHTML=this.word;
  document.getElementById('app').appendChild(this.dom);
}

menuItem.prototype.bind=function(){
  var self=this;
  this.dom.onmouseover=function(){
     console.log(self.color);
  	this.style.color=self.color.colorOver;
  }
  this.dom.onmouseout=function(){
  	this.style.color=self.color.colorOut;
  }  
}
function menuColor(colorover,colorout){
  this.colorOver=colorover;
  this.colorOut=colorout;
}


var data=[{word:'menu1',color:['red','black']},{word:'menu2',color:['green','black']},{word:'menu3',color:['blue','black']}]
for(var i=0;i<data.length;i++){

  new menuItem(data[i].word,new menuColor(data[i].color[0],data[i].color[1])).bind();

}



//express
var methods=['get','post','delete','put'];
methods.forEach(function(method){
  app[method]=function(){
    route[method].apply(route,slice.call(arguments,1))
  }
})
