<template>
  <div id="main">
    <div id="bg"></div>
    <div class="container">
      <div class="top-row">
        <div class="search">
          <div>
            <i ref="icon" class="fas fa-search fa-lg icon"></i>
            <input ref="search" type="text" />
            <span class="underline"></span>
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
      input: null,
      icon: null
    };
  },
  watch: {},
  mounted() {
    this.input = this.$refs.search;
    this.icon = this.$refs.icon;

    this.input.onfocus = () => (this.icon.style.opacity = 1);
    this.input.onblur = () => (this.icon.style.opacity = 0.5);
    console.dir(this.input);
    console.dir(this.icon);
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

.search > div {
  position: relative;
  display: inline-block;
}

.search > div > i {
  font-size: 25px;
  opacity: 0.5;
}

.search input[type="text"] {
  background-color: transparent;
  color: inherit;
  border: none;
  font-size: 20px;
  pointer-events: auto;
  padding: 8px;
  position: relative;
}

.underline {
  width: 100%;
  height: 2px;
  border-bottom: 2px #fff solid;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: all 0.5s;
}

.search input[type="text"]:focus {
  outline: none;
}

.search > div:hover .underline {
  opacity: 0.5;
}

.search input[type="text"]:focus + .underline {
  opacity: 1;
}

.icon {
  opacity: 0.5;
  transition: all 0.5s;
}
</style>
