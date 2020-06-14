<template>
  <div class="lower-row">
    <div class="question">What is your focus for today?</div>
    <div>
      <input type="text" />
    </div>
    <div class="focus"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.lower-row {
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.lower-row > div {
  font-size: 28px;
}
</style>
