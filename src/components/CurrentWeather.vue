<template>
  <div> 
    <h4 class="mt-4 mb-4 text-uppercase">Current weather </h4>
    <Spinner v-if="isLoading" text="Loading current weather..."/>
    <div id="current-weather" v-if="!isLoading && !currentWeatherError">
      <h4 class="text-uppercase font-weight-bolder">{{ this.currentWeather.cityName }}</h4>
      <div class="temp-container">
        <img width="170" height="170" v-bind:src="'http://openweathermap.org/img/w/' + currentWeather.icon + '.png'"/>
        <span id="temperature">
          <span>{{ Math.round(this.currentWeather.temperature) }} </span>
          <span class="temp-scale">°C</span>
        </span>
       </div>
      <div>       
        <div>Humidity {{ this.currentWeather.humidity }} % </div>
        <div>Wind speed {{ this.currentWeather.windSpeed }} m/s </div>
      </div>
    </div>
    <div v-if="currentWeatherError">{{ currentWeatherError.message }}</div>
  </div>
</template>
<script>

import api from '../shared/services/api'
import Spinner from './shared/Spinner'

export default {
  name: 'CurrentWeather',
  components: {
    Spinner
  },
  data() {
      return { 
          isLoading: Boolean,
          currentWeather: {},
          currentWeatherError: null,
      }
  },
  methods: {
    fetchData() {
      this.currentWeatherError = null
      this.isLoading = true;

      api.get(`weather/current?${this.search.type}=${this.search.value}`).then(response => { 
          this.currentWeather = response.data || []
          this.currentWeatherError = null   

          this.$store.commit('updateHistory', this.currentWeather)

          this.isLoading = false
      })
      .catch(error => {
          console.log(error.response.data)
          this.isLoading = false
          this.currentWeatherError = error.response.data;
      });
    }
  },
  computed: {
    search() {
      return this.$store.state.search
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
<style>
  #temperature {
    font-size: 52px;
    position: relative;
    right: 10px;
  }

  .temp-scale {
    font-size: 24px;
    position: relative;
    bottom: 20px;
    right: 15px;
  }
</style>