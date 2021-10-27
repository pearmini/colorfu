<template>
  <div
    @dragover="handleDragover"
    @drop="handleDrop"
    @dragleave="over = false"
    :style="{
      background: over ? '#eee' : 'white',
    }"
  >
    <field :name="name">
      <el-color-picker v-model="color" size="small" />
    </field>
  </div>
</template>

<script>
import Field from "./Field.vue";
export default {
  props: {
    name: String,
    value: String,
  },
  components: { Field },
  data() {
    return {
      over: false,
    };
  },
  computed: {
    color: {
      get() {
        return this.value;
      },
      set(newColor) {
        this.$emit("input", newColor);
      },
    },
  },
  methods: {
    handleDragover(e) {
      e.preventDefault(); // 取消这个事件才能触发 drop 事件
      this.over = true;
    },
    handleDrop(e) {
      const color = e.dataTransfer.getData("drag-color");
      this.$emit("input", color);
    },
  },
};
</script>