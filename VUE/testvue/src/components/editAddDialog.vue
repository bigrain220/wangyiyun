<template>
  <el-dialog :title="config.title.name" :visible.sync="isShow" :before-close="closeDialog" :custom-class="['self-dialog',config.className]" width="60%">
    <el-form size="small" label-width="100px" label-suffix=":" class="self-form" :model="allData" ref="dialogForm">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item,index) in config.data" :key="index">
          <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules" v-if="allData[item.prop]!==undefined">
            <template v-if="!item.slot">
              <el-input v-if="item.type==='input'" v-model="allData[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
              <el-select v-if="item.type==='select'" v-model="allData[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled">
                <el-option v-for="selectItem in item.options" :key="selectItem.value" :label="selectItem.label" :value="selectItem.value">
                </el-option>
              </el-select>
              <el-date-picker v-if="item.type==='date'" v-model="allData[item.prop]" type="date" value-format="yyyy-MM-dd" :placeholder="item.placeholder" :disabled="item.disabled"></el-date-picker>
            </template>
            <slot :name="item.prop" :row="allData" v-if="item.slot"></slot>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right;margin-top:10px;">
      <el-button @click="closeDialog" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "editAddDialog",
  props: {
    isShow: { type: Boolean },
    data: { required: true },//dialog的form数据对象
    config: { type: Object },//dialog的配置对象
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false);
    },
    submitForm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          console.log("submitData", this.submitData);
          this.$emit('formSubmit', this.submitData)
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    }
  },
  mounted() {
    console.log("data", this.data);
  },
  computed: {
    allData() {
      return this.data;
    },
    submitData() {
      let obj = {};
      this.config.data.map(item => {
        if (this.allData[item.prop] !== undefined) {
          obj[item.prop] = this.allData[item.prop];
        }
      });
      return obj;
    }
  }
};
</script>

<style lang="scss">
.self-dialog {
  .el-form-item {
    .el-form-item__content {
      .el-select {
        width: 100%;
      }
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 992px) {
  .self-dialog {
    width: 98% !important;
    margin: 0 auto;
  }
}
</style>