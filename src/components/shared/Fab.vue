<template>
  <div class="fab-btn" :style="cssProps">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    fontSize: String,
    small: Boolean,
    medium: { type: Boolean, default: true },
    large: Boolean
  },
  computed: {
    cssProps() {
      return {
        "--font-size": this.fontSize,
        "--padding": this.getPadding
      };
    },
    getPadding() {
      if (this.small) {
        return "5px";
      } else if (this.large) {
        return "14px";
      } else {
        return "8px";
      }
    }
  }
};
</script>

<style scoped>
.fab-btn {
  display: flex;
  padding: var(--padding);
  opacity: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.5s;
  /* background-color: rgba(224, 224, 224, 0.5); */
}

.fab-btn > * {
  border-radius: 50%;
  min-width: var(--font-size);
  min-height: var(--font-size);
  font-size: var(--font-size);
  text-align: center;
  letter-spacing: normal;
}

.fab-btn:hover {
  opacity: 1 !important;
  background-color: rgba(224, 224, 224, 0.5);
}
</style>
