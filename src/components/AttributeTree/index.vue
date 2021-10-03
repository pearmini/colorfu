<template>
  <div v-if="options.type === 'container'">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
    />
  </div>
  <feild v-else :name="options.name">
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
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary"
        >select file</el-button
      >
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >upload to server</el-button
      >
      <div class="el-upload__tip" slot="tip">
        jpg/png files with a size less than 500kb
      </div>
    </el-upload>
  </feild>
</template>

<script>
import Feild from "./Field.vue";

export default {
  name: "attribute-tree",
  components: { Feild },
  props: {
    options: Object,
    values: Object,
  },
  mounted() {
    console.log(this.values);
  },
};
</script>
