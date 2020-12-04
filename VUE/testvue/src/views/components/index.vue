<template>
  <div>
    <el-card class="components-card">
      <div slot="header" class="clearfix">
        <span>组件传值</span>
      </div>
      <div class="flex">
        <div class="label">1.props / $emit</div>
        <el-input v-model="propsData.value" size="small"></el-input>
        <el-button @click="submit('props')" type="primary" size="mini" class="submit-btn">提交</el-button>
      </div>
      <div class="flex">
        <div class="label">2.$children / $parent</div>
        <el-input v-model="cpData" size="small"></el-input>
        <el-button @click="childrenClick" type="sccess" size="mini" class="submit-btn">获取子组件的值</el-button>
        <el-button @click="submit('parents')" type="primary" size="mini" class="submit-btn">提交</el-button>
      </div>
      <div class="flex">
        <div class="label">3.provide/ reject</div>
        <el-input v-model="provideData" size="small"></el-input>
        <el-button @click="submit('provide')" type="primary" size="mini" class="submit-btn">提交</el-button>
      </div>
      <div class="flex">
        <div class="label">4.ref / refs</div>
        <el-input v-model="refsData" size="small"></el-input>
        <el-button @click="submit('refs')" type="primary" size="mini" class="submit-btn">提交</el-button>
      </div>
      <div class="result">
        <h3 style="margin-top:50px;">总结:常见使用场景可以分为三类:</h3>
        <ul>
          <li>
            父子组件通信: props; $parent / $children; provide / inject ; ref ; $attrs /$listeners
          </li>
          <li>
            兄弟组件通信: eventBus ; vuex
          </li>
          <li>
            跨级通信: eventBus；Vuex；provide / inject 、$attrs / $listeners
          </li>
        </ul>
      </div>
    </el-card>
    <child v-if="dialogVisible.prop" :isShow.sync="dialogVisible.prop" :dialogData="propsData" :type="type" @emitEvent="emitEvent" ref="childs"></child>
  </div>
</template>

<script>
export default {
  provide: {
    provideVal: '我是通过provide传递过来的数据'
  },
  components: {
    child: () => import('@/views/components/child')
  },
  data() {
    return {
      dialogVisible: {
        prop: false
      },
      type: "",
      propsData: { label: '通过props接收到父组件传值', vlaue: "" },
      cpData: '',
      provideData: "",
      refsData: ""
    }
  },
  methods: {
    submit(params) {
      this.type = params;
      this.dialogVisible.prop = true;
    },
    //emit接受子组件传来的值
    emitEvent(val) {
      this.$message.success(val);
    },
    //$children获取子组件的值
    childrenClick() {
      console.log(this.$children)
    },
  }
}
</script>

<style lang="scss" scoped>
.components-card {
  .flex {
    display: flex;
  }
  .label {
    line-height: 40px;
    width: 30%;
  }
  .submit-btn {
    margin-left: 30px;
    height: 30px;
  }
  .result{
      font-size: 14px;
      li{
          margin-top:14px;
      }
  }
}
</style>