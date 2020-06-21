<template>
  <div class="input-wrapper" :style="cssProps">
    <label class="inputs">
      <input type="checkbox" v-model="checked" @change="$emit('input',checkedProxy)" />
      <span class="checkmark"></span>
      <slot name="text"></slot>
    </label>
    <slot name="action"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      checkedProxy: false
    };
  },

  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      }
    },
    isTextPresent() {
      return this.$slots.text;
    },
    cssProps() {
      return {
        "--text-decorate": this.value ? "line-through" : "none"
      };
    }
  }
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  position: relative;
}

.inputs {
  display: flex;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.inputs input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0px;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: transparent;
  border: 2px #fff solid;
  border-radius: 15%;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: -2px;
  width: 5px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  transform: all 0.5s ease;
}

.inputs input:checked ~ .checkmark::after {
  display: block;
}

.inputs input:checked ~ div {
  text-decoration: var(--text-decorate);
}
</style>
