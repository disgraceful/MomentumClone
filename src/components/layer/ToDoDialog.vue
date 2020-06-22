<template>
  <div class="todo-body" :style="cssProps">
    <div class="todo-header">Today</div>
    <div class="todo-container">
      <ul class="todo-list" v-if="!todoEmpty">
        <li v-for="todo in todos" :key="todo.text">
          <mc-todo-row
            :todo="todo"
            :deleteFnc="deleteTodo.bind(this)"
            :editFnc="editTodo.bind(this)"
            @activated="dialogActive = $event"
          ></mc-todo-row>
        </li>
      </ul>
      <div class="add-todo" v-else>
        <div>Add a todo to get started</div>
        <div class="btn" @click="todoVisible()">New Todo</div>
      </div>
    </div>
    <div class="todo-footer">
      <mc-input
        ref="input"
        v-model="newTodo"
        @enter="saveTodo()"
        placeholder="New Todo"
        no-underline
      ></mc-input>
    </div>
  </div>
</template>

<script>
import Input from "../shared/Input";
import storage from "../../mixins/storage";
import ToDoRowVue from "./ToDoRow.vue";
export default {
  props: {
    visible: Boolean
  },
  mixins: [storage],
  components: {
    "mc-input": Input,
    "mc-todo-row": ToDoRowVue
  },
  data() {
    return {
      newTodo: "",
      todos: [],
      inputVisible: false,
      dialogActive: false
    };
  },
  computed: {
    todoEmpty() {
      return this.todos.length <= 0;
    },

    cssProps() {
      return {
        "--display": this.visible ? "block" : "none",
        "--visibility": this.inputVisible ? "visible" : "hidden",
        "--invisible": !this.inputVisible ? "visible" : "hidden",
        "--height": this.dialogActive ? "150px" : "0"
      };
    }
  },
  methods: {
    todoVisible() {
      this.inputVisible = true;
      this.$refs.input.focusInput();
    },

    saveTodo() {
      if (this.newTodo !== null && this.newTodo !== "") {
        this.todos.push({ text: this.newTodo, done: false });
        this.save("todos", this.todos);
        this.newTodo = "";
      }
    },

    retrieveTodos() {
      const todos = this.retrieve("todos", true);
      this.todos = todos ? todos : [];

      let todoResetTime = this.retrieve("resetTime");
      if (!todoResetTime) {
        todoResetTime = this.midnightReset();
      }

      const now = new Date();
      if (now.getTime() > todoResetTime) {
        this.todos = [];
        this.midnightReset();
      }
    },

    editTodo(newTodo, oldTodo) {
      let index = 0;
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].text === oldTodo.text) index = i;
      }
      this.todos.splice(index, 1, newTodo);
      this.save("todos", this.todos);
    },

    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t.text !== todo.text);
      this.save("todos", this.todos);
      this.dialogActive = false;
      if (this.todos.length <= 0) {
        this.inputVisible = false;
      }
    },

    midnightReset() {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        24
      );
      const todoResetTime = midnight.getTime();
      this.save("resetTime", todoResetTime);
      return todoResetTime;
    },

    calcDate(time) {
      const date = new Date(time);
      console.log(date.getDate());
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
  background-color: rgba(0, 0, 0, 0.95);
  display: var(--display);
  padding: 10px 0;
  border-radius: 10px;
}

.todo-footer::after {
  content: "";
  position: absolute;
  background-color: rgba(0, 0, 0, 0.95);
  width: 14px;
  height: 14px;
  bottom: -7px;
  right: 14px;
  transform: rotate(45deg);
}

.todo-header {
  font-size: 20px;
  padding: 0 20px;
}

.todo-container {
  padding-top: 5px;
  min-height: var(--height);
  transition: min-height 1s;
}

.todo-container ul {
  list-style: none;
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

.todo-list > li.active {
  background-color: rgba(50, 50, 50, 0.6);
}

.todo-footer div {
  font-size: 16px;
  visibility: var(--visibility);
  padding: 0 20px;
  padding-top: 10px;
}

.todo-text {
  font-size: 16px;
}
</style>
