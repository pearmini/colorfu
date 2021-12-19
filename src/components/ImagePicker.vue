<template>
  <div>
    <el-upload
      :class="[
        'image-uploader',
        { 'image-height': imageURL === '' },
        { 'image-dash-border': uploaded },
      ]"
      action=""
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :limit="1"
    >
      <img
        :src="imageURL"
        class="image"
        alt="invalid url"
        @mouseenter="hover = true"
        @error="handleErrorImage"
        v-if="imageURL !== ''"
      />
      <i v-else class="el-icon-plus image-uploader-icon" @mouseenter="hover = true"></i>
      <div
        v-if="hover"
        class="image-overlay"
        @mouseleave="hover = false"
        @click="handleClickOverlay"
      >
        <div v-if="allowOnline">
          <el-button v-if="!uploaded" icon="el-icon-upload" type="primary">Local</el-button>
          <el-button
            v-if="!uploaded"
            icon="el-icon-upload"
            type="primary"
            @click="handleUploadOnline"
            >Online</el-button
          >
        </div>
      </div>
    </el-upload>
    <el-dialog title="Upload online image" :visible.sync="showUploadDialog" append-to-body>
      <el-input v-model="onlineImageURL" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUploadDialog = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirmOnline">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { readFile } from "../utils/file";
export default {
  model: {
    prop: "imageURL",
    event: "change",
  },
  props: {
    imageURL: String,
    cacheImage: {
      type: Boolean,
      default: true,
    },
    allowOnline: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      uploaded: false,
      hover: false,
      showUploadDialog: false,
      onlineImageURL: "",
      preImageURL: "",
    };
  },
  watch: {
    imageURL(newValue, oldValue) {
      this.preImageURL = oldValue;
    },
  },
  methods: {
    async handleChange(file) {
      const imageURL = await readFile(file.raw);
      this.uploaded = true;
      this.$emit("change", imageURL);
    },
    handleRemove() {
      this.uploaded = false;
      this.hover = false;
      if (!this.cacheImage) this.$emit("change", "");
    },
    handleUploadOnline(e) {
      e.stopPropagation();
      this.showUploadDialog = true;
    },
    handleClickOverlay(e) {
      if (this.uploaded) {
        Message.error("Please delete uploaded image first!");
        e.stopPropagation();
      }
    },
    handleConfirmOnline() {
      if (!this.onlineImageURL) {
        Message.error("Please provide non-empty url!");
      } else {
        this.$emit("change", this.onlineImageURL);
      }
      this.showUploadDialog = false;
    },
    handleErrorImage() {
      // 发生错误的时候设置为之前的 imageURL 比较合理
      // 这样看上去什么也没有发生
      Message.error("Invalid image url!");
      this.$emit("change", this.preImageURL);
    },
  },
};
</script>

<style>
.image-uploader {
  width: 250px;
  min-height: 10px;
}

.image-height {
  height: 250px;
}

.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 250px;
  line-height: 250px;
  text-align: center;
}

.image-uploader .el-upload {
  border-radius: 6px;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.image-dash-border {
  border: 1px dashed #d9d9d9;
  padding: 10px;
  border-radius: 6px;
}

.image-uploader .el-upload:hover {
  border-color: #409eff;
}

.image {
  width: 100%;
  display: block;
}

.image-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
