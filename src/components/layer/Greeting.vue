<template>
  <div class="greeting-wrapper">
    <div ref="greeting" class="greeting" v-show="nameKnown">
      {{ greeting }}
      <span>{{ name }}</span>
      <div class="remove-btn" @click="clearName()"></div>
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
import storage from "../../mixins/storage";
import apiservice from "../../mixins/apiservice";
import daypart from "../../mixins/daypart";
export default {
  components: { "mc-input": Input },
  mixins: [storage, apiservice, daypart],
  data() {
    return {
      name: null,
      nameKnown: false,
      greeting: ""
    };
  },
  computed: {},
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

<style>
.greeting-wrapper {
  display: flex;
  flex-direction: row;
  font-size: 400%;
  justify-content: center;
  position: relative;
}

.greeting-wrapper * {
  font-size: inherit;
}

.remove-btn {
  display: inline-block;
  height: 30px;
  width: 30px;
  position: absolute;
  margin-left: 10px;
  padding: 10px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.5s;
}

.remove-btn::after,
.remove-btn::before {
  content: "";
  width: 18px;
  height: 2px;
  position: absolute;
  transform: rotate(45deg);
  background-color: #fff;
  top: 13px;
  right: 6px;
  opacity: 0;
  transition: all 0.5s;
}

.greeting > span:hover ~ .remove-btn::after,
.greeting > span:hover ~ .remove-btn::before,
.remove-btn:hover::after,
.remove-btn:hover::before {
  opacity: 0.8;
}

.greeting > span:hover ~ .remove-btn,
.remove-btn:hover {
  background-color: rgba(224, 224, 224, 0.5);
  opacity: 1;
  cursor: pointer;
}

.remove-btn::after {
  transform: rotate(45deg);
}

.remove-btn::before {
  transform: rotate(135deg);
}
</style>
