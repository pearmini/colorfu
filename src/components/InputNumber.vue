<template>
  <field :name="name">
    <el-input-number
      v-model="numberValue"
      controls-position="right"
      :min="min"
      :max="max"
      :step="step"
      size="small"
    ></el-input-number>
    <template v-slot:name>
      <span @mousedown="handleMouseDown" :style="curosrStyle">{{ name }}</span>
    </template>
    <div
      class="input-number-overlayer"
      v-if="showOverlayer"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      :style="curosrStyle"
    ></div>
  </field>
</template>

<script>
import Field from "./Field.vue";
export default {
  components: { Field },
  props: {
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    value: Number,
    step: Number,
    name: String,
  },
  data() {
    return {
      showOverlayer: false,
      x: 0,
      initValue: 0,
    };
  },
  computed: {
    numberValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    curosrStyle() {
      let cursor;
      if (this.value <= this.min) {
        cursor = "e-resize";
      } else if (this.value >= this.max) {
        cursor = "w-resize";
      } else {
        cursor = "ew-resize";
      }
      return {
        cursor,
      };
    },
  },
  methods: {
    handleMouseDown({ clientX }) {
      this.showOverlayer = true;
      this.x = clientX;
      this.initValue = this.value;
    },
    handleMouseUp() {
      this.showOverlayer = false;
    },
    handleMouseMove({ clientX }) {
      const offsetX = clientX - this.x;
      const newValue = this.initValue + offsetX;
      this.$emit("input", newValue);
    },
  },
};
</script>

<style>
.input-number-overlayer {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1100;
  left: 0;
  top: 0;
}
</style>