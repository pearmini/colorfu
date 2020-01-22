export default {
  plugins: [
    [
      "umi-plugin-react",
      {
        dva: {
          //推荐开启 dva-immer 以简化 reducer 编写
          immer: true
        },
        antd: true,
        dynamicImport: true
      }
    ]
  ]
};
