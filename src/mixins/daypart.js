export default {
  methods: {
    getDayPart() {
      const hours = new Date().getHours();
      switch (true) {
        case hours >= 5 && hours < 12:
          return "morning";
        case hours >= 12 && hours < 18:
          return "afternoon";
        case hours >= 18 && hours < 23:
          return "evening";
        default:
          return "night";
      }
    },
  },
};
