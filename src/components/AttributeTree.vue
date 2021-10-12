<template>
  <div v-if="options.type === 'container'">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
    />
  </div>
  <group v-else-if="options.type === 'section'" :name="options.name">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
    />
  </group>
  <feild v-else :name="options.name" :flex="options.type === 'image' ? 'col' : 'row'">
    <el-input v-if="options.type === 'text'" :placeholder="options.placeholder" v-model="value" />
    <el-color-picker v-if="options.type === 'color'" v-model="value" />
    <el-slider
      v-if="options.type === 'number'"
      v-model="value"
      :min="options.min"
      :max="options.max"
      :style="{ width: 150 + 'px' }"
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
import { readFile } from "../utils/read";
import { get, set } from "../utils/object";
import Feild from "./Field.vue";
import Group from "./Group.vue";

export default {
  name: "attribute-tree",
  components: { Feild, Group },
  props: {
    options: Object,
    values: Object,
  },
  computed: {
    value: {
      get() {
        const { key } = this.options;
        if (!key) return;
        return get(this.values, key);
      },
      set(newValue) {
        const { key } = this.options;
        if (!key) return;
        set(this.values, key, newValue);
      },
    },
  },
  methods: {
    async handleChange(file) {
      const imageURL = await readFile(file.raw);
      const { key } = this.options;
      set(this.values, key, imageURL);
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
