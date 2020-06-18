<template>
  <div id="bg"></div>
</template>


<script>
import storage from "../../mixins/storage";
import apiservice from "../../mixins/apiservice";
export default {
  mixins: [storage, apiservice],
  data() {
    return {
      imageUrl: "",
      imgQueries: [
        "nature",
        "forest",
        "ocean",
        "mountain",
        "waterfall",
        "lake",
        "river",
        "valley",
        "sky",
        "stars"
      ]
    };
  },
  methods: {
    getRandomImgQuery() {
      return this.imgQueries[
        Math.floor(Math.random() * this.imgQueries.length)
      ];
    },

    async retrieveImage() {
      const response = await this.get(
        `https://api.pexels.com/v1/search?query=${this.getRandomImgQuery()}`,
        {
          headers: {
            Authorization: process.env.VUE_APP_IMG_KEY
          }
        }
      );
      console.log(response);
    }
  },
  async created() {
    await this.retrieveImage();
  }
};
</script>
<style scoped>
#bg {
  background-image: url("../../img/test-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-color: #464646;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
}
</style>
