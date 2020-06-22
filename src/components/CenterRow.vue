<template>
  <div class="center-row">
    <div class="time-wrapper">
      <div class="time">{{ selectedFormat === 12 ? time12 : time24 }}</div>
      <div class="time-select">
        <mc-fab @click="saveFormat(12)" fontSize="28px">
          <template v-slot:content>
            <span>12</span>
          </template>
        </mc-fab>
        <mc-fab @click="saveFormat(24)" fontSize="28px">
          <template v-slot:content>
            <span>24</span>
          </template>
        </mc-fab>
      </div>
    </div>
    <mc-greeting-wrapper></mc-greeting-wrapper>
  </div>
</template>

<script>
import time from "../mixins/time";
import storage from "../mixins/storage";
import Greeting from "./layer/Greeting";
import Fab from "./shared/Fab";
export default {
  mixins: [time, storage],
  components: {
    "mc-greeting-wrapper": Greeting,
    "mc-fab": Fab
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
      const result = Number.parseInt(this.retrieve("format"));
      this.selectedFormat = result ? result : 24;
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

.time:hover + .time-select > div,
.time-select:hover > div {
  opacity: 0.7;
}
</style>
