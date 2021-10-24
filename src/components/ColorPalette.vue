<template>
  <group :name="name">
    <div class="color-palette-btns" slot="header">
      <el-button
        type="primary"
        size="mini"
        @click="showColorsStore = true"
        icon="el-icon-plus"
        circle
      ></el-button>
    </div>
    <el-empty v-if="colors.length === 0" description="No Colors"> </el-empty>
    <template v-else>
      <div v-for="(item, index) in colors" :key="item.color" class="color-palette-row">
        <el-button
          icon="el-icon-delete"
          circle
          size="mini"
          @click="() => handleDeleteColor(index)"
        ></el-button>
        <div :style="{ background: item.color }" class="color-palette-preview"></div>
        <el-select
          size="small"
          filterable
          placeholder="Select Attribte"
          @input="(key) => handleInput(key, index, item.color)"
          :value="item.attribute"
        >
          <el-option v-for="item in keys" :key="item.name" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
      </div>
    </template>
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
  </group>
</template>

<script>
import Group from "./Group.vue";
import { colorStore } from "../data/color";

export default {
  components: {
    Group,
  },
  data() {
    return {
      colors: [],
      showColorsStore: false,
      colorStore,
      cardSize: 200,
    };
  },
  props: {
    name: String,
    keys: Array,
  },
  methods: {
    handleAddColors(values) {
      this.colors.push(...values.map((d) => ({ color: d, attribute: "" })));
      this.showColorsStore = false;
    },
    handleDeleteColor(index) {
      this.colors.splice(index, 1);
    },
    handleInput(key, index, value) {
      for (const color of this.colors) {
        if (color.attribute === key) {
          color.attribute = "";
        }
      }
      this.colors[index].attribute = key;
      this.colors = [...this.colors];
      this.$emit("input", key, value);
    },
  },
};
</script>

<style >
.el-empty {
  padding: 0;
}

.el-empty__image {
  width: 50px;
}

.el-card__body {
  padding: 0px;
}

.el-card__header {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-palette-tab-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-height: 480px;
  overflow: scroll;
}

.color-palette-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25em 0em;
}

.color-palette-preview {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}

.color-palette-btns {
  display: flex;
}
</style>