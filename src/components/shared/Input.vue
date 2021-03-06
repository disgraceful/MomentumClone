<template>
  <div ref="container" class="input-container" :style="cssProps">
    <slot name="icon"></slot>
    <input
      ref="search"
      class="inputbar"
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @keydown.enter="$emit('enter', $event.target.value)"
    />
    <span class="underline"></span>
  </div>
</template>

<script>
export default {
  props: {
    textAlign: {
      type: String,
      default: "left"
    },
    hover: Boolean,
    value: String,
    placeholder: String,
    noUnderline: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  computed: {
    cssProps() {
      return {
        "--text-align": this.textAlign,
        "--transparent": this.hover ? 0 : 1,
        "--half-transparent": this.hover ? 0.5 : 1,
        "--width": this.$slots.icon ? "auto" : "100%",
        "--line-visible": this.noUnderline ? "hidden" : "visible",
        "--padding": this.noUnderline ? "0" : "8px"
      };
    }
  },
  methods: {
    focusInput() {
      this.$nextTick(() => {
        this.$refs.search.focus();
      });
    },
    test() {
      console.log();
    }
  },

  mounted() {
    this.input = this.$refs.search;
    this.container = this.$refs.container;
    if (this.hover) {
      this.input.onfocus = () => {
        this.input.focus();
        if (!this.container.classList.contains("active")) {
          this.container.classList.toggle("active");
        }
      };
      this.input.onblur = () => {
        if (!this.input.value) {
          this.container.classList.toggle("active");
        }
      };
    }
  }
};
</script>

<style scoped>
.input-container {
  position: relative;
  font-size: inherit;
  text-align: center;
  text-decoration: inherit;
}

.input-container .icon {
  font-size: inherit;
  opacity: var(--half-transparent);
  transition: all 0.5s;
  cursor: pointer;
}

.input-container .inputbar {
  background-color: transparent;
  color: inherit;
  border: none;
  font-size: inherit;
  padding: var(--padding);
  position: relative;
  text-align: var(--text-align);
  width: var(--width);
  text-decoration: inherit;
}

.inputbar::placeholder {
  color: inherit;
}

.input-container .inputbar:focus {
  outline: none;
}

.underline {
  width: 100%;
  height: 2px;
  border-bottom: 2px #fff solid;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: var(--transparent);
  transition: all 0.5s;
  visibility: var(--line-visible);
}

.input-container:hover .underline,
.input-container:hover .icon {
  opacity: var(--half-transparent);
}

.input-container.active .underline,
.input-container.active .icon {
  opacity: 1;
}
</style>
