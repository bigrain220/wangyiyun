<template>
  <div class="upload-box">
    <div class="upload-img">
      <div>
        <div class="upload-icon">
          <slot name="icon">
            <!-- 这里可以换成一个图标 -->
            +
          </slot>
        </div>
        <div class="upload-text">
          <slot name="tip">
            <span>点击选择图标</span>
          </slot>
        </div>
      </div>
      <input type="file" name="file" :accept="accept" @change="handleChange" ref="fileInputRef" class="upload-input" title="">
      <img :src="imageSrc" alt="" v-show="fileList.length" class="upload-preview-img" ref="imgRef">
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgUpload',
  props: {
    // 可接受的文件后缀类型,如 .jpg,.png
    accept: {
      type: String,
      default: '*'
    },
    // 单位:M
    size: {
      type: Number,
      default: 1
    },
    // 使用 lt（小于，less than），gt（大于，greater than），lte（小于等于 less than or equals），gte（大于等于，greater than or equals）来表达边界
    widthPieces: {
      type: Array,
      default: () => []
    },
    heightPieces: {
      type: Array,
      default: () => []
    },
    // 宽高不合格时的提示信息
    widthHeightErrMsg: {
      type: String,
      default: '请上传规定尺寸的文件'
    },
    // 是否自动上传阿里云
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 绑定的file文件集合,在父组件可以通过 :file-list="fileList"获取到
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      imgSrc: '', // 回显图片地址路径
      progress: 0 // 上传进度
    }
  },
  computed: {
    // 图片绑定的动态src，如果没有选中文件，则展示fileList传过来的值
    imageSrc () {
      return this.imgSrc || this.fileList[0]?.data
    }
  },
  methods: {
    handleChange (ev) {
      const files = ev.target.files

      if (!files) return
      this.uploadFiles(files)
    },
    // 只处理了单个img
    async uploadFiles (files) {
      let postFiles = Array.prototype.slice.call(files)
      // console.log('postFiles: ', postFiles)
      if (postFiles.length === 0) return false
      let rawFile = postFiles[0]
      // 判断上传文件类型
      const type = rawFile.name.substring(rawFile.name.lastIndexOf('.'))
      const isType = this.accept === '*' || this.accept.split(',').includes(type.toLowerCase())
      // 判断上传文件大小
      const isSize = rawFile.size / 1024 / 1024 <= this.size
      if (!isType) {
        this.$alert('文件支持格式为: ' + this.accept + ' !')
        this.$refs.fileInputRef.value = ''
        return false
      }
      if (!isSize) {
        this.$alert('单次上传文件大小不能超过：' + this.size + 'M')
        this.$refs.fileInputRef.value = ''
        return false
      }
      // 判断宽高
      let { width, height, imgSrc } = await this.getWidthHeight(rawFile)
      const isWidth = this.validLength(width, this.widthPieces)
      const isHeight = this.validLength(height, this.heightPieces)
      if (!isWidth || !isHeight) {
        this.$alert(this.widthHeightErrMsg)
        this.$refs.fileInputRef.value = ''
        return false
      }
      // 选择成功
      this.fileList.splice(0, this.fileList.length, { name: rawFile.name, data: rawFile })
      this.imgSrc = imgSrc
      this.$refs.fileInputRef.value = ''
      if (this.autoUpload) {
        this.uploadAction(rawFile)
      }
    },
    // 获取宽高
    getWidthHeight (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (evt) => {
          // console.log('evt: ', evt)
          // 获取的是图片的base64代码
          let replaceSrc = evt.target.result
          // 定义一个Image对象
          let image = new Image()
          image.src = replaceSrc
          image.onload = () => {
            // console.log('图片宽度：' + image.width + ' px')
            // console.log('图片高度：' + image.height + ' px')
            const { width, height } = image
            resolve({ width, height, imgSrc: replaceSrc })
          }
        }
      })
    },
    // 验证宽或高
    validLength (len = 0, pieces = []) {
      for (const item of pieces) {
        const { lt, gt, lte, gte } = item
        if (len >= lt || len <= gt || len > lte || len < gte) {
          return false
        }
      }
      return true
    },
    // 上传阿里云
    uploadAction (file) {
      let uploader = this.createUploader()
      uploader.addFile(file, null, null, null, '{"Vod":{}}')
      uploader.startUpload()
    },
    createUploader () {
      // eslint-disable-next-line no-undef
      let uploader = new AliyunUpload.Vod({

        userId: 'xxx', // userID，必填，您可以使用阿里云账号访问账号中心（https://account.console.aliyun.com/），即可查看账号ID
        region: 'cn-shanghai', // 上传到视频点播的地域，默认值为'cn-shanghai'，['eu-central-1'，'ap-southeast-1']
        partSize: 1048576, // 分片大小默认1 MB，不能小于100 KB（100*1024）
        parallel: 5, // 并行上传分片个数，默认5
        retryCount: 3, // 网络原因失败时，重新上传次数，默认为3
        retryDuration: 2, // 网络原因失败时，重新上传间隔时间，默认为2秒

        // 开始上传
        onUploadstarted: async (uploadInfo) => {
          let result = await this.$http.post('/certificate/getImageUploadAuth', {
            imageType: 'cover'
          })
          uploader.setUploadAuthAndAddress(uploadInfo, result.uploadAuth, result.uploadAddress, result.imageId)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, progress) => {
          this.progress = Math.ceil(progress * 100)
          this.$emit('onProgress', this.progress)
        },
        // 文件上传成功
        onUploadSucceed: (uploadInfo) => {
          this.$emit('success', { imageId: uploadInfo.videoId })
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          this.$message.error('文件上传失败！')
        }
      })
      return uploader
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-box {
  width: 120px;
  height: 120px;
  .upload-img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    transition: border-color 0.3s ease;
    background-color: #fbfbfb;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    text-align: center;
    position: relative;
    &:hover {
      border-color: #409eff;
    }
  }
  .upload-text {
    font-size: 12px;
  }
  .upload-input {
    cursor: pointer;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
  .upload-preview-img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fbfbfb;
    z-index: 8;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
