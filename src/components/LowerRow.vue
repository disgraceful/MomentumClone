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
      <mc-checkbox large v-model="done" @input="saveFocus()">
        <template v-slot:text>
          <div class="focus-text">
            {{ focus }}
            <div class="focus-fab">
              <mc-fab @click.native="resetFocus()">
                <template v-slot:content>
                  <div class="action-btn"></div>
                </template>
              </mc-fab>
            </div>
          </div>
        </template>
      </mc-checkbox>
    </div>
  </div>
</template>

<script>
import Input from "./shared/Input";
import storage from "../mixins/storage";
import Checkbox from "./shared/Checkbox";
import Fab from "./shared/Fab";
export default {
  mixins: [storage],
  components: {
    "mc-input": Input,
    "mc-checkbox": Checkbox,
    "mc-fab": Fab
  },
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
        this.save("focus", { text: this.focus, done: this.done });
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
  text-align: center;
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
  padding-bottom: 10px;
}

.focus div {
  font-size: 28px;
}

.focus-text {
  display: flex;
  position: relative;
  margin-top: -4px;
}

.focus-text > div {
  position: absolute;
  top: 0;
  right: -40px;
}

.focus > div:last-child :hover .focus-fab > div {
  opacity: 1;
  background-color: rgba(224, 224, 224, 0.5);
}

.action-btn {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  opacity: 0.8;
  transition: all 0.5s;
  position: relative;
}

.action-btn::after,
.action-btn::before {
  content: "";
  width: 18px;
  height: 2px;
  position: absolute;
  transform: rotate(45deg);
  background-color: #fff;
  top: 8px;
  left: 0px;
  transition: all 0.5s;
}

.action-btn::after {
  transform: rotate(45deg);
}

.action-btn::before {
  transform: rotate(135deg);
}
</style>
