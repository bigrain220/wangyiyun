<template>
  <div>
    <div>
      <h3>slot用法</h3>
      <div class="list">
        <div class="title">default:</div>
        <!-- default时可省略不写，不写默认值为 v-slot:default -->
        <slot-default>默认显示内容1</slot-default>
        <slot-default>
          <template v-slot:default> 默认显示内容2</template>
        </slot-default>
      </div>
      <div class="list">
        <div class="title">view:</div>
        <!-- 如果没有提供slot=view的属性，会显示slotView设置的默认值 -->
        <slot-view>
          <template v-slot:view>
            我是view组件父内容
          </template>
        </slot-view>
        <slot-view></slot-view>
      </div>
      <div class="list">
        <div class="title">props:</div>
        <!-- slot传值 -->
        <slot-props>
          <template v-slot:getprops="obj">
            <div>{{obj.user.lastName}}</div>
          </template>
        </slot-props>
        <!-- 解构赋值写法 -->
        <slot-props>
          <template v-slot:getprops="{user}">
            <div>{{user.firstName}}</div>
          </template>
        </slot-props>
      </div>
      <div class="list">
        <div class="title">#写法:</div>
        <!-- 具名插槽的缩写 用#替代 v-slot: #后面必须要有值,default也要写成#default-->
        <!-- 这里也演示了在一个组件中使用多个不同name的slot -->
        <slot-alias>
          <template #default>
            <div>name为空或default的slot</div>
          </template>
          <template #one>
            <div>name为one的slot</div>
          </template>
          <template #two>
            <div>name为two的slot</div>
          </template>
          <template #three="{user}">
            <div>name为three的slot,传值:{{user.lastName}}-{{user.firstName}}</div>
          </template>
        </slot-alias>
      </div>
    </div>
    <div>
      <h3>其它的一些知识点</h3>
      <article>1.<b>渲染作用域</b>:父级模板里的所有内容都是在父级作用域中编译的;子模板里的所有内容都是在子作用域中编译的。</article>
      <article>2.<b>独占默认插槽</b>:当被提供的内容只有默认插槽时,组件的标签才可以被当作插槽的模板来使用,比如:
        <br>{{str}}
        <br>不建议这样写,eslint也会报错,建议全部采取3的写法
      </article>
      <article>3.{{str1}}</article>
      <br>
      <h5>个人总结: </h5>
      1.slot标签写在子组件中占一个位置,写几个slot就占几个位置,然后分别加上对应的name属性; <br>
      2.父组件引入子组件，在子组件标签里写个template标签,再加上要渲染的name; <br>
      3.子组件中所有对应name的slot占位就会渲染成实际的dom

    </div>
  </div>
</template>

<script>

import { defineAsyncComponent, ref } from "vue";

export default {
  components: {
    slotDefault: defineAsyncComponent(() => import("@/components/slot/slot-default")),
    slotView: defineAsyncComponent(() => import("@/components/slot/slot-view")),
    slotProps: defineAsyncComponent(() => import("@/components/slot/slot-props")),
    slotAlias: defineAsyncComponent(() => import("@/components/slot/slot-alias"))
  },
  setup() {
    const fullName = ref('william');
    const str = ref(`
    <slot-default>
        <template v-slot:default>111</template>
    </slot-default>
    可以写成 
    <slot-default v-slot:default>111</slot-default>`);
    const str1 = `只要出现多个插槽,请始终为所有的插槽使用完整的基于<template> 的语法,也就是2的解决方案`
    return {
      fullName,
      str,
      str1
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
  margin: 20px 0;
}
article {
  margin: 4px 0;
  font-size: 14px;
}
.title {
  line-height: 20px;
  font-weight: bold;
  font-size: 14px;
  margin: 10px 0 5px 0;
}
</style>