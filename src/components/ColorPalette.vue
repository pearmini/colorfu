<template>
  <div class="color-palette-container">
    <div @click="showColorsStore = true" v-if="colors.length === 0" style="cursor: pointer">
      <el-empty description="No colors, click to add."> </el-empty>
    </div>
    <div v-else class="color-palette-colors">
      <span
        class="color-palette-item"
        v-for="color in colors"
        :style="{ background: color }"
        :key="color"
        draggable="true"
        @dragstart="(e) => handleDragStart(e, color)"
      ></span>
      <i
        class="el-icon-circle-plus-outline"
        @click="showColorsStore = true"
        :style="{
          float: 'left',
          cursor: 'pointer',
          lineHeight: '20px',
        }"
      ></i>
    </div>
    <el-dialog title="Color Store" width="1000px" :visible.sync="showColorsStore">
      <el-tabs :value="colorStore[0].name">
        <el-tab-pane
          :label="item.name"
          :name="item.name"
          v-for="item in colorStore"
          :key="item.name"
        >
          <div class="color-palette-tab-container">
            <div v-for="color in item.colors" :key="color.name || color.values[0]">
              <div @click="() => handleAddColors(color.values)">
                <el-card
                  shadow="hover"
                  :style="{
                    width: cardSize + 'px',
                    height: cardSize + 'px',
                    margin: '0px 8px',
                    cursor: 'pointer',
                  }"
                >
                  <div
                    v-for="value in color.values"
                    :key="value"
                    :style="{
                      background: value,
                      width: '100%',
                      height: cardSize / (color.values.length || 1) + 'px',
                    }"
                  ></div>
                </el-card>
              </div>
              <div :style="{ height: 30 + 'px', width: cardSize + 'px', margin: ' 6px 8px' }">
                {{ color.name }}
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showColorsStore = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { colorStore } from "../data/color/index";

export default {
  data() {
    return {
      showColorsStore: false,
      colorStore,
      cardSize: 200,
      colors: [],
    };
  },
  methods: {
    handleAddColors(colors) {
      // 过滤掉已经有的颜色
      const colorSet = new Set(this.colors);
      const newColors = colors.filter((d) => !colorSet.has(d));

      // 更新颜色
      this.colors.push(...newColors);
      this.showColorsStore = false;
    },
    handleDeleteColor(index) {
      this.colors.splice(index, 1);
    },
    handleDragStart(e, color) {
      e.dataTransfer.setData("drag-color", color);
    },
  },
};
</script>

<style >
.color-palette-container .el-empty {
  padding: 5px;
}

.color-palette-container .el-dialog__header {
  font-weight: bold;
}

.color-palette-container .el-dialog__body {
  padding-top: 10px;
}
.color-palette-container .el-empty__image {
  width: 50px;
}

.color-palette-container .el-card__body {
  padding: 0px;
}

.color-palette-container .el-card__header {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-palette-container {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  padding: 8px;
  margin: 0.25em 0;
}

.color-palette-tab-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-height: 480px;
  overflow: scroll;
}

.color-palette-colors::after {
  display: block;
  content: "";
  clear: both;
}

.color-palette-item {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin-right: 5px;
  cursor: grab;
}
</style>