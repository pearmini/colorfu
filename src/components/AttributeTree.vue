<template>
  <div v-if="options.type === 'container'">
    <attribute-tree
      v-for="child in options.children"
      :options="child"
      :key="child.key"
      :values="values"
    />
  </div>
  <div v-else-if="options.type === 'children'" class="children-container">
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
      :step="options.step || 1"
      :style="{ width: 150 + 'px' }"
    >
    </el-slider>
    <image-picker v-if="options.type === 'image'" v-model="value" />
    <el-select v-if="options.type === 'select'" v-model="value">
      <el-option
        v-for="item in options.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </feild>
</template>

<script>
import { get, set } from "../utils/object";
import Feild from "./Field.vue";
import Group from "./Group.vue";
import ImagePicker from "./ImagePicker.vue";

export default {
  name: "attribute-tree",
  components: { Feild, Group, ImagePicker },
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
        set(this.values, key, newValue);

        // set values for releated keys
        for (const { trigger, actions } of relations) {
          if (trigger === newValue) {
            for (const { key, value } of actions) {
              const oldValue = get(this.values, key);
              if (oldValue === undefined) {
                set(this.values, key, value);
              }
            }
          }
        }
      },
    },
  },
};
</script>

<style>
.children-container {
  padding-left: 1em;
}
</style>