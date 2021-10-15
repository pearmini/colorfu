<template>
  <div>
    <el-upload
      class="image-uploader"
      action=""
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :limit="1"
    >
      <img
        :src="imageURL"
        class="image"
        @mouseenter="hover = true"
        alt="invalid url"
        @error="handleErrorImage"
      />
      <div
        v-if="hover"
        class="image-overlayer"
        @mouseleave="hover = false"
        @click="handleClickOverlayer"
      >
        <el-button v-if="!uploaded" icon="el-icon-upload" type="primary">Local</el-button>
        <el-button v-if="!uploaded" icon="el-icon-upload" type="primary" @click="handleUploadOnline"
          >Online</el-button
        >
      </div>
    </el-upload>
    <el-dialog title="Upload online image" :visible.sync="showUploadDialog">
      <el-input v-model="onelineImageURL" />
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
  },
  data() {
    return {
      uploaded: false,
      hover: false,
      showUploadDialog: false,
      onelineImageURL: "",
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
    },
    handleUploadOnline(e) {
      e.stopPropagation();
      this.showUploadDialog = true;
    },
    handleClickOverlayer(e) {
      if (this.uploaded) {
        Message.error("Please delete uploaded image first!");
        e.stopPropagation();
      }
    },
    handleConfirmOnline() {
      if (!this.onelineImageURL) {
        Message.error("Please provide non-empty url!");
      } else {
        this.$emit("change", this.onelineImageURL);
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
}

.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.image-uploader .el-upload:hover {
  border-color: #409eff;
}

.image {
  width: 100%;
  display: block;
}

.image-overlayer {
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
