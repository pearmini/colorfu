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
    handleDragover(e) {
      e.preventDefault(); // 取消这个事件才能触发 drop 事件
      e.dataTransfer.dropEffect = "move"; // 取消默认的箭头
      this.over = true;
    },
    handleDrop(e) {
      const color = e.dataTransfer.getData("drag-color");
      this.$emit("input", color);
      this.over = false;
    },
  },
};
</script>