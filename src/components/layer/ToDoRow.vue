<template>
  <div class="li-container">
    <mc-checkbox>
      <template v-slot:text>
        <div class="todo-text">{{ todo }}</div>
      </template>
    </mc-checkbox>
    <div class="hover-btn" @click="activateDialog($event)">
      <i class="fa fa-ellipsis-h fa-lg"></i>
    </div>
    <div class="dialog" v-show="dialogVisible">
      <ul>
        <li>Edit</li>
        <hr />
        <li>Delete</li>
      </ul>
    </div>
  </div>
</template>

<script>
import CheckboxVue from "../shared/Checkbox.vue";
import domutils from "../../mixins/domutils";
import { EventBus } from "../../eventbus";
export default {
  props: {
    todo: String,
    active: { type: Boolean, default: false }
  },
  mixins: [domutils],
  components: { "mc-checkbox": CheckboxVue },
  data() {
    return {
      liParent: null,
      dialogVisible: false
    };
  },
  methods: {
    activateDialog() {
      this.liParent.classList.toggle("active");
      this.dialogVisible = !this.dialogVisible;
      this.$emit("activated", this.dialogVisible);
      EventBus.$emit("off", this);
    }
  },
  mounted() {
    const element = this.findDOMElement(this.$el, "li", true);
    if (element) {
      this.liParent = element;
    }

    EventBus.$on("off", event => {
      if (event !== this && this.dialogVisible) {
        this.dialogVisible = false;
        this.liParent.classList.toggle("active");
      }
    });
  }
};
</script>

<style scoped>
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
