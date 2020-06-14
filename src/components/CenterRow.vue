<template>
  <div class="center-row">
    <div class="time">12:52</div>
    <div class="quote">Very profound quote</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.center-row {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  text-align: center;
  justify-content: center;
  align-content: center;
  user-select: none;
}

.center-row .time {
  font-size: 1500%;
  font-weight: 500;
  letter-spacing: -5px;
}

.center-row .quote {
  font-size: 400%;
}
</style>
