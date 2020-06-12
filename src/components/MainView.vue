<template>
  <div id="main">
    <div id="bg"></div>
    <div class="container">
      <mc-header></mc-header>
      <div class="mid-gap">
        <div id="time">12:52</div>
        <div class="quote">Very profound quote</div>
      </div>
      <div class="mid-row">
        <div class="question">What is your focus for today?</div>
        <div>
          <input type="text" />
        </div>
        <div class="focus"></div>
      </div>
      <div class="footer-row">
        <div class="img-info">Beautiful nature picture</div>
        <div class="secondary-quote">This is very profound secondary quote</div>
        <div class="todo">
          <span>Todo</span>
          <div class="todo-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./HeaderRow";
export default {
  components: { "mc-header": Header }
};
</script>

<style>
#main {
  height: 100%;
  /* position: relative; */
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

#time {
  z-index: 5;
  font-size: 80px;
}

.container {
  display: grid;
  grid-template-rows: minmax(min-content, max-content);
  color: #fff;
  font-size: 30px;
}

.container div,
.container i,
.container span {
  font-size: inherit;
}
</style>
