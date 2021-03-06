<template>
  <div class="weather-container">
    <div v-if="!loading">
      <div class="weather-icon" href :weather-icon="tempIcon"></div>
      <div class="temp">{{ temperature }}&#176;</div>
    </div>
    <div v-if="!loading" class="location">{{ fullRegion }}</div>
  </div>
</template>

<script>
import apiservice from "../../mixins/apiservice";
import storage from "../../mixins/storage";
import tempicons from "../../mixins/tempicons";
export default {
  mixins: [apiservice, storage, tempicons],
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

    temperature() {
      if (this.weather) {
        return this.weather.toFixed(0);
      }
      return "";
    },

    tempIcon() {
      if (this.icon) {
        return this.getIcon(this.icon);
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
      const region = response.body.data[0].region;
      const country = response.body.data[0].country;
      this.userRegion = region;
      this.userCountry = country;
      this.save("location", { lat, long, region, country });
      this.loading = false;
    },

    compareCoords({ lat, long }) {
      const location = this.retrieve("location", true);
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
      const { lat, long } = this.retrieve("location", true);
      const response = await this.get(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${long}&key=${process.env.VUE_APP_WEATHER_KEY}`
      );

      console.log(response);
      const weather = response.body.data[0];
      this.weather = weather.temp;
      this.icon = weather.weather.code;
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
        } else {
          await this.getWeather();
        }
      } else {
        await this.getWeather();
      }
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
.weather-container {
  display: flex;
  flex-direction: column;
  text-align: end;
}

.weather-container > div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.temp {
  font-size: 28px;
}

.weather-container .location {
  font-size: 18px;
  margin-top: -5px;
}

.weather-icon {
  display: inline-block;
  font-size: 40px;
  padding: 0 5px;
}

.weather-icon::before {
  font-family: "MeteoconsRegular";
  color: #fff;
  content: attr(weather-icon);
}
</style>
