<template>
  <div class="footer-row">
    <div class="img-info">Beautiful nature picture</div>
    <div class="secondary-quote">This is very profound secondary quote</div>
    <div class="todo">
      <span>Todo</span>
      <div class="todo-body"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-row {
  display: flex;
  flex: 0 1 auto;
  padding: 10px 15px;
}
.secondary-quote {
  font-size: 22px;
  text-align: center;
  flex: 1 1 auto;
  justify-content: center;
}

.footer-row > div {
  display: flex;
}
.img-info,
.todo {
  flex: 0 0 200px;
}

.todo {
  justify-content: flex-end;
}

.todo > span {
  font-size: 22px;
}

.img-info {
  font-size: 18px;
}
</style>
