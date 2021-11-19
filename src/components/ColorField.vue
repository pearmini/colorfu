<template>
  <div
    class="color-field"
    @dragover="handleDragover"
    @drop="handleDrop"
    @dragleave="over = false"
    :style="{
      background: over ? '#eee' : 'white',
    }"
    @dragstart="handleDragStart"
    draggable
  >
    <field :name="name">
      <el-color-picker v-model="color" size="small" :predefine="predefineColors" />
    </field>
  </div>
</template>

<script>
import Field from "./Field.vue";
export default {
  props: {
    name: String,
    value: String,
    colorKey: String,
  },
  components: { Field },
  data() {
    return {
      over: false,
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
      ],
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
    handleDragStart(e) {
      const data = JSON.stringify({ value: this.value, key: this.colorKey });
      e.dataTransfer.setData("drag-color", data);
    },
    handleDragover(e) {
      e.preventDefault(); // 取消这个事件才能触发 drop 事件
      e.dataTransfer.dropEffect = "move"; // 取消默认的箭头
      this.over = true;
    },
    handleDrop(e) {
      const string = e.dataTransfer.getData("drag-color");
      const { value, key } = JSON.parse(string);
      this.$emit("input", value);
      this.over = false;
      if (key) {
        this.$emit("update", { key, value: this.value });
      }
    },
  },
};
</script>

<style>
.color-field {
  cursor: grab;
}
</style>