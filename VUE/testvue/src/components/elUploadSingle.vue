<template>
  <el-upload action="123" :multiple="false" :accept="acceptType.toString()" :file-list="fileList" :auto-upload="false" :show-file-list="false" :on-change="handlefileChange">
    <el-button slot="trigger" size="mini" type="primary" v-text="uploadProps.btnText || '选取文件'"></el-button>
    <div slot="tip" class="el-upload__tip" v-html="uploadProps.tips"></div>
  </el-upload>
</template>

<script>
import axios from "axios";
export default {
  props: {
    uploadProps: { type: Object },
    uploadParams: { type: Object }
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    acceptType() {
      return this.uploadProps.acceptType;
    }
  },
  methods: {
    handlefileChange(file, fileList) {
      //选择完文件后的状态
      // console.log("change", file);
      //判断上传文件类型
      const type = file.name.substring(file.name.lastIndexOf("."));
      const isType = this.uploadProps.acceptType.indexOf(type.toLowerCase()) > -1;
      //判断上传文件大小
      const isSize = file.size / 1024 / 1024 <= this.uploadProps.size;
      if (!isType) {
        this.$message.error(
          "文件支持格式为: " + this.uploadProps.acceptType.toString() + " !"
        );
        fileList.pop();
        return false;
      } else if (!isSize) {
        this.$message.error(
          "单次上传文件大小不能超过" + this.uploadProps.size + "M"
        );
        fileList.pop();
        return false;
      } else {
        this.fileList = fileList;
        this.uploadAction(fileList);
      }
    },
    uploadAction() {
      if (this.fileList.length > 0) {
        let params = new FormData();
        params.append("file", this.fileList[0].raw);
        axios
          .post(this.uploadProps.url, params, { timeout: 20000 }, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.refreshChange();
            this.fileList = [];
          });
      } else {
        this.$message.error('请重新上传文件！')
      }
    },
  }
}
</script>

<style>
</style>