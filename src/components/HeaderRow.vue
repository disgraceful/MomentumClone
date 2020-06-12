<template>
  <div class="top-row">
    <div ref="container" class="search-container">
      <div>
        <i class="fas fa-search fa-lg icon"></i>
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
      container: null
    };
  },
  watch: {},
  mounted() {
    this.input = this.$refs.search;
    this.container = this.$refs.container;

    this.input.onfocus = () => {
      if (!this.container.classList.contains("active")) {
        this.container.classList.toggle("active");
      }
    };
    this.input.onblur = () => {
      if (!this.input.value) {
        this.container.classList.toggle("active");
      }
    };
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

.search-container > div > .icon {
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

.search-container.active .underline,
.search-container.active .icon {
  opacity: 1;
}

.search-container .searchbar:focus {
  outline: none;
}

.search-container:not(.active) > div:hover .underline {
  opacity: 0.5;
}
</style>
