<template>
  <div class="emoji-picker-container">
    <el-tabs tab-position="bottom" v-model="selectedName">
      <el-tab-pane
        v-for="group in emojiGroups"
        :key="group.name"
        :label="group.emoji"
        :name="group.name"
      >
        <div class="emoji-picker-content">
          <span
            v-for="item in emojis"
            :key="item.name"
            class="emoji-picker-item"
            @click="() => handleClick(item)"
            >{{ item.emoji }}</span
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import emojiByGroup from "../data/emoji-by-group.json";

const groups = Object.keys(emojiByGroup).map((key) => ({
  name: key,
  emoji: emojiByGroup[key][0].emoji,
}));

export default {
  data() {
    return {
      emojiGroups: groups,
      selectedName: groups[0].name,
    };
  },
  computed: {
    emojis() {
      return emojiByGroup[this.selectedName];
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("input", item.emoji);
    },
  },
};
</script>

<style>
.emoji-picker-content {
  max-height: 200px;
  overflow: scroll;
  font-size: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.emoji-picker-item {
  padding: 3px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
}

.emoji-picker-item:hover {
  background: #eee;
}

.emoji-picker-container .el-tabs__header {
  margin-top: 0px !important;
}

.emoji-picker-container .el-tabs__item  {
  font-size: 20px;
}
</style>