<template>
  <div class="lower-row">
    <div class="question">What is your focus for today?</div>
    <div>
      <mc-input text-align="center"></mc-input>
    </div>
    <div class="focus"></div>
  </div>
</template>

<script>
import Input from "./shared/Input";
export default { components: { "mc-input": Input } };
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
  font-size: 36px;
}
</style>
