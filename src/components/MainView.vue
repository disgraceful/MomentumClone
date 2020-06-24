<template>
  <div ref="main" id="main" class="loading">
    <mc-bg @loaded="loadBg()"></mc-bg>
    <div class="container">
      <mc-header></mc-header>
      <div class="gap"></div>
      <mc-center></mc-center>
      <mc-lower></mc-lower>
      <mc-footer ref="footer"></mc-footer>
    </div>
  </div>
</template>

<script>
import Header from "./HeaderRow";
import CenterRow from "./CenterRow";
import LowerRow from "./LowerRow";
import Footer from "./FooterRow";
import Background from "./layer/Background";

export default {
  components: {
    "mc-header": Header,
    "mc-center": CenterRow,
    "mc-lower": LowerRow,
    "mc-footer": Footer,
    "mc-bg": Background
  },
  methods: {
    loadBg() {
      this.$refs.main.classList.remove("loading");
      this.$refs.footer.retrieveImgInfo();
    }
  }
};
</script>

<style>
#main {
  height: 100%;
}

#main.loading {
  background-color: #fff;
  z-index: 10;
  opacity: 0;
}

.gap {
  flex: 1 1 50%;
}

.container {
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 30px;
  z-index: 5;
}
</style>
