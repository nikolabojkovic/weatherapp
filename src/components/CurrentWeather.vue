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
          history: []
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

          this.history = [{
            city: this.currentWeather.cityName,
            temperature: this.currentWeather.temperature,
            humidity: this.currentWeather.humidity
          }, ...this.getHistory() ]
          localStorage.setItem('history', JSON.stringify(this.history));
          this.$emit('update-history', {})  

          this.isLoading = false
      })
      .catch(error => {
          console.log(error)
          this.isLoading = false
          this.currentWeatherError = error;
      });
    },
    getHistory() {
      if (localStorage.getItem('history') != null && JSON.parse(localStorage.getItem('history')).length != 0) {
        return JSON.parse(localStorage.getItem('history'))
      }

      return []
    }
  },
  mounted() {
    this.history = this.getHistory()
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