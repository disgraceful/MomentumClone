<template>
  <div class="lower-row">
    <div ref="question" class="question-wrapper active">
      <div class="question">What is your focus for today?</div>
      <div>
        <mc-input text-align="center" v-model="focus" @enter="saveFocus()"></mc-input>
      </div>
    </div>
    <div ref="focus" class="focus">
      <div>Today</div>
      <div>{{ focus }}</div>
    </div>
  </div>
</template>

<script>
import Input from "./shared/Input";
export default {
  components: { "mc-input": Input },
  data() {
    return {
      focus: ""
    };
  },
  methods: {
    saveFocus() {
      if (this.focus !== null && this.focus !== "") {
        this.$refs.focus.classList.add("active");
        this.$refs.question.classList.remove("active");
      }
    }
  }
};
</script>

<style scoped>
.lower-row {
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.lower-row div {
  font-size: 36px;
}

.lower-row > div.active {
  opacity: 1;
}

.question-wrapper {
  transition: all 0.5s ease-in-out;
  opacity: 0;
}

.focus {
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  opacity: 1;
  bottom: 0px;
  transition: all 0.5s ease;
}

.focus.active {
  opacity: 1;
  bottom: 100px;
}
</style>
