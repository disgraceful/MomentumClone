export default {
  methods: {
    getIcon(iconcode) {
      if (iconcode < 300 && iconcode >= 200) {
        return "Z"; //thunderstorm
      } else if (iconcode < 500 && iconcode >= 300) {
        return "X"; //drizzle
      } else if (iconcode < 600 && iconcode >= 500) {
        return "R"; //rain
      } else if (iconcode < 700 && iconcode >= 600) {
        return "W"; //snow
      } else if (iconcode < 800 && iconcode >= 700) {
        return "L"; //mist
      } else if (iconcode === 800) {
        return "B";
      } else if (iconcode < 600 && iconcode >= 500) {
        return "R";
      } else {
        return "Y";
      }
    },
  },
};
