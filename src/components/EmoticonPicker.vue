<template>
  <div class="emoticon-picker-container">
    <div class="emoticon-picker-header">
      <el-button type="primary" size="mini" @click="generateEmotion">Refresh</el-button>
      <span class="emoticon-picker-item" @click="() => handleClick(randomEmoticon)">{{
        randomEmoticon
      }}</span>
    </div>
    <div class="emoticon-picker-content">
      <span
        class="emoticon-picker-item"
        v-for="face in faces"
        :key="face"
        @click="() => handleClick(face)"
        >{{ face }}</span
      >
    </div>
  </div>
</template>

<script>
import emoticon from "emoticon.js";
import faces from "../data/emoticons.json";

export default {
  data() {
    return {
      randomEmoticon: emoticon(),
      faces,
    };
  },
  methods: {
    generateEmotion() {
      this.randomEmoticon = emoticon();
    },
    handleClick(face) {
      this.$emit("input", face);
    },
  },
};
</script>

<style>
.emoticon-picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.emoticon-picker-header > span {
  display: inline-block;
  width: 40%;
  text-align: center;
  cursor: pointer;
}

.emoticon-picker-item {
  padding: 5px 8px;
  display: inline-block;
  cursor: pointer;
  border-radius: 4px;
  color: #606266;
  font-weight: normal;
}

.emoticon-picker-content {
  max-height: 197px;
  overflow: scroll;
}

.emoticon-picker-container {
  max-height: 236px;
}

.emoticon-picker-item:hover {
  background: #eee;
}
</style>