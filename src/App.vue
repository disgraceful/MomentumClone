<template>
  <div id="app">
    <mc-main></mc-main>
  </div>
</template>

<script>
import MainView from "./components/MainView";
export default {
  name: "App",
  components: {
    "mc-main": MainView
  }
};
</script>
