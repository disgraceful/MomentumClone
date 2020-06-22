<template>
  <div class="top-row">
    <div>
      <div class="search-wrapper">
        <mc-input ref="search" hover v-model="searchQuery" @enter="search()">
          <template v-slot:icon>
            <i class="fas fa-search fa-lg icon" @click="$refs.search.focusInput()"></i>
          </template>
        </mc-input>
      </div>
    </div>
    <mc-weather></mc-weather>
  </div>
</template>

<script>
import Input from "./shared/Input";
import Weather from "../components/layer/Weather";

export default {
  components: { "mc-input": Input, "mc-weather": Weather },
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    search() {
      window.location.href = `https://www.google.com/search?q=${this.searchQuery}`;
    }
  }
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

.top-row > div > .search-wrapper {
  position: relative;
  display: inline-block;
  font-size: 20px !important;
}
</style>
