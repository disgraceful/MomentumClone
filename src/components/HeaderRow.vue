<template>
  <div class="top-row">
    <div>
      <div class="search-wrapper">
        <mc-input hover>
          <template v-slot:icon>
            <i class="fas fa-search fa-lg icon"></i>
          </template>
        </mc-input>
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
import Input from "./shared/Input";
export default {
  components: { "mc-input": Input },
  data() {
    return {
      input: null,
      container: null
    };
  },
  watch: {},
  mounted() {}
};
</script>

<style scoped>
.top-row {
  display: flex;
  flex: 0 1 auto;
}

.top-row > div {
  flex: 1 1 50%;
  padding: 10px 15px;
}

.top-row .weather-container {
  display: flex;
  flex-direction: column;
  text-align: end;
}

.top-row .weather-container * {
  font-size: 28px;
}

.weather-container .location {
  font-size: 18px;
}

.weather-container i {
  padding: 0 10px;
}

.top-row > div > .search-wrapper {
  position: relative;
  display: inline-block;
  font-size: 20px !important;
}
</style>
