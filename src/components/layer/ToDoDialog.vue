<template>
  <div class="todo-body" :style="cssProps">
    <div class="todo-header">Today</div>
    <div class="todo-container">
      <ul class="todo-list" v-if="!todoEmpty">
        <li v-for="todo in todos" :key="todo">
          <mc-checkbox>
            <template v-slot:text>
              <div class="todo-text">{{ todo }}</div>
            </template>
          </mc-checkbox>
        </li>
      </ul>
      <div class="add-todo" v-else>
        <div>Add a todo to get started</div>
        <div class="btn" @click="inputVisible = true">New Todo</div>
      </div>
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
    return { newTodo: "", todos: ["code", "book"], inputVisible: false };
  },
  computed: {
    todoEmpty() {
      return this.todos.length <= 0;
    },

    cssProps() {
      return {
        "--display": this.visible ? "block" : "none",
        "--visibility": this.inputVisible ? "visible" : "hidden",
        "--invisible": !this.inputVisible ? "visible" : "hidden"
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
    },

    retrieveTodos() {
      const todos = this.retrieve("todos", true);
      this.todos = todos ? todos : [];
      const now = new Date();
      const midnight = this.midnightReset();
      if (now.getTime() > midnight) {
        this.todos = [];
      }
      console.log(this.todos);
    },

    midnightReset() {
      let todoResetTime = this.retrieve("resetTime");
      if (!todoResetTime) {
        const now = new Date();
        console.log(now);
        const midnight = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          24
        );
        todoResetTime = midnight.getTime();
        this.save("resetTime", todoResetTime);
      }
      return todoResetTime;
    }
  },
  mounted() {
    this.retrieveTodos();
    if (!this.todoEmpty) {
      this.$emit("filled");
      this.inputVisible = true;
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

.add-todo {
  display: flex;
  flex-direction: column;
  height: 150px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
}

.add-todo > div {
  padding: 8px;
  font-size: 16px;
}

.add-todo > .btn {
  background-color: rgba(224, 224, 224, 0.5);
  border-radius: 50px;
  padding: 6px 16px;
  cursor: pointer;
  visibility: var(--invisible);
}

.btn:hover {
  background-color: rgba(224, 224, 224, 0.7);
}

.todo-list > li {
  font-size: 16px;
  padding: 5px;
}

.todo-footer div {
  font-size: 16px;
  visibility: var(--visibility);
}

.todo-text {
  font-size: 16px;
}
</style>
