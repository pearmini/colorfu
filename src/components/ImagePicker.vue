<template>
  <el-upload
    class="image-uploader"
    action=""
    :auto-upload="false"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :limit="1"
  >
    <img v-if="imageURL" :src="imageURL" class="image" @click="handleClickImage" />
    <i v-else class="el-icon-plus image-uploader-icon"></i>
  </el-upload>
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
    };
  },
  methods: {
    async handleChange(file) {
      const imageURL = await readFile(file.raw);
      this.uploaded = true;
      this.imageURL = imageURL;
      this.$emit("change", imageURL);
    },
    handleRemove() {
      this.uploaded = false;
    },
    handleClickImage(e) {
      if (this.uploaded) {
        e.stopPropagation();
        Message.error("Please delete uploaded image first!");
      }
    },
  },
};
</script>

<style>
.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 150px;
}

.image-uploader .el-upload:hover {
  border-color: #409eff;
}

.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.image {
  width: 150px;
  display: block;
}
</style>
