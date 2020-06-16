<template>
  <div class="footer-row">
    <div class="img-info">Beautiful nature picture</div>
    <div v-if="quote" class="quote">
      <div class="quote-text">{{ quote.text }}</div>
      <div class="quote-author">{{ quote.author }}</div>
    </div>
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
      quote: null,
      showAuthor: false
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
    },

    show() {
      console.log("Showing");
      this.showAuthor = !this.showAuthor;
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
.quote {
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  position: relative;
  transition: all 0.5s ease;
}

.quote-author {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
}

.quote:hover .quote-author {
  opacity: 0.8;
}

.quote:hover .quote-text {
  transform: translateY(-28px);
}

.quote > div {
  font-size: inherit;
  transition: all 0.5s ease;
}

.footer-row > div {
  display: flex;
}

.img-info,
.todo {
  flex: 0 0 200px;
  align-self: flex-end;
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
