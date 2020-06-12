<template>
  <div id="main">
    <div id="bg"></div>
    <div class="container">
      <div class="top-row">
        <div class="search">
          <div>
            <i class="fas fa-search fa-lg"></i>
            <span class="underline"></span>
            <input ref="search" type="text" />
          </div>
        </div>
        <div class="weather-container">
          <div class="weather">
            <i class="fas fa-sun fa-lg"></i>
            <span>31&#176;</span>
          </div>
          <div>Location</div>
        </div>
      </div>
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
export default {
  data() {
    return {
      input: null
    };
  },
  watch: {},
  mounted() {
    this.input = this.$refs.search;
    console.dir(this.input);
  }
};
</script>

<style scoped>
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
  /* height: 100vh; */
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
  /* position: absolute; */

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

.top-row {
  display: flex;
}

.top-row .search,
.top-row .weather-container {
  flex: 1 1 50%;
  padding: 15px 20px;
}

.top-row .weather-container {
  display: flex;
  flex-direction: column;
}

.top-row .weather-container > div {
  text-align: end;
}

.weather span {
  font-size: 28px;
}

.weather + div {
  font-size: 18px;
}

.weather-container i {
  padding: 0 10px;
}

.search input[type="text"] {
  background-color: transparent;
  color: inherit;
  border: none;
  font-size: 20px;
  pointer-events: auto;
  padding: 8px;
  position: relative;
  /* border-bottom: 0px #fff solid; */
}

.search > div {
  position: relative;
  display: inline-block;
}

.underline {
  width: 110%;
  height: 2px;
  border-bottom: 2px #fff solid;
  opacity: 1;
  transition: all 0.5s;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: -25px;
}

.search input[type="text"]:focus {
  outline: none;
}

.search input[type="text"]:focus .input-container::after {
  opacity: 1;
}

.input-container:hover::after {
  opacity: 0.6;
}
</style>
