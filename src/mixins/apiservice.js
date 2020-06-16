export default {
  methods: {
    get(url) {
      return this.$http.get(url);
    },
  },
};
