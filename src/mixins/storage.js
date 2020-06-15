export default {
  methods: {
    save(key, payload) {
      localStorage.setItem(key, JSON.stringify(payload));
    },
    retrieve(key, parse) {
      const result = localStorage.getItem(key);
      if (result && parse) {
        return JSON.parse(result);
      } else if (!result) {
        return null;
      }
      return result;
    },
    delete(key) {
      localStorage.removeItem(key);
    },
  },
};
