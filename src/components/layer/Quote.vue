<template>
  <div class="quote-wrapper">
    <div ref="quote" class="quote" v-show="nameKnown">
      {{ totalMesg }}
      <span v-if="isNameDisplayed">{{ name }}</span>
      <div v-if="isNameDisplayed" class="remove-btn" @click="clearName()"></div>
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
export default {
  components: { "mc-input": Input },
  mixins: [storage],
  data() {
    return {
      name: null,
      nameKnown: false,
      displayChance: 0,
      greeting: "Good morning",
      quoteText: "Very profound quote",
      totalMesg: "",
      isNameDisplayed: false
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
    getDisplayMessage() {
      switch (true) {
        case this.displayChance < 33:
          this.totalMesg = this.quoteText;
          this.isNameDisplayed = false;
          return;
        case this.displayChance < 66:
          this.totalMesg = this.quoteText + ",";
          this.isNameDisplayed = true;
          return;
        case this.displayChance >= 66:
          this.totalMesg = this.greeting + ",";
          this.isNameDisplayed = true;
      }
    }
  },
  created() {
    const result = this.retrieve("name");
    if (result) {
      this.name = result.substring(1, result.length - 1);
      this.nameKnown = !!this.name;
    }
    this.displayChance = Math.floor(Math.random() * 100);
  },
  mounted() {
    this.getDisplayMessage();
  }
};
</script>

<style>
.quote-wrapper {
  display: flex;
  flex-direction: row;
  font-size: 400%;
  justify-content: center;
  position: relative;
}

.quote-wrapper * {
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

.quote > span:hover ~ .remove-btn::after,
.quote > span:hover ~ .remove-btn::before,
.remove-btn:hover::after,
.remove-btn:hover::before {
  opacity: 0.8;
}

.quote > span:hover ~ .remove-btn,
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
