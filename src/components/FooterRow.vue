<template>
  <div class="footer-row">
    <div class="img-info">Beautiful nature picture</div>
    <div v-show="quote" class="secondary-quote">{{ quote.text }}</div>
    <div class="todo">
      <span>Todo</span>
      <div class="todo-body"></div>
    </div>
  </div>
</template>

<script>
import apiservice from "../mixins/apiservice";
import storage from "../mixins/storage";
export default {
  mixins: [apiservice, storage],
  data() {
    return {
      quote: null
    };
  },
  methods: {
    async getDailyQuote() {
      try {
        const result = await this.get("http://localhost:8080/api/quotes");
        const dailyQuote = this.selectRandomQuote(result.body);
        this.quote = {};
        this.quote.text = dailyQuote.text;
        this.quote.author = dailyQuote.author;
      } catch (error) {
        console.log(error);
      }
    },

    selectRandomQuote(quoteArray) {
      return quoteArray[Math.floor(Math.random() * quoteArray.length)];
    }
  },
  async created() {
    await this.getDailyQuote();
  }
};
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
