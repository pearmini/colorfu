<template>
  <div>
    <field :name="name">
      <span class="collapse-icon-container">
        <i class="collapse-icon el-icon-arrow-up" @click="open = !open" :style="iconStyle"></i>
      </span>
    </field>
    <el-collapse-transition>
      <div class="collapse-children" v-show="open">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import Field from "./Field.vue";
export default {
  components: {
    Field,
  },
  props: {
    name: String,
    defaultOpen: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      open: this.defaultOpen,
    };
  },
  computed: {
    iconStyle() {
      return {
        transform: `rotateZ(${this.open ? 0 : 180}deg)`,
      };
    },
    childrenStyle() {
      // return {
      //   "max-height": `${this.open ? this.maxHeight : 0}px`,
      // };
      return this.open ? {} : { height: "0px" };
    },
  },
};
</script>
<style>
.collapse-children {
  padding-left: 1em;
  overflow: hidden;
  will-change: height;
}

.collapse-icon {
  cursor: pointer;
  transition: transform 0.3s;
}

.collapse-icon-container {
  height: 32px;
  vertical-align: middle;
  line-height: 32px;
}
</style>