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
      <div class="focus-inputs">
        <label class="input-container">
          <input type="checkbox" v-model="done" />
          <span class="checkmark"></span>
          <div>{{ focus }}</div>
        </label>
        <div class="action-btn" @click="resetFocus()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "./shared/Input";
import storage from "../mixins/storage";
export default {
  mixins: [storage],
  components: { "mc-input": Input },
  data() {
    return {
      focus: "",
      done: false
    };
  },
  methods: {
    resetFocus() {
      this.focus = "";
      this.done = false;
      this.delete("focus");
      this.newFocus();
    },
    saveFocus() {
      if (this.focus !== null && this.focus !== "") {
        this.save("focus", { text: this.focus, done: false });
        this.focusActive();
      }
    },
    focusActive() {
      this.$refs.focus.classList.add("active");
      this.$refs.question.classList.remove("active");
    },
    newFocus() {
      this.$refs.focus.classList.remove("active");
      this.$refs.question.classList.add("active");
    }
  },
  mounted() {
    const focus = this.retrieve("focus", true);
    if (!focus) {
      return;
    }
    this.focus = focus.text;
    this.done = focus.done;
    if (this.focus) {
      this.$refs.focus.classList.add("active");
      this.$refs.question.classList.remove("active");
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

.question-wrapper.active {
  display: block;
}

.question-wrapper {
  display: none;
  transition: all 0.5s ease-in-out;
}

.focus {
  position: absolute;
  display: none;
  flex-direction: column;
  text-align: center;
  bottom: 0px;
  transition: all 0.5s ease;
}

.focus.active {
  display: flex;
  bottom: 95px;
}

.focus > div:first-child {
  font-size: 28px;
}

.focus-inputs {
  display: flex;
  align-items: center;
  margin-left: -20px;
  position: relative;
}

.input-container {
  display: flex;
  align-items: flex-start;
  position: relative;
  padding-left: 35px;
  margin: 12px 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.input-container > div {
  font-size: 28px;
  order: -1;
}

.input-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 5px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: transparent;
  border: 2px #fff solid;
  border-radius: 15%;
  opacity: 0;
  transform: all 0.5s ease;
}

.focus-inputs:hover .checkmark,
.input-container input:checked ~ .checkmark {
  opacity: 1;
}

.input-container input:checked ~ div {
  text-decoration: line-through;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.input-container input:checked ~ .checkmark:after {
  display: block;
}

.input-container .checkmark:after {
  left: 7px;
  top: 2px;
  width: 5px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  transform: all 0.5s ease;
}

.action-btn {
  display: inline-block;
  height: 30px;
  width: 30px;
  position: absolute;
  margin-right: -40px;
  padding: 10px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.5s;
  right: 0;
  background-color: rgba(224, 224, 224, 0.5);
  cursor: pointer;
}

.action-btn::after,
.action-btn::before {
  content: "";
  width: 18px;
  height: 2px;
  position: absolute;
  transform: rotate(45deg);
  background-color: #fff;
  top: 14px;
  right: 6px;
  opacity: 0;
  transition: all 0.5s;
}

.action-btn::after {
  transform: rotate(45deg);
}

.action-btn::before {
  transform: rotate(135deg);
}

.focus-inputs:hover > .action-btn::after,
.focus-inputs:hover .action-btn::before {
  opacity: 1;
}

.focus-inputs:hover > .action-btn {
  opacity: 1;
}
</style>
