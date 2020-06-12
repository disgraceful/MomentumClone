<template>
  <div class="top-row">
    <div class="search-container">
      <div>
        <i ref="icon" class="fas fa-search fa-lg"></i>
        <input ref="search" class="searchbar" type="text" />
        <span class="underline"></span>
      </div>
    </div>
    <div class="weather-container">
      <div>
        <i class="fas fa-sun fa-lg"></i>
        <span>31&#176;</span>
      </div>
      <div class="location">Location</div>
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
  }
};
</script>

<style scoped>
.top-row {
  display: flex;
}

.top-row > div {
  flex: 1 1 50%;
  padding: 10px 15px;
}

.top-row .weather-container {
  display: flex;
  flex-direction: column;
  text-align: end;
  font-size: 28px;
}

.weather-container .location {
  font-size: 18px;
}

.weather-container i {
  padding: 0 10px;
}

.search-container > div {
  position: relative;
  display: inline-block;
}

.search-container > div > i {
  font-size: 24px;
  opacity: 0.5;
  transition: all 0.5s;
}

.search-container .searchbar {
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

.search-container .searchbar:focus {
  outline: none;
}

.search-container > div:hover .underline {
  opacity: 0.5;
}

.search-container .searchbar:focus + .underline {
  opacity: 1;
}
</style>
