<template>
  <div id="bg" :style="cssProps">
    <img v-if="image" style="opacity:0" :src="this.image.url" @load="$emit('loaded')" />
  </div>
</template>

<script>
import storage from "../../mixins/storage";
import apiservice from "../../mixins/apiservice";
import daypart from "../../mixins/daypart";
export default {
  mixins: [storage, apiservice, daypart],
  data() {
    return {
      image: null,
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
        "cliff",
        "sea"
      ],
      nightQueries: [
        "stars",
        "dark forest",
        "night city",
        "evening",
        "sunfall"
      ],
      morningQueries: ["sunrise", "meadow", "morning", "dawn"]
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
      const queryArray = this.getDailyQueries();
      return queryArray[Math.floor(Math.random() * queryArray.length)];
    },

    getImageOrientation(image) {
      return image.width > image.height;
    },

    getDailyQueries() {
      const dayPart = this.getDayPart();
      if (dayPart === "morning") {
        return this.morningQueries;
      } else if (dayPart === "afternoon") {
        return this.imgQueries;
      } else {
        return this.nightQueries;
      }
    },

    async retrieveImage() {
      const query = this.getRandomImgQuery();
      const response = await this.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
        {
          headers: {
            Authorization: process.env.VUE_APP_IMG_KEY
          }
        }
      );
      const allImages = response.body.photos;

      const landscapeImages = allImages.filter(image =>
        this.getImageOrientation(image)
      );
      const selectedImage =
        landscapeImages[Math.floor(Math.random() * landscapeImages.length)];
      this.image = {
        author: selectedImage.photographer,
        url: selectedImage.src.original
      };

      this.save("img", { query, author: selectedImage.photographer });
    }
  },
  async created() {
    await this.retrieveImage();
  }
};
</script>
<style scoped>
#bg {
  background-image: var(--bg-url);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
