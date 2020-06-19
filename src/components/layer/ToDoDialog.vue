<template>
  <div class="todo-body" :style="cssProps">
    <div class="todo-header">Today</div>
    <div class="todo-container">
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo">{{todo}}</li>
      </ul>
    </div>
    <div class="todo-footer">
      <mc-input placeholder="New Todo"></mc-input>
    </div>
  </div>
</template>

<script>
import Input from "../shared/Input";
export default {
  props: {
    visible: Boolean
  },
  components: { "mc-input": Input },
  data() {
    return { todos: ["code", "book"] };
  },
  computed: {
    todoEmpty() {
      return this.todos.length <= 0;
    },

    cssProps() {
      return {
        "--display": this.visible ? "block" : "none"
      };
    }
  },
  mounted() {
    if (!this.todoEmpty) {
      this.$emit("filled");
    }
  }
};
</script>

<style scoped>
.todo-body {
  position: absolute;
  max-height: 250px;
  width: 300px;
  bottom: 45px;
  background-color: rgba(0, 0, 0, 0.9);
  display: var(--display);
  padding: 10px 20px;
}

.todo-body div {
  font-size: 20px;
}

.todo-list {
  list-style: none;
}

.todo-container {
  padding-top: 5px;
}

.todo-list > li {
  font-size: 16px;
  padding: 5px;
}

.todo-footer div {
  font-size: 16px;
}
</style>
