export default {
  data() {
    return {
      hours: 0,
      minutes: 0,
    };
  },
  computed: {
    time24() {
      return `${this.format(this.hours)}:${this.format(this.minutes)}`;
    },
    time12() {
      let timePart = "AM";
      if (this.hours > 12) {
        timePart = "PM";
        this.hours -= 12;
      }
      return `${this.format(this.hours)}:${this.format(
        this.minutes
      )} ${timePart}`;
    },
  },
  methods: {
    getCurTime() {
      const date = new Date();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
    },
    format(time) {
      if (time < 1) {
        return "00";
      } else if (time < 10) {
        return `0${time}`;
      }
      return time;
    },
  },
  created() {
    this.getCurTime();
    setInterval(this.getCurTime, 100);
  },
};
