<template>
  <div class="quote-wrapper">
    <div class="quote" v-if="nameKnown">
      Very profound quote,
      <span>{{ name }}</span>
      <div class="remove-btn"></div>
    </div>
    <div class="name" v-else>
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
      nameKnown: false
    };
  },
  computed: {},
  methods: {
    enterName() {
      if (this.name !== null && this.name !== "") {
        this.save("name", this.name);
        this.nameKnown = true;
      }
    }
  },
  created() {
    const result = this.retrieve("name");
    if (result) {
      this.name = result.substring(1, result.length - 1);
      this.nameKnown = !!this.name;
    }
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
  height: 20px;
  width: 20px;
  position: absolute;
  margin-left: 10px;
}

.remove-btn::after,
.remove-btn::before {
  content: "";
  width: 18px;
  height: 2px;
  position: absolute;
  transform: rotate(45deg);
  background-color: #fff;
  top: 7px;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  transition: all 0.5s;
}

.quote > span:hover ~ .remove-btn::after,
.quote > span:hover ~ .remove-btn::before,
.remove-btn:hover::after,
.remove-btn:hover::before {
  opacity: 1;
}

.remove-btn::after {
  transform: rotate(45deg);
}

.remove-btn::before {
  transform: rotate(135deg);
}
</style>
