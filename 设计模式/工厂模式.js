//弹窗
function infoPop(){

}
function confirmPop(){

}
function cancelPop(){

} 
 



function pop(type,content,color){
	if(this instanceof pop){
 		var s=new this[type](content,color);
 		return s;
	}else{
		return new pop(type,content,color);
	}
	
	/*if(this instanceof pop){
	  return pop(type,content,color)
	}else{
            
	}
	function infoPop(){

	}
	function confirmPop(){

	}
	function cancelPop(){

	}	

	switch(type) {
	  case 'infoPop':
	  return new infoPop(content,color);
	  case 'confirmPop':
	  return new confirmPop(content,color);
	  case 'cancelPop':
	  return new cancelPop(content,color);
	}*/
}
pop.prototype.infoPop=function(){
  console.log('infoPop');
}
pop.prototype.confirmPop=function(){
	
}
pop.prototype.cancelPop=function(){
	
}

//pop('infoPop','hello','red');
var data=[
  {
  	type:'infoPop',
  	content:'hello',
  	color:'red'
  },
  {
  	type:'infoPop',
  	content:'good good study',
  	color:'red'
  },  
  {
  	type:'confirmPop',
  	content:'good good study',
  	color:'green'
  },    
];
data.forEach((item)=>{
   console.log( pop(item.type,item.content,item.color));
})
data.forEach((item)=>{
   console.log(new pop(item.type,item.content,item.color));
})

//jquery

(function(){
    var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	}
	jQuery.fn=jQuery.prototype={
		init:function(){
			
		}
	}
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.extend = jQuery.fn.extend = function() {

	}
	jQuery.extend({

	});
    window.$=jquery;
})()