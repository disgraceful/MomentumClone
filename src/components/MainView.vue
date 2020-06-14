<template>
  <div id="main">
    <div id="bg"></div>
    <div class="container">
      <mc-header></mc-header>
      <div class="gap"></div>

      <mc-center></mc-center>
      <mc-lower></mc-lower>
      <mc-footer></mc-footer>
    </div>
  </div>
</template>

<script>
import Header from "./HeaderRow";
import CenterRow from "./CenterRow";
import LowerRow from "./LowerRow";
import Footer from "./FooterRow";
export default {
  components: {
    "mc-header": Header,
    "mc-center": CenterRow,
    "mc-lower": LowerRow,
    "mc-footer": Footer
  }
};
</script>

<style>
#main {
  height: 100%;
}
#bg {
  background-image: url("../img/test-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-color: #464646;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
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
