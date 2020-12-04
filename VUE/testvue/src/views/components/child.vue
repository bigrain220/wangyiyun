<template>
  <el-dialog :visible.sync="isShow" title="子组件接收值" :before-close="beforeClose">
    <div>
      <div v-if="type==='props'">
        {{dialogData.label}}：{{dialogData.value}}
        <el-button @click="send" size="small" type="primary" v-if="type==='props'" class="btn">向父组件传值</el-button>
      </div>
      <div v-if="type==='parents'">
        如果要动态改变this.$parent取到的值，可以写一个计算属性接受
        <el-button @click="getByParents" size="small" type="primary" class="btn">通过$parents取值</el-button>
      </div>
      <div v-if="type==='provide'">
        第一个子组件：{{provideVal}}
      </div>
      <div v-if="type==='refs'">
        <div ref="domRefs">我是测试来domRefs的</div>
        <el-button @click="domRefsClick" size="small" type="success" class="btn">通过refs获取Dom</el-button>
        <el-button @click="componentsRefsClick" type="primary" size="mini" class="submit-btn">通过refs获取组件</el-button>
      </div>
    </div>
    <br />
    <deep-child ref="childref" v-if="['provide','refs'].includes(type)"></deep-child>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isShow: { type: Boolean, required: true },
    dialogData: [String, Object],
    type: { type: String }
  },
  inject: ['provideVal'],
  components: {
    deepChild: () => import('@/views/components/deepChild')
  },
  data() {
    return {
      childData: "666"
    }
  },
  methods: {
    beforeClose() {
      this.$emit('update:isShow', false);
    },
    send() {
      this.$emit('update:isShow', false)
      this.$emit('emitEvent', '我是子组件通过emit传过来的值')
    },
    getByParents() {
      // console.log(this.$parent)
      this.$message.success(this.$parent.cpData)
    },
    componentsRefsClick() {
      this.$message.success('请看控制台');
      console.log(this.$refs.childref);
    },
    domRefsClick() {
      this.$message.success('请看控制台');
      console.log(this.$refs.domRefs);
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin-left: 20px;
  margin-top: 10px;
}
</style>