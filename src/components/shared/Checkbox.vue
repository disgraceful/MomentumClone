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
    value: Boolean,
    large: Boolean
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
        "--text-decorate": this.value ? "line-through" : "none",
        "--size": this.large ? "28px" : "18px",
        "--padding": this.large ? "35px" : "25px",
        "--check-w": this.large ? "9px" : "5px",
        "--check-h": this.large ? "20px" : "12px",
        "--check-left": this.large ? "8px" : "5px"
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
  padding-left: var(--padding);
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
  top: 0;
  left: 0;
  height: var(--size);
  width: var(--size);
  background-color: transparent;
  border: 2px #fff solid;
  border-radius: 15%;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: var(--check-left);
  top: -2px;
  width: var(--check-w);
  height: var(--check-h);
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
