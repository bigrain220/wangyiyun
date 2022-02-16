<template>
    <div class="hello-box">
    </div>
</template>

<script>
// toRefs 定义props一定存在的属性
// toRef  定义props不一定存在的属性
// ref      一般定义基本数据类型
// reactive 一般定义引用数据类型
import { toRefs,toRef,ref,reactive} from 'vue';
export default {
  props:{
    name:String
  },
  // setup 是围绕 beforeCreate 和 created 生命周期钩子运行的
  // 执行 setup 时，组件实例尚未被创建 将无法访问以下组件选项data computed methods refs(模板 ref)
  setup(props,context){
    let{ attrs,emit,expose,slots} =context;
    console.log('setup开始...');
    console.log(props);
    console.log(context);
   
    // props中有name 就用toRefs
    let {name} = toRefs(props);
    // props中可能没有title 就用toRef
    const title = toRef(props, 'title')
    console.log(name,title);

    const otherName = ref('yyh')
    const changeName = () => {
      console.log("父组件通过ref调用子组件的方法")
    };
    const type = reactive({ type: 'English Name' });
    // 给expose传递一个对象，其中定义的 property 将可以被外部组件实例
    // 也就是说 这个 changeName 方法现在将可以通过父组件的模板 ref 访问
    expose({
      changeName
    })

    return{
      type,
      otherName
    }
  },
  methods: {
     
  },
  mounted() {
     console.log(this.type.type,this.otherName,'mounted');
  }
}
</script>

<style>
</style>