<template>
  <div class="top-row">
    <div>
      <div class="search-wrapper">
        <mc-input hover>
          <template v-slot:icon>
            <i class="fas fa-search fa-lg icon"></i>
          </template>
        </mc-input>
      </div>
    </div>
    <div class="weather-container">
      <div v-if="userRegion">
        <i class="fas fa-sun fa-lg"></i>
        <span>31&#176;</span>
      </div>
      <div class="location">{{ userRegion }}</div>
    </div>
  </div>
</template>

<script>
import Input from "./shared/Input";
import apiservice from "../mixins/apiservice";
import storage from "../mixins/storage";
export default {
  mixins: [apiservice, storage],
  components: { "mc-input": Input },
  data() {
    return {
      input: null,
      container: null,
      userRegion: ""
    };
  },
  watch: {},
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(result => {
        const { latitude: lat, longitude: long } = result.coords;
        console.log(lat, long);
        if (!this.compareCoords({ lat, long })) {
          this.getCity({ lat, long });
        }
        console.log(this.userRegion);
      });
    },

    getCity({ lat, long }) {
      const url = `http://api.positionstack.com/v1/reverse?access_key=${process.env.VUE_APP_LOCATION_KEY}&query=${lat},${long}`;
      this.get(url).then(response => {
        console.log(response);
        const region = response.body.data[0].region;
        const country = response.body.data[0].country;
        this.userRegion = `${region}, ${country}`;
        this.save("location", { lat, long, region: this.userRegion });
      });
    },

    compareCoords({ lat, long }) {
      const location = this.retrieve("location", true);
      if (!location) return false;
      this.userRegion = location.region;
      const { lat: oldLat, long: oldLong } = location;

      return (
        oldLat.toFixed(5) === lat.toFixed(5) &&
        oldLong.toFixed(5) === long.toFixed(5)
      );
    }
  },
  mounted() {
    this.getLocation();
  }
};
</script>

<style scoped>
.top-row {
  display: flex;
  flex: 0 1 auto;
}

.top-row > div {
  flex: 1 1 50%;
  padding: 10px 15px;
}

.top-row .weather-container {
  display: flex;
  flex-direction: column;
  text-align: end;
}

.top-row .weather-container * {
  font-size: 28px;
}

.weather-container .location {
  font-size: 18px;
}

.weather-container i {
  padding: 0 10px;
}

.top-row > div > .search-wrapper {
  position: relative;
  display: inline-block;
  font-size: 20px !important;
}
</style>
