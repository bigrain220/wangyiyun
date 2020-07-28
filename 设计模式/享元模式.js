//文件上传
function uploader(fileType,file){
	 this.fileType=fileType;
    this.file=file;
}
uploader.prototype.init=function(){
  //初始化文件上传的html
}
uploader.prototype.delete=function(){
  //删除掉该html
}
uploader.prototype.uploading=function(){
  //上传
}
var fileob1,fileob2,fileob3,fileob4
var data=[
  {
  	type:'img',
  	file:fileob1
  },
  {
  	type:'txt',
  	file:fileob2
  },
  {
  	type:'img',
  	file:fileob3
  },
  {
  	type:'word',
  	file:fileob4
  },      
]
for(var i=0;i<data.length;i++){
	new uploader(data[i].type,data[i].file);
};

//fileType,file
function uploader(){

}
uploader.prototype.init=function(){
  //初始化文件上传的html
}
uploader.prototype.delete=function(){
  //删除掉该html
}
uploader.prototype.uploading=function(filetype,file){

}
var uploader=new uploader();
for(var i=0;i<data.length;i++){
	uploader.uploading(data[i].type,data[i].file);
}


//extends
var jQuery={};
jQuery.fn={};
jQuery.extend = jQuery.fn.extend = function() {
 /* if(arguments.length==1){
     for(var item in arguments[0]){
         this[item]=arguments[0][item]
     }
  }else if(arguments.length==2){
    for(var item in arguments[1]){
      arguments[0][item]=arguments[1][item]
    }
    return arguments[0];
  }*/
  var target=arguments[0];
  var source;
  if(arguments.length==1){
    target=this;
    source=arguments[0];
  }else if(arguments.length==2){
    target=arguments[0];
    source=arguments[1];
  }
  for(var item in source){
    target[item]=source[item]
  }
  return target;
} 


