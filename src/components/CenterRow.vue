<template>
  <div class="center-row">
    <div class="time-wrapper">
      <div class="time">{{ selectedFormat === 12 ? time12 : time24 }}</div>
      <div class="time-select">
        <div @click="saveFormat(12)">12</div>
        <div @click="saveFormat(24)">24</div>
      </div>
    </div>
    <mc-greeting-wrapper></mc-greeting-wrapper>
  </div>
</template>

<script>
import time from "../mixins/time";
import storage from "../mixins/storage";
import Greeting from "./layer/Greeting";
export default {
  mixins: [time, storage],
  components: {
    "mc-greeting-wrapper": Greeting
  },
  data() {
    return {
      selectedFormat: null
    };
  },
  methods: {
    saveFormat(format) {
      this.save("format", format);
      this.retrieveFormat();
    },
    retrieveFormat() {
      this.selectedFormat = this.retrieve("format") | 24;
    }
  },
  mounted() {
    this.retrieveFormat();
  }
};
</script>

<style scoped>
.center-row {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  text-align: center;
  justify-content: center;
  align-content: center;
  user-select: none;
}

.center-row .time {
  font-size: 1500%;
  font-weight: 500;
  letter-spacing: -5px;
  margin-right: 20px;
  margin-left: 80px;
}

.time-wrapper {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.time-select > div {
  font-size: 28px;
  margin: 10px;
  padding: 7px;
  opacity: 0;
  transition: all 0.5s;
  cursor: pointer;
}

.time:hover + .time-select > div,
.time-select:hover > div {
  opacity: 0.7;
}

.time-select > div:hover {
  opacity: 1;
  background-color: rgba(224, 224, 224, 0.5);
  border-radius: 50%;
}
</style>
