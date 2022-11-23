<template>
  <div>
    <h6>请打开network查看网络请求</h6>
    <el-divider></el-divider>
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
    <el-row>
      <el-col :span="4">
        <el-image-upload accept=".png" :width-pieces="[{lte:42,gte:42}]" :height-pieces="[{lte:42,gte:42}]" widthHeightErrMsg="请选择 42×42 的png图片" @success="alert(1)">
          <div slot="tip">请选择42×42的png图片</div>
        </el-image-upload>
      </el-col>
      <el-col :span="2">

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    elUploadBase: () => import("@/components/elUploadBase"),
    elUploadSingle: () => import("@/components/elUploadSingle"),
    elImageUpload: () => import("@/components/upload/image-upload"),
  },
  data () {
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