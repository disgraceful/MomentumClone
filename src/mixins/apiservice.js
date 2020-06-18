export default {
  methods: {
    get(url, params) {
      return this.$http.get(url, params);
    },
  },
};
