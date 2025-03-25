<template>
  <div class="story-container">
    <div class="story-header">
      <div>
        <h1>ColorFu's Story</h1>
        <p>
          Writing the word "福" (Fu) is the tradition of Chinese New Year, people will write a big
          "福" on red paper and stick it on the door to express the good expectations of the new
          year.
        </p>
        <p>
          This is a great example that people use words and colors to express their feelings or
          ideas. And on the other hand, wallpaper is the most common thing we see everyday which
          should not be cold.
        </p>
        <p>
          What it if you can use more colors and more words to make wallpapers to express more
          feelings ? In that way, not only can you make your wallpapers beautiful, but also make
          them meaningful.
        </p>
        <p>
          There are some colors, patterns and words provided by ColorFu, and you can even extract colors from
          an image. Find the stories behind them and use them to make your own stories.
        </p>
        <p>
          <el-select v-model="selectedValue">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="selectedMode" v-if="selectedValue === 'color'">
            <el-option
              v-for="item in modes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <img :src="FU_IMAGE" class="story-image" width="32%" />
    </div>
    <div class="story-body">
      <div v-if="selectedValue === 'emoji'">
        <div class="story-emoji-container">
          <span
            v-for="item in emojis"
            :key="item.emoji"
            @click="() => handleClickEmoji(item.emoji)"
            >{{ item.emoji }}</span
          >
        </div>
        <p>
          These emojis are from
          <el-link type="primary" href="https://github.com/muan/emoji" target="_blank"
            >muan / emoji</el-link
          >
          ❤️.
        </p>
      </div>
      <div v-if="selectedValue === 'emoticon'" style="text-align: left">
        <span
          v-for="item in faces"
          :key="item"
          class="story-emoticon-item"
          @click="() => handleClickEmoticon(item)"
          >{{ item }}</span
        >
      </div>
      <div v-if="selectedValue === 'color' && selectedMode === 'store'">
        <div v-for="collection in colorStore" :key="collection.name" class="story-color-collection">
          <h2>{{ collection.name }}</h2>
          <p v-html="collection.des" class="story-color-collection-des" />
          <div class="story-color-container">
            <div v-for="color in collection.colors" class="story-color-item" :key="color.name">
              <div
                class="story-color-item-wrapper"
                :style="{
                  height: cardSize + 'px',
                }"
                @click="() => handleClickColors(color.name || 'ColorFu', color.values)"
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
              </div>
              <span class="story-color-name">
                <el-link :href="color.link" target="_blank" v-if="color.link">{{
                  color.name || "Learn More"
                }}</el-link>
                <span v-else>{{ color.name || "Learn More" }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="selectedValue === 'color' && selectedMode === 'image'"
        style="text-align: left; margin-bottom: 2em"
      >
        <image-color-picker v-model="selectedImageColors" :maxCount="4" />
        <el-button
          type="primary"
          class="storey-make-button"
          :disabled="selectedImageColors.length === 0"
          @click="() => handleClickColors('ColorFu', selectedImageColors)"
          >Make Wallpaper</el-button
        >
      </div>
      <div v-if="selectedValue === 'pattern'" class="story-pattern-container">
        <div
          v-for="item in patterns"
          :key="item.label"
          class="story-pattern-item"
          @click="() => handleClickPattern(item.label, item.textColor, item.options)"
        >
          <pattern-card :options="item.options" :size="patternSize" :name="item.label" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageColorPicker from "../components/ImageColorPicker.vue";
import PatternCard from "../components/PatternCard.vue";
import emojiByGroup from "../data/emoji-by-group.json";
import faces from "../data/emoticons.json";
import { colorStore } from "../data/color";
import { patterns } from "../data/pattern";
import { gotoEditor } from "../utils/gotoEditor";
import FU_IMAGE from "../assets/images/fu.png";

const emojis = Object.values(emojiByGroup).flat();

function offset(name) {
  return name.length <= 3 ? 100 : name.length === 4 ? 80 : 30;
}

export default {
  data() {
    return {
      types: [
        { value: "color", label: "Color 🌈" },
        {
          value: "pattern",
          label: "Pattern 👨‍👩‍👧‍👧",
        },
        { value: "emoji", label: "Emoji 😆" },
        { value: "emoticon", label: "w(ﾟДﾟ)w" },
      ],
      modes: [
        { value: "store", label: "From Color Store 🏳️‍🌈" },
        { value: "image", label: "From Image 🏞️" },
      ],
      selectedValue: "color",
      selectedMode: "store",
      emojis,
      faces,
      patterns,
      colorStore,
      cardSize: 200,
      selectedImageColors: [],
      patternSize: screen.width / 2,
      FU_IMAGE,
    };
  },
  components: {
    ImageColorPicker,
    PatternCard,
  },
  methods: {
    handleClickEmoticon(emoticon) {
      const options = {
        text: {
          content: emoticon,
          fontSize: 200,
          fontFamily: "Luckiest Guy",
          fontURL: "./fonts/luckiest_guy.ea045d18.woff2",
          type: "none",
          color: "#000000",
          mode: "autoFit",
          padding: 0,
          dy: 30,
        },
        background: { type: "none", color: "#FBB82C", mode: "pattern" },
      };
      gotoEditor(this.$router, options);
    },
    handleClickEmoji(emoji) {
      const options = {
        text: {
          content: emoji,
          fontSize: 100,
          fontFamily: "Luckiest Guy",
          fontURL: "./fonts/luckiest_guy.ea045d18.woff2",
          type: "none",
          color: "#000",
          mode: "none",
          padding: 0,
          dy: 0,
        },
        background: { type: "none", color: "#4DD599", mode: "pattern" },
      };
      gotoEditor(this.$router, options);
    },
    handleClickColors(name, values) {
      let options;
      if (values.length === 1) {
        options = {
          text: {
            content: name,
            fontSize: 200,
            fontFamily: "Luckiest Guy",
            fontURL: "./fonts/luckiest_guy.ea045d18.woff2",
            type: "none",
            color: "#ffffff",
            mode: "autoFit",
            padding: 0,
            dy: offset(name),
          },
          background: { type: "none", color: values[0], mode: "pattern" },
        };
      } else if (values.length === 2) {
        options = {
          text: {
            content: name,
            fontSize: 200,
            fontFamily: "Luckiest Guy",
            fontURL: "./fonts/luckiest_guy.ea045d18.woff2",
            type: "none",
            color: values[1],
            mode: "autoFit",
            padding: 0,
            dy: offset(name),
          },
          background: { type: "none", color: values[0], mode: "pattern" },
        };
      } else if (values.length === 3) {
        const [c1, c2, c3] = values;
        options = {
          text: {
            content: name,
            fontSize: 200,
            fontFamily: "Luckiest Guy",
            fontURL: "./fonts/luckiest_guy.ea045d18.woff2",
            type: "none",
            color: c1,
            mode: "autoFit",
            padding: 0,
            dy: offset(name),
          },
          background: {
            type: "dot",
            color: c2,
            mode: "pattern",
            fillColor: c3,
            size: 100,
            strokeColor: c3,
            lineWidth: 1,
            width: 210,
            height: 210,
            rotation: 45,
          },
        };
      } else if (values.length === 4) {
        const [c1, c2, c3, c4] = values;
        options = {
          text: {
            content: name,
            fontSize: 200,
            fontFamily: "Luckiest Guy",
            fontURL: "./fonts/luckiest_guy.ea045d18.woff2",
            type: "line",
            rotation: 45,
            width: 25,
            height: 25,
            foregroundColor: c4,
            color: c3,
            mode: "autoFit",
            lineWidth: 1.5,
            padding: 0,
            dy: offset(name),
          },
          background: {
            mode: "pattern",
            color: c1,
            foregroundColor: c2,
            type: "line",
            width: 50,
            lineWidth: 1.5,
            rotation: 0,
          },
        };
      }
      gotoEditor(this.$router, options);
    },
    handleClickPattern(name, color, background) {
      const options = {
        text: {
          content: name,
          fontSize: 200,
          fontFamily: "Luckiest Guy",
          fontURL: "./fonts/luckiest_guy.ea045d18.woff2",
          type: "none",
          color,
          mode: "autoFit",
          padding: 0,
          dy: offset(name),
        },
        background,
      };
      gotoEditor(this.$router, options);
    },
  },
};
</script>

<style>
.story-container {
  margin: 0 172px;
}

.story-container .el-select {
  margin-top: 1em;
  margin-right: 1em;
}

.story-header {
  display: flex;
  align-items: center;
  margin: 1em 0;
}

.storey-make-button {
  margin-top: 1.5em;
  margin-bottom: 2.5em;
  float: right;
}

.story-image {
  margin-left: 5%;
  border-radius: 40px;
}

.story-image img {
  border-radius: 50px;
}

.story-header h1 {
  font-size: 50px;
  margin: 0.2em 0;
}

.story-header p {
  text-align: left;
  font-size: 20px;
  margin: 1em 0;
}

.story-emoji-container {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
}

.story-emoji-container span {
  display: inline-block;
  font-size: 20px;
  padding: 0.5em 0;
  cursor: pointer;
  border-radius: 10px;
}

.story-emoji-container span:hover {
  background: #eee;
}

.story-emoticon-item {
  padding: 0.5em 0.5em;
  margin: 0.5em 0.5em;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 10px;
  background: #eee;
}

.story-emoticon-item:hover {
  color: #409eff;
}

.story-color-item {
  text-align: center;
  margin-right: 1.25em;
}

.story-color-item-wrapper {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.story-color-collection {
  text-align: left;
  margin-bottom: 2em;
}

.story-color-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.story-color-collection-des {
  margin: 0.75em 0;
}

.story-color-item-wrapper:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.story-color-name {
  display: inline-block;
  margin: 0.5em 0;
}

.story-body {
  margin-bottom: 2.5em;
}

.story-pattern-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.story-pattern-item {
  margin: 12px;
}
</style>
