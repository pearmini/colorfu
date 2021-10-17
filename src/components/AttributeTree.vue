<template>
  <div v-if="options.type === 'container'">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
      @update="handleUpdate"
    />
  </div>
  <div v-else-if="options.type === 'children'" class="children-container">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
      @update="handleUpdate"
    />
  </div>
  <group v-else-if="options.type === 'section'" :name="options.name">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
      @update="handleUpdate"
    />
  </group>
  <input-number
    v-else-if="options.type === 'number'"
    v-model="value"
    :min="options.min"
    :max="options.max"
    :step="options.step || 1"
    :name="options.name"
  />
  <feild v-else :name="options.name" :flex="options.type === 'image' ? 'col' : 'row'">
    <el-input
      v-if="options.type === 'text'"
      :placeholder="options.placeholder"
      v-model="value"
      size="small"
    />
    <el-color-picker v-if="options.type === 'color'" v-model="value" size="small" />

    <image-picker v-if="options.type === 'image'" v-model="value" />
    <el-select v-if="options.type === 'select'" v-model="value" size="small" filterable>
      <el-option
        v-for="item in options.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div v-if="options.type === 'radio'" class="radio-container">
      <el-radio
        v-for="item in options.options"
        :key="item.value"
        :label="item.value"
        size="small"
        v-model="value"
      >
        {{ item.label }}
      </el-radio>
    </div>
  </feild>
</template>

<script>
import { get } from "../utils/object";
import Feild from "./Field.vue";
import Group from "./Group.vue";
import ImagePicker from "./ImagePicker.vue";
import InputNumber from "./InputNumber.vue";

export default {
  name: "attribute-tree",
  components: { Feild, Group, ImagePicker, InputNumber },
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
        const { key, relations = [] } = this.options;
        if (!key) return;

        // set value for this key
        // 不直接改变 props 的值
        this.$emit("update", { key, value: newValue });

        // set values for releated keys
        for (const { trigger, actions } of relations) {
          if (trigger === newValue) {
            for (const { key, value, force } of actions) {
              const oldValue = get(this.values, key);
              if (oldValue === undefined || force) {
                this.$emit("update", { key, value: value });
              }
            }
          }
        }
      },
    },
  },
  methods: {
    handleUpdate(obj) {
      this.$emit("update", obj);
    },
  },
};
</script>

<style>
.children-container {
  padding-left: 1em;
}

.radio-container {
  /** 和其他小的 input 的高度保持一致 */
  height: 32px;
  display: flex;
  align-items: center;
}
</style>