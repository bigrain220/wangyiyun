//vue
function store(){
  this.store={

  }
  if(store.install){
  	return store.install;
  }
  store.install=this;
}
store.install=null;


//vue-router
let _Vue;
function install (_Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true
  
  _Vue = Vue
}

// vue.use()等于执行install方法，多次use也只会执行一次；
 
 