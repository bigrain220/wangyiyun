 function showPart1(){
	 console.log(1);
 }
 function showPart2(){
	console.log(2);
}
function showPart3(){
	console.log(3);
}
/*axios.get('xxx').then((res)=>{
	 if(res=='boss'){
		 showPart1();
		 showPart2();
		 showPart3();
	 }else if(res=='manner'){
		showPart1();
		showPart2();		 
	 }else if(res=='staff'){
		showPart3();
	 }
})  */


 function showControl(){
	this.status='';
    this.power={
	  boss:function(){
		showPart1();
		showPart2();
		showPart3();		  
	  },
	  manner:function(){
		showPart1();
		showPart2();
	  },
	  staff:function(){
		showPart3();
	  }
	}
 }
 showControl.prototype.show=function(){
	 var self=this;
	 axios.get('xxx').then((res)=>{
		 self.status=res;
		 self.power[self.status]();
	 })
 }
 new showControl().show();
 
//复合运动
 /*function mover(){
   if(arguments.length==1){
	   if(arguments[0]=='left'){
         moveLeft();
	   }else if(arguments[0]=='right'){
		 moveRight();
	   }else if(arguments[0]=='top'){
		 moveTop();
	   }else if(arguments[0]=='bottom'){
		 moveBottom();
	   }
   }else{
	   if(arguments[0]=='left'&&arguments[1]=='top'){
		 moveLeft();
		 moveTop();
	   }else if(arguments[0]=='right'&&arguments[1]=='bottom'){
		 moveRight();
		 moveBottom();
	   }
	   //....
   }
 }*/

 
 function moveLeft(){
  console.log('left')
 }
 function moveRight(){
	console.log('RigmoveRight')	 
}
function moveTop(){
	console.log('Top')	 
}
function moveBottom(){
	console.log('bomoveBottom')	 
} 
 function mover(){
	 this.status=[];
	 this.actionHandle={
		left:moveLeft,
		right:moveRight,
		top:moveTop,
		bottom:moveBottom
	 }
 }
 mover.prototype.run=function(){
	 this.status=Array.prototype.slice.call(arguments);
	 this.status.forEach((action)=>{
		 this.actionHandle[action]();
	 })
 }
 new mover().run('left','right');