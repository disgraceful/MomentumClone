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
      <div v-if="!loading">
        <i class="fas fa-sun fa-lg"></i>
        <span>{{ weatherDisplay }}&#176;</span>
      </div>
      <div v-if="!loading" class="location">{{ fullRegion }}</div>
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
      userRegion: "",
      userCountry: "",
      weather: null,
      icon: null,
      loading: false
    };
  },
  computed: {
    fullRegion() {
      return `${this.userRegion}, ${this.userCountry}`;
    },
    weatherDisplay() {
      if (this.weather) {
        return this.weather.toFixed(0);
      }
      return "";
    }
  },
  methods: {
    getUserCoords() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },

    async getLocation() {
      try {
        const result = await this.getUserCoords();
        const { latitude: lat, longitude: long } = result.coords;
        if (!this.compareCoords({ lat, long })) {
          await this.getCity({ lat, long });
        }
      } catch (error) {
        console.error(error);
        alert("Please enable geolocation!");
      }
    },

    async getCity({ lat, long }) {
      const url = `http://api.positionstack.com/v1/reverse?access_key=${process.env.VUE_APP_LOCATION_KEY}&query=${lat},${long}`;
      const response = await this.get(url);
      console.log(response);
      const region = response.body.data[0].region;
      const country = response.body.data[0].country;
      this.userRegion = region;
      this.userCountry = country;
      this.save("location", { lat, long, region, country });
      this.loading = false;
    },

    getSavedCoords() {
      return this.retrieve("location", true);
    },

    compareCoords({ lat, long }) {
      const location = this.getSavedCoords();
      if (!location) return false;
      this.userRegion = location.region;
      this.userCountry = location.country;
      const { lat: oldLat, long: oldLong } = location;

      return (
        oldLat.toFixed(5) === lat.toFixed(5) &&
        oldLong.toFixed(5) === long.toFixed(5)
      );
    },

    async getWeather() {
      const key = "a34211b02a664017b85de5ad919937f5";
      const { lat, long } = this.getSavedCoords();
      const response = await this.get(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${long}&key=${key}`
      );

      console.log(response);
      const weather = response.body.data[0];
      this.weather = weather.temp;
      this.icon = weather.weather;
      this.save("weather", {
        weather: this.weather,
        icon: this.icon,
        time: new Date().getTime()
      });
    },

    async retrieveWeather() {
      const weather = this.retrieve("weather", true);
      if (weather) {
        const timeDiff = new Date().getTime() - Number.parseInt(weather.time);
        const hourDiff = Number.parseInt(timeDiff) / (60 * 60 * 1000);
        if (hourDiff < 1) {
          this.weather = weather.weather;
          this.icon = weather.icon;
        }
        return;
      }
      await this.getWeather();
    }
  },
  async mounted() {
    this.loading = true;
    await this.getLocation();
    this.userRegion;
    await this.retrieveWeather();
    this.loading = false;
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
