<template>
  <div class="center-row">
    <div class="time-wrapper">
      <div class="time">
        {{ selectedFormat === 12 ? time12 : time24 }}
        <div class="time-select">
          <mc-fab @click="saveFormat(12)" fontSize="28px">
            <template v-slot:content>
              <div>12</div>
            </template>
          </mc-fab>
          <mc-fab @click="saveFormat(24)" fontSize="28px">
            <template v-slot:content>
              <div>24</div>
            </template>
          </mc-fab>
        </div>
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
}

.time-wrapper {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.time {
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: 0 auto;
  position: relative;
}

.time-select {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -70px;
}

.time:hover .time-select > div,
.time-select:hover > div {
  opacity: 0.7;
}
</style>
