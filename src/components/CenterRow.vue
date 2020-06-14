<template>
  <div class="center-row">
    <div class="time-wrapper">
      <div class="time">{{ selectedFormat === 12 ? time12 : time24 }}</div>
      <div class="time-select">
        <div @click="selectedFormat = 12">12</div>
        <div @click="selectedFormat = 24">24</div>
      </div>
    </div>
    <div class="quote">Very profound quote</div>
  </div>
</template>

<script>
import time from "../mixins/time";
export default {
  mixins: [time],
  data() {
    return {
      selectedFormat: 24
    };
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

.center-row .quote {
  font-size: 400%;
}

.time-wrapper {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.time-select {
  align-content: stretch;
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
