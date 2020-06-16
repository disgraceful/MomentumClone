<template>
  <div class="footer-row">
    <div class="img-info">Beautiful nature picture</div>
    <div class="quote">
      <div v-if="!loading" class="quote-text">{{ quote.text }}</div>
      <div v-if="!loading" class="quote-author">{{ quote.author }}</div>
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
      loading: true,
      quote: null
    };
  },
  computed: {
    isQuote() {
      return this.quote.text !== null;
    }
  },
  methods: {
    async getDailyQuote() {
      const quoteSave = this.retrieve("quote", true);
      console.log(quoteSave);
      if (quoteSave) {
        const timeDiff = Math.abs(new Date().getTime() - quoteSave.date);
        const hourDiff = timeDiff / (60 * 60 * 1000);
        console.log(hourDiff);
        if (hourDiff < 24) {
          this.quote = {};
          this.quote.text = quoteSave.text;
          this.quote.author = quoteSave.author;
        }
        return;
      }
      await this.requestQuote();
    },

    async requestQuote() {
      try {
        const result = await this.get("http://localhost:8080/api/quotes");
        const dailyQuote = this.selectRandomQuote(result.body);
        this.quote = {};
        this.quote.text = dailyQuote.text;
        this.quote.author = dailyQuote.author ? dailyQuote.author : "Unknown";
        this.saveQuote(this.quote);
      } catch (error) {
        this.quote.text =
          "Sometimes it's hard to fall, but even harder to fallback";
        this.quote.author = "Unknown";
        console.log(error);
      }
    },

    selectRandomQuote(quoteArray) {
      return quoteArray[Math.floor(Math.random() * quoteArray.length)];
    },

    saveQuote(quote) {
      this.save("quote", {
        text: quote.text,
        author: quote.author,
        date: new Date().getTime()
      });
    }
  },
  async mounted() {
    this.loading = true;
    await this.getDailyQuote();
    this.loading = false;
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
