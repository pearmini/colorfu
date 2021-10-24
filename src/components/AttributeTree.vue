<template>
  <div v-if="options.type === 'container'">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
      :colors="colors"
      @update="handleUpdate"
      @color="handleUpdateColor"
    />
  </div>
  <collapse
    v-else-if="options.type === 'collapse'"
    :name="options.name"
    :defaultOpen="options.defaultOpen"
  >
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
      :colors="colors"
      @update="handleUpdate"
      @color="handleUpdateColor"
    />
  </collapse>
  <group v-else-if="options.type === 'section'" :name="options.name">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
      :colors="colors"
      @update="handleUpdate"
      @color="handleUpdateColor"
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
  <color-palette
    v-else-if="options.type === 'color palette'"
    :name="options.name"
    :groups="options.groups"
    :colors="colors"
    @input="handleInputColor"
    @update="handleUpdateColor"
  />
  <feild v-else :name="options.name" :flex="options.type === 'image' ? 'col' : 'row'">
    <el-input
      v-if="options.type === 'text'"
      :placeholder="options.placeholder"
      v-model="value"
      size="small"
    />
    <symbol-input
      v-if="options.type === 'symbol-text'"
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
import { get, deepCopy } from "../utils/object";
import Feild from "./Field.vue";
import Group from "./Group.vue";
import ImagePicker from "./ImagePicker.vue";
import InputNumber from "./InputNumber.vue";
import Collapse from "./Collapse.vue";
import SymbolInput from "./SymbolInput.vue";
import ColorPalette from "./ColorPalette";

export default {
  name: "attribute-tree",
  components: { Feild, Group, ImagePicker, InputNumber, Collapse, SymbolInput, ColorPalette },
  props: {
    options: Object,
    values: Object,
    colors: [],
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

        // 不直接改变 props 的值
        this.handleUpdate({ key, value: newValue });

        // 更新全局 color picker 里面对应的属性
        const newColors = deepCopy(this.colors);
        for (const color of newColors) {
          if (color.attribute === key) {
            color.attribute = "";
          }
        }
        this.handleUpdateColor(newColors);

        // 更新相关的值
        for (const { trigger, actions } of relations) {
          if (trigger === newValue) {
            for (const { key, value, force } of actions) {
              const oldValue = get(this.values, key);
              if (oldValue === undefined || force) {
                this.handleUpdate({ key, value: value });
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
    handleUpdateColor(colors) {
      this.$emit("color", colors);
    },
    handleInputColor(key, value) {
      this.handleUpdate({ key, value });
    },
  },
};
</script>

<style>
.radio-container {
  /** 和其他小的 input 的高度保持一致 */
  height: 32px;
  display: flex;
  align-items: center;
}
</style>