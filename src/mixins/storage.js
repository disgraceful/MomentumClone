export default {
  methods: {
    save(key, payload) {
      localStorage.setItem(key, JSON.stringify(payload));
    },
    retrieve(key) {
      return JSON.parse(localStorage.getItem(key));
    },
  },
};
