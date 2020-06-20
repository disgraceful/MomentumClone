<template>
  <div class="todo-body" :style="cssProps">
    <div class="todo-header">Today</div>
    <div class="todo-container">
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo">
          <mc-checkbox>
            <template v-slot:text>
              <div class="todo-text">{{ todo }}</div>
            </template>
          </mc-checkbox>
        </li>
      </ul>
    </div>
    <div class="todo-footer">
      <mc-input v-model="newTodo" @enter="saveTodo()" placeholder="New Todo" no-underline></mc-input>
    </div>
  </div>
</template>

<script>
import Input from "../shared/Input";
import Checkbox from "../shared/Checkbox";
import storage from "../../mixins/storage";
export default {
  props: {
    visible: Boolean
  },
  mixins: [storage],
  components: { "mc-input": Input, "mc-checkbox": Checkbox },
  data() {
    return { newTodo: "", todos: ["code", "book"] };
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
  methods: {
    saveTodo() {
      if (this.newTodo !== null && this.newTodo !== "") {
        this.todos.push(this.newTodo);
        this.save("todos", this.todos);
        this.newTodo = "";
      }
    }
  },
  mounted() {
    const todos = this.retrieve("todos", true);
    this.todos = todos ? todos : [];
    console.log(this.todos);
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
  background-color: rgba(0, 0, 0, 0.85);
  display: var(--display);
  padding: 10px 20px;
}

.todo-header {
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
.todo-text {
  font-size: 16px;
}
</style>
