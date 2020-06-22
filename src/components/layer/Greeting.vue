<template>
  <div class="greeting-wrapper">
    <div ref="greeting" class="greeting" v-show="nameKnown">
      {{ greeting }}
      <span>{{ name }}</span>
      <div class="remove-container">
        <mc-fab small>
          <template v-slot:content>
            <div class="remove-btn" @click="clearName()"></div>
          </template>
        </mc-fab>
      </div>
    </div>
    <div class="name" v-show="!nameKnown">
      <mc-input
        text-align="center"
        placeholder="What's your name?"
        v-model="name"
        @enter="enterName()"
      ></mc-input>
    </div>
  </div>
</template>

<script>
import Input from "../shared/Input";
import Fab from "../shared/Fab";
import storage from "../../mixins/storage";
import apiservice from "../../mixins/apiservice";
import daypart from "../../mixins/daypart";
export default {
  components: { "mc-input": Input, "mc-fab": Fab },
  mixins: [storage, apiservice, daypart],
  data() {
    return {
      name: null,
      nameKnown: false,
      greeting: ""
    };
  },
  methods: {
    enterName() {
      if (this.name !== null && this.name !== "") {
        this.save("name", this.name);
        this.nameKnown = true;
      }
    },
    clearName() {
      this.name = null;
      this.nameKnown = false;
      this.delete("name");
    },
    getGreeting() {
      const daypart = this.getDayPart();
      this.greeting = `Good ${daypart},`;
    }
  },
  created() {
    const result = this.retrieve("name");
    if (result) {
      this.name = result.substring(1, result.length - 1);
      this.nameKnown = !!this.name;
    }
    this.getGreeting();
  }
};
</script>

<style scoped>
.greeting-wrapper {
  display: flex;
  flex-direction: row;
  font-size: 50px;
  justify-content: center;
  position: relative;
}

.greeting-wrapper * {
  font-size: inherit;
}

.greeting {
  position: relative;
}

.remove-container {
  position: absolute;
  top: 0;
  right: -40px;
}

.remove-btn {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  opacity: 0.8;
  transition: all 0.5s;
  position: relative;
}

.remove-btn::after,
.remove-btn::before {
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

.remove-btn::after {
  transform: rotate(45deg);
}

.remove-btn::before {
  transform: rotate(135deg);
}

.greeting > span:hover ~ .remove-container > div {
  opacity: 1 !important;
  background-color: rgba(224, 224, 224, 0.5);
}
</style>
