<template>
  <div class="fab-btn" :style="cssProps">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    fontSize: String
  },
  computed: {
    cssProps() {
      return {
        "--font-size": this.fontSize
      };
    }
  }
};
</script>

<style scoped>
.fab-btn {
  display: flex;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.5s;
  cursor: pointer;
}

.fab-btn > * {
  min-width: var(--font-size);
  font-size: var(--font-size);
  text-align: left;
  letter-spacing: normal;
}

.fab-btn:hover {
  opacity: 1 !important;
  background-color: rgba(224, 224, 224, 0.5);
  border-radius: 50%;
}
</style>
