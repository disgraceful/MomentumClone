// import axios from "axios";
export default {
  methods: {
    async get(url) {
      return await this.$http.get(url);
    },
  },
};
