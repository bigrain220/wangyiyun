<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-upload-base :uploadProps="uploadProps" :uploadParams="uploadParams"></el-upload-base>
      </el-col>
      <el-col :span="2">
        <el-button size="small" @click="uploadProps.uploadSure=!uploadProps.uploadSure">手动上传</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4">
        <el-upload-single :uploadProps="uploadProps" :uploadParams="uploadParams"></el-upload-single>
      </el-col>
      <el-col :span="2">
        <el-button size="small" type="text">自动上传</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  components: {
    elUploadBase: () => import("@/components/elUploadBase"),
    elUploadSingle: () => import("@/components/elUploadSingle"),
  },
  data() {
    return {
      uploadProps: {
        uploadSure: false,
        acceptType: [".png", ".jpg", ".gif", ".pdf"],
        url: "/api/test",
        size: 1,
        limit: 2,
        btnText: "选择文件"
      },
      //上传参数
      uploadParams: {
        params1: "",
        params2: "",
        params3: ""
      }
    }
  },
  methods: {

  }
}
</script>

<style>
</style>