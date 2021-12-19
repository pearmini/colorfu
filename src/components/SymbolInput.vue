<template>
  <div class="symbol-input-container">
    <el-popover placement="top" width="300" trigger="focus">
      <div class="emoji-input-popover">
        <el-tabs value="first">
          <el-tab-pane label="w(ﾟДﾟ)w" name="first">
            <emoticon-picker @input="handleInput" />
          </el-tab-pane>
          <el-tab-pane label="Emoji 😆" name="second">
            <emoji-picker @input="handleInput" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-input
        id="emojiInput"
        :placeholder="placeholder"
        v-model="textValue"
        :size="size"
        slot="reference"
        :style="{
          width: 200 + 'px',
        }"
        type="textarea"
        autosize
      />
    </el-popover>
  </div>
</template>

<script>
import EmojiPicker from "./EmojiPicker";
import EmoticonPicker from "./EmoticonPicker";

export default {
  components: {
    EmojiPicker,
    EmoticonPicker,
  },
  props: {
    placeholder: String,
    size: String,
    value: String,
  },
  computed: {
    textValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    handleInput(face) {
      const $input = document.getElementById("emojiInput");
      const { selectionStart: start, selectionEnd: end } = $input;
      if (start === undefined || end === undefined) return;
      const newValue = this.textValue.substring(0, start) + face + this.textValue.substring(end);
      // 重新定义光标位置，这个地方不能缺少
      $input.value = newValue;
      $input.focus();
      $input.selectionStart = start + face.length;
      $input.selectionEnd = start + face.length;
      this.textValue = newValue;
    },
  },
};
</script>

<style>
.emoji-input-popover {
  padding: 0px 12px;
  padding-bottom: 12px;
}

.symbol-input-container .el-popover {
  padding: 0px;
}

.emoji-input-popover .el-tabs__item {
  height: 36px;
  padding: 0 6px;
  color: #606266;
  font-weight: normal;
}

.emoji-input-popover .el-tabs__nav-wrap::after {
  height: 1px;
}
</style>