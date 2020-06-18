<template>
  <div id="bg" :style="cssProps"></div>
</template>

<script>
import storage from "../../mixins/storage";
import apiservice from "../../mixins/apiservice";
export default {
  mixins: [storage, apiservice],
  data() {
    return {
      image: null,
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
        "stars",
        "cliff",
        "sea"
      ]
    };
  },
  computed: {
    cssProps() {
      return {
        "--bg-url": `url(${
          this.image ? this.image.url : "../../img/test-bg.jpg"
        })`
      };
    }
  },
  methods: {
    getRandomImgQuery() {
      return this.imgQueries[
        Math.floor(Math.random() * this.imgQueries.length)
      ];
    },

    async retrieveImage() {
      const response = await this.get(
        `https://api.pexels.com/v1/search?query=${this.getRandomImgQuery()}&per_page=5`,
        {
          headers: {
            Authorization: process.env.VUE_APP_IMG_KEY
          }
        }
      );
      console.log(response);
      const allImages = response.body.photos;
      const selectedImage =
        allImages[Math.floor(Math.random() * allImages.length)];
      this.image = {
        author: selectedImage.photographer,
        url: selectedImage.src.landscape
      };

      console.log(this.image);
    }
  },
  async created() {
    await this.retrieveImage();
    this.$emit("loaded");
  }
};
</script>
<style scoped>
#bg {
  background-image: var(--bg-url);
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
