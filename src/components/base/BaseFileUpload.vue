<template>
    <div class="base-file-upload">
      <el-upload v-if="!readonly" multiple :action="uploadFileUrl" :before-upload="handleBeforeUpload" :file-list="fileList"
        :limit="limit" :on-error="handleUploadError" :on-exceed="handleExceed" :on-success="handleUploadSuccess"
        :show-file-list="false" :headers="headers" class="upload-file-uploader" ref="fileUpload">
        <el-button size="mini" type="primary">选取文件</el-button>
        <div class="el-upload__tip" slot="tip" v-if="showTip">
          请上传
          <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
          <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
          的文件
        </div>
      </el-upload>
      <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul"
        :class="{ 'is-readonly': readonly }">
        <li key="fileListXlength" v-if="readonly && fileList.length === 0">无</li>
        <li :key="file.url" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in fileList">
          <el-link :href="`${baseUrl}${file.url}`" :underline="false" target="_blank">
            <span class="el-icon-document"> {{ getFileName(file.name) }} </span>
          </el-link>
          <div class="ele-upload-list__item-content-action">
            <i class="el-icon-circle-close" @click="handleDelete(index)"></i>
          </div>
        </li>
      </transition-group>
    </div>
  </template>
    
  <script>
  export default {
    name: "BaseFileUpload",
    props: {
      /**
       * @description 绑定值
       */
      value: [String, Object, Array],
      /**
       * @description 数量限制
       */
      limit: {
        type: Number,
        default: 5,
      },
      /**
       * @description 文件大小限制
       */
      fileSize: {
        type: Number,
        default: 100,
      },
      /**
       * @description 文件类型限制
       */
      fileType: {
        type: Array,
        default: () => ["doc", "docx", "xlsx", "xls", "ppt", "pptx", "txt", "pdf"],
      },
      /**
       * @description 是否显示上传tip
       */
      showTip: {
        type: Boolean,
        default: true
      },
      /**
      * @description 是否只读
      */
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        number: 0,
        uploadList: [],
        baseUrl: process.env.VUE_APP_BASE_API,
        uploadFileUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传文件服务器地址
        headers: {
          Authorization: "Bearer ",
        },
        fileList: [],
      };
    },
    watch: {
      value: {
        handler(val) {
          if (val) {
            let temp = 1;
            // 首先将值转为数组
            const list = Array.isArray(val) ? val : this.value.split(',');
            // 然后将数组转为对象数组
            this.fileList = list.map(item => {
              if (typeof item === "string") {
                item = { name: item, url: item };
              }
              item.uid = item.uid || new Date().getTime() + temp++;
              return item;
            });
          } else {
            this.fileList = [];
            return [];
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      /**
       * @description 上传前校检格式和大小
       */
      handleBeforeUpload(file) {
        // 校检文件类型
        if (this.fileType) {
          const fileName = file.name.split('.');
          const fileExt = fileName[fileName.length - 1];
          const isTypeOk = this.fileType.indexOf(fileExt) >= 0;
          if (!isTypeOk) {
            this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
            return false;
          }
        }
        // 校检文件大小
        if (this.fileSize) {
          const isLt = file.size / 1024 / 1024 < this.fileSize;
          if (!isLt) {
            this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
            return false;
          }
        }
        this.$modal.loading("正在上传文件，请稍候...");
        this.number++;
        return true;
      },
      /**
       * @description 文件个数超出
       */
      handleExceed() {
        this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
      },
      /**
        * @description 上传失败
        */
      handleUploadError() {
        this.$modal.msgError("上传文件失败，请重试");
        this.$modal.closeLoading()
      },
      /**
       * @description 上传成功回调
       */
      handleUploadSuccess(res, file) {
        if (res.code === 200) {
          this.uploadList.push({ name: res.fileName, url: res.fileName });
          this.uploadedSuccessfully();
        } else {
          this.number--;
          this.$modal.closeLoading();
          this.$modal.msgError(res.msg);
          this.$refs.fileUpload.handleRemove(file);
          this.uploadedSuccessfully();
        }
      },
      /**
       * @description 删除文件
       */
      handleDelete(index) {
        this.fileList.splice(index, 1);
        this.$emit("input", this.listToString(this.fileList));
      },
      // 上传结束处理
      uploadedSuccessfully() {
        if (this.number > 0 && this.uploadList.length === this.number) {
          this.fileList = this.fileList.concat(this.uploadList);
          this.uploadList = [];
          this.number = 0;
          this.$emit("input", this.listToString(this.fileList));
          this.$modal.closeLoading();
        }
      },
      // 获取文件名称
      getFileName(name) {
        if (name.lastIndexOf("/") > -1) {
          return name.slice(name.lastIndexOf("/") + 1);
        } else {
          return "";
        }
      },
      // 对象转成指定字符串分隔
      listToString(list, separator) {
        let strs = "";
        separator = separator || ",";
        for (let i in list) {
          strs += list[i].url + separator;
        }
        return strs != '' ? strs.substr(0, strs.length - 1) : '';
      }
    }
  };
  </script>
    
  <style scoped lang="scss">
  .upload-file-uploader {
    margin-bottom: 5px;
  }
  
  .upload-file-list .el-upload-list__item {
    border: 1px solid #e4e7ed;
    line-height: 2;
    margin-bottom: 10px;
    position: relative;
  }
  
  .upload-file-list .ele-upload-list__item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
  }
  
  .ele-upload-list__item-content-action .el-link {
    margin-right: 10px;
  }
  
  .ele-upload-list__item-content-action i {
    margin-right: 8px;
  }
  
  .is-readonly {
    // border: 1px solid #dfe4ed;
    // border-radius: 4px;
    min-height: 36px;
  }
  </style>
    