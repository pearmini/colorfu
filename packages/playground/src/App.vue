<template>
  <div id="app">
    <div id="app-container">
      <nav-header />
      <keep-alive exclude="editor">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader";

export default {
  name: "App",
  components: {
    NavHeader,
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

html,
body {
  width: 100%;
  overflow-x: hidden;
  min-height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

@font-face {
  font-family: "Luckiest Guy";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local("Luckiest Guy Regular"), local("LuckiestGuy-Regular"),
    url(./assets/font/luckiest_guy.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F,
    U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
