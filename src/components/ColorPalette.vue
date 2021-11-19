<template>
  <div class="color-palette-container">
    <div
      v-if="colors.length === 0"
      class="color-empty-wrapper"
      @mouseover="showButtons = true"
      @mouseleave="showButtons = false"
    >
      <el-empty
        description="No colors, hover to add."
        :style="{
          opacity: showButtons ? 0 : 1,
        }"
      >
      </el-empty>
      <div class="color-palette-btns" v-if="showButtons">
        <el-button icon="el-icon-plus" type="primary" @click="showColorsStore = true" size="small"
          >Color Store</el-button
        >
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="showImageExtracter = true"
          size="small"
          >From Image</el-button
        >
      </div>
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
      <el-popover placement="bottom" trigger="hover">
        <el-button icon="el-icon-plus" type="primary" @click="showColorsStore = true" size="small"
          >Color Store</el-button
        >
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="showImageExtracter = true"
          size="small"
          >From Image</el-button
        >
        <i
          slot="reference"
          class="el-icon-circle-plus-outline"
          :style="{
            float: 'left',
            cursor: 'pointer',
            lineHeight: '30px',
          }"
        ></i>
      </el-popover>
    </div>
    <el-dialog title="Color Store" width="1000px" :visible.sync="showColorsStore">
      <el-tabs :value="colorStore[0].name">
        <el-tab-pane
          :label="item.name"
          :name="item.name"
          v-for="item in colorStore"
          :key="item.name"
        >
          <p class="color-palette-des" v-html="item.des"></p>
          <div class="color-palette-tab-container">
            <div v-for="color in item.colors" :key="color.name || color.values.join('')">
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
                <span>{{ color.name || "Learn More" }}</span>
                <span v-if="color.link" class="color-palette-link"
                  ><el-link :href="color.link" target="_blank" :underline="false"
                    ><i class="el-icon-link" style="font-size: 16px" /></el-link
                ></span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showColorsStore = false">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Extract Colors From Image" :visible.sync="showImageExtracter">
      <image-color-picker v-model="selectedImageColors" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseImageColorPicker">Cancel</el-button>
        <el-button
          type="primary"
          @click="handleAddImageColors"
          v-show="selectedImageColors.length !== 0"
          >Add</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { colorStore } from "../data/color/index";
import ImageColorPicker from "./ImageColorPicker.vue";

export default {
  data() {
    return {
      showColorsStore: false,
      colorStore,
      cardSize: 200,
      colors: [],
      showButtons: false,
      showImageExtracter: false,
      selectedImageColors: [],
    };
  },
  components: {
    ImageColorPicker,
  },
  methods: {
    handleAddImageColors() {
      const colors = [...this.selectedImageColors];
      this.handleAddColors(colors);
      this.handleCloseImageColorPicker();
    },
    handleCloseImageColorPicker() {
      this.showImageExtracter = false;
      this.selectedImageColors = [];
    },
    handleAddColors(colors) {
      if (colors.length === 0) return;
      // 过滤掉已经有的颜色
      const colorSet = new Set(this.colors);
      const newColors = colors.filter((d) => !colorSet.has(d));
      if (colors.length !== newColors.length) {
        Message.warning("Repeat colors will not be added.");
      }

      // 更新颜色
      this.colors.push(...newColors);
      this.showColorsStore = false;
    },
    handleDeleteColor(index) {
      this.colors.splice(index, 1);
    },
    handleDragStart(e, color) {
      const data = JSON.stringify({ value: color });
      e.dataTransfer.setData("drag-color", data);
    },
  },
};
</script>

<style >
.color-palette-container .el-empty {
  padding: 5px;
}

.color-empty-wrapper {
  cursor: pointer;
  position: relative;
}

.color-palette-btns {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  max-height: 500px;
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
  margin: 5px 5px 5px 0px;
  cursor: grab;
}

.color-palette-des {
  font-size: 16px;
  text-align: start;
  margin: 0.5em 8px 1em 8px;
}

.color-palette-link {
  cursor: pointer;
  padding-left: 10px;
}
</style>