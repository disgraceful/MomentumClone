// import axios from "axios";
export default {
  methods: {
    async get(url) {
      return await this.$http.get(url);
      //   const result = await axios.get(url, {
      //     crossdomain: true,
      //     mode: "no-cors",
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
      //       "Access-Control-Allow-Headers":
      //         "Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type",
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   console.log(result);
      //   return result;
    },
  },
};
