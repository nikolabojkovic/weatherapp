<template>
  <div> 
    <h4 class="mt-4 mb-4 text-uppercase">Current weather <span v-if="!isLoading && !currentWeatherError">{{ this.currentWeather.cityName }}</span> </h4>
    <Spinner v-if="isLoading" text="Loading current weather..."/>
    <div id="current-weather" v-if="!isLoading && !currentWeatherError">
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
    <div v-if="currentWeatherError">No data</div>
  </div>
</template>
<script>

import httpService from '../shared/services/httpService'
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
  props: {
    search: {}
  },
  watch: {
    search: function(val) {
      this.search = val
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.currentWeatherError = null
      this.isLoading = true;

      httpService.get(`weather/current?${this.search.type}=${this.search.value}`)
                  .then(response => { 
          this.currentWeather = response.data || []
          this.currentWeatherError = null   

          this.$store.commit('updateHistory', this.currentWeather)

          this.isLoading = false
      })
      .catch(error => {
          console.log(error)
          this.isLoading = false
          this.currentWeatherError = error;
      });
    }
  },
  computed: {
    history () {
      return this.$store.state.history
    }
  },
  mounted() {

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