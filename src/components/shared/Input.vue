<template>
  <div ref="container" class="input-container" :style="cssProps">
    <slot name="icon"></slot>
    <input ref="search" class="inputbar" type="text" />
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
    hover: Boolean
  },
  data() {
    return {};
  },
  computed: {
    cssProps() {
      return {
        "--text-align": this.textAlign,
        "--transparent": this.hover ? 0 : 1,
        "--half-transparent": this.hover ? 0.5 : 1
      };
    }
  },
  methods: {},
  mounted() {
    console.log(this);
    this.input = this.$refs.search;
    this.container = this.$refs.container;
    this.input.onfocus = () => {
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
};
</script>

<style scoped>
.input-container {
  position: relative;
  font-size: inherit;
  text-align: center;
}

.input-container .icon {
  font-size: inherit;
  opacity: var(--half-transparent);
  transition: all 0.5s;
}

.input-container .inputbar {
  background-color: transparent;
  color: inherit;
  border: none;
  font-size: inherit;
  padding: 8px;
  position: relative;
  text-align: var(--text-align);
  max-width: 100%;
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
}

.input-container:hover .underline,
.input-container:hover .icon {
  opacity: var(--half-transparent);
}

.input-container.active .underline,
.input-container.active .icon {
  opacity: 1;
}

.input-container:not(.active):hover .underline {
  opacity: 0.5;
}
</style>
