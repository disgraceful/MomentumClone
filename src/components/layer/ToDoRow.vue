<template>
  <div class="li-container">
    <mc-checkbox v-model="todoModel.done" @input="editTodo()">
      <template v-slot:text>
        <div class="todo-text" v-show="!editMode">{{ todoModel.text }}</div>
        <div class="hidden-edit" v-show="editMode">
          <mc-input ref="editInput" no-underline v-model="todoModel.text" @enter="editTodo()"></mc-input>
        </div>
      </template>
    </mc-checkbox>

    <div class="hover-btn" @click="activateDialog($event)">
      <i class="fa fa-ellipsis-h fa-lg"></i>
    </div>
    <div class="dialog" v-show="dialogVisible">
      <ul>
        <li @click="activateEditing()">Edit</li>
        <hr />
        <li @click="deleteFnc(todo)">Delete</li>
      </ul>
    </div>
  </div>
</template>

<script>
import CheckboxVue from "../shared/Checkbox.vue";
import domutils from "../../mixins/domutils";
import { EventBus } from "../../eventbus";
import Input from "../shared/Input";
export default {
  props: {
    todo: Object,
    editFnc: Function,
    deleteFnc: Function
  },
  mixins: [domutils],
  components: {
    "mc-checkbox": CheckboxVue,
    "mc-input": Input
  },
  data() {
    return {
      liParent: null,
      dialogVisible: false,
      editMode: false,
      todoModel: { text: "", done: false }
    };
  },
  methods: {
    activateDialog() {
      this.liParent.classList.toggle("active");
      this.dialogVisible = !this.dialogVisible;
      this.$emit("activated", this.dialogVisible);
      EventBus.$emit("off", this);
      this.editMode = false;
    },

    activateEditing() {
      this.activateDialog();
      this.editMode = true;
      this.$refs.editInput.focusInput();
    },

    editTodo() {
      if (this.todoModel.text === "") {
        this.todoModel = this.todo;
      }
      this.editFnc(this.todoModel, this.todo);
      this.editMode = false;
    }
  },
  created() {
    this.$set(this.todoModel, "text", this.todo.text);
    this.$set(this.todoModel, "done", this.todo.done);
    EventBus.$on("off", event => {
      if (event !== this) {
        this.dialogVisible = false;
        this.editMode = false;
        this.liParent.classList.remove("active");
      }
    });
  },
  mounted() {
    const element = this.findDOMElement(this.$el, "li", true);
    if (element) {
      this.liParent = element;
    }
  }
};
</script>

<style scoped>
.li-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 16px;
  padding: 2px 20px;
}

.hidden-edit {
  font-size: 16px;
}

.todo-text {
  font-size: 16px;
}
.hover-btn {
  opacity: 0;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
}

.todo-list > li:hover .hover-btn {
  opacity: 0.6;
}

.todo-list > li:hover .hover-btn:hover,
.todo-list > li.active .hover-btn {
  opacity: 1;
}

.todo-list > li:hover .hover-btn:hover {
  background-color: rgba(224, 224, 224, 0.3);
}

.dialog {
  position: absolute;
  top: 1px;
  right: 50px;
  width: 100px;
  display: flex;
  background-color: rgba(50, 50, 50);
  border-radius: 5px;
  z-index: 10;
  transition: all 1s ease;
}

.dialog ul {
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
}
.dialog li {
  display: flex;
  font-size: 16px;
  padding: 7px 12px;
}

.dialog li:hover {
  background-color: rgba(255, 255, 255, 0.15);
  cursor: pointer;
}
</style>
