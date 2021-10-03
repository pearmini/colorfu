<template>
  <div v-if="options.type === 'container'">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
    />
  </div>
  <feild
    v-else
    :name="options.name"
    :flex="options.type === 'image' ? 'col' : 'row'"
  >
    <el-input
      v-if="options.type === 'text'"
      :placeholder="options.placeholder"
      v-model="values[options.key]"
    />
    <el-color-picker
      v-if="options.type === 'color'"
      v-model="values[options.key]"
    />
    <el-slider
      v-if="options.type === 'number'"
      v-model="values[options.key]"
      :min="10"
      :max="300"
      :style="{ width: 200 + 'px' }"
    >
    </el-slider>
    <el-upload
      v-if="options.type === 'image'"
      class="upload"
      action=""
      :auto-upload="false"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :limit="1"
    >
      <el-button size="small" type="primary"> select image </el-button>
    </el-upload>
  </feild>
</template>

<script>
import { Message } from "element-ui";
import Feild from "./Field.vue";

export default {
  name: "attribute-tree",
  components: { Feild },
  props: {
    options: Object,
    values: Object,
  },
  methods: {
    handleChange(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        const imageURL = reader.result;
        this.values.imageURL = imageURL;
      };
    },
    handleExceed() {
      Message.error("请先删除已上传图片～");
    },
  },
};
</script>

<style scoped>
.upload {
  width: 100%;
  text-align: left;
}
</style>
