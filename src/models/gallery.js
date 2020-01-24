export default {
  namespace: "gallery",
  state: {
    selectedTypeId: 1,
    types: [
      {
        id: 1,
        title: "爱情公寓",
        intro: "这里是爱情公寓里面的一些配色",
        wordspapers: [
          {
            title: "♞ell⦿ 2☯︎2零",
            color: "#ffffff",
            backgroundColor: "#fd5e53",
            fontSize: 250,
            mode: "h"
          },
          {
            title: "♞ell⦿ 2☯︎2零",
            color: "#ffffff",
            backgroundColor: "#fd5e53",
            fontSize: 250,
            mode: "h"
          },
          {
            title: "♞ell⦿ 2☯︎2零",
            color: "#ffffff",
            backgroundColor: "#fd5e53",
            fontSize: 250,
            mode: "h"
          },
          {
            title: "♞ell⦿ 2☯︎2零",
            color: "#ffffff",
            backgroundColor: "#fd5e53",
            fontSize: 250,
            mode: "h"
          },
          {
            title: "♞ell⦿ 2☯︎2零",
            color: "#ffffff",
            backgroundColor: "#fd5e53",
            fontSize: 250,
            mode: "h"
          }
        ]
      },
      {
        id: 2,
        title: "复仇者联盟",
        intro: "这里是复仇者联盟里面的一些配色",
        wordspapers: [{}, {}, {}]
      },
      {
        id: 3,
        title: "品牌",
        intro: "这里是一些常见的品牌",
        wordspapers: [{}, {}, {}]
      },
      {
        id: 4,
        title: "中国古风",
        intro: "这里是中国古风",
        wordspapers: [{}, {}, {}]
      },
      {
        id: 5,
        title: "篮球队",
        intro: "这里是篮球队的配色",
        wordspapers: [{}, {}, {}]
      },
      {
        id: 6,
        title: "颜文字",
        intro: "这里是颜文字",
        wordspapers: [{}, {}, {}]
      },
      {
        id: 7,
        title: "emoji",
        intro: "这里是一些 emoji",
        wordspapers: [{}, {}, {}]
      }
    ]
  },
  reducers: {
    setSelectedType(state, action) {
      const { id } = action.payload;
      state.selectedTypeId = id;
      return state;
    }
  }
};
