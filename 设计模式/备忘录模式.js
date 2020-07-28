//缓存
function pager(){
  var cache={};
  return function(pageName){
     if(cache[pageName]){
         return cache[pageName];
     }else{
         axios.get(pageName).then((res)=>{
           cache[pageName]=res;
         })
     }
  }
}
var getpage=pager();
getpage('pageone');


//前进后退
function moveDiv(){
    this.stateList=[];
    this.nowState=0;
}
moveDiv.prototype.move=function(type,num){
    moveDiv(type,num);
    this.stateList.push({
     type:type,
     num:num
    });
    this.nowState=this.stateList.length-1;
}
moveDiv.prototype.go=function(){
  var _state;
  if(this.nowState<this.stateList.length-1){
      this.nowState++;
      _state=this.stateList[this.nowState];
      moveDiv(_state.type,_state.num);
  } 
}
moveDiv.prototype.back=function(){
    var _state;
    if(this.nowState>=0){
        this.nowState--;
        _state=this.stateList[this.nowState];
        moveDiv(_state.type,_state.num);
    }
}

function Memento(){
    var cache={};
    return function(cacheName){
      if(cache[cacheName]){
        //有缓存的操作的
      }else{
        //没缓存的操作
      }
    }
}
var MementoFn=Memento();
MementoFn('xxx')
 