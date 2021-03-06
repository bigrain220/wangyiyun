
<!-- 父组件用法： -->
<!-- 
template结构：
    <div>
      <el-upload-base
        :uploadProps="uploadProps"
        :uploadParams="uploadParams"
      ></el-upload-base>
      <el-button size="medium" @click="uploadProps.uploadSure=!uploadProps.uploadSure" type="primary">确定</el-button>
    </div> 
data 数据：
    //上传配置
    uploadProps: {
      uploadSure: false,
      acceptType: [".png", ".jpg", ".gif", ".pdf"],
      url: "/api/test",
      size:1,
      limit:2,
      btnText:"选择文件"
    },
    //上传参数
    uploadParams: {
      params1: "",
      params2: "",
      params3: ""
    }

-->
<template>
  <div>
    <el-upload class="upload-demo" ref="upload" action="123" :accept="acceptType.toString()" :multiple="false" :on-remove="handleRemove" :on-change="handlefileChange" :auto-upload="false" :limit="uploadProps.limit" :on-exceed="handelExceed">
      <el-button slot="trigger" size="mini" type="primary" v-text="uploadProps.btnText || '选取文件'"></el-button>
      <div slot="tip" class="el-upload__tip" v-html="uploadProps.tips"></div>
    </el-upload>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "elUploadBase",
  props: {
    uploadProps: { type: Object },
    uploadParams: { type: Object }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handlefileChange(file, fileList) {
      //选择完文件后的状态
      console.log("change", file);
      //判断上传文件类型
      const type = file.name.substring(file.name.lastIndexOf("."));
      const isType = this.acceptType.indexOf(type.toLowerCase()) > -1;
      //判断上传文件大小
      const isSize = file.size / 1024 / 1024 <= this.uploadProps.size;
      if (!isType) {
        this.$message.error(
          "文件支持格式为: " + this.acceptType.toString() + " !"
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
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handelExceed() {
      this.$message.error("超出文件上传数量限制！");
    },
    uploadAction() {
      // 做校验
      // const validData = this.validParams(this.uploadParams);
      // 不做校验
      const validData = this.uploadParams;
      let params = new FormData();
      for (const key in validData) {
          const element = validData[key];
          params.append(key, element);
      }
      if (this.fileList.length > 0) {
        this.fileList.map(item => {
          params.append("Filedata", item.raw);
        });
      }
      axios
        .post(this.uploadProps.url, params,{ timeout: 20000 }, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          console.log(res, "666");
        });
    },
    //属性校验 把空的属性删除，数组转字符串
    validParams(formData) {
      let params = Object.assign({}, formData);
      for (const key in params) {
        // if (params.hasOwnProperty(key)) {
          const element = params[key];
          if (!element || element.length == 0) {
            this.$delete(params, key);
          } else if (Array.isArray(element)) {
            params[key] = JSON.stringify(params[key])
          }
        // }
      }
      return params;
    }
  },
  mounted() {
    
   },
  computed: {
    isUpload() {
      return this.uploadProps.uploadSure;
    },
    acceptType() {
      return this.uploadProps.acceptType;
    }
  },
  //监听点击事件 调用上传
  watch: {
    isUpload() {
      this.uploadAction();
    }
  }
};
</script>