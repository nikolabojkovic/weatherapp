<template>
  <div id="app" class="container-fluid">
    <Header @toggle-button-pressed="toggle"/>
    <Sidebar :toggle="toggleSidebar" :history="history"/>
    <WeatherForm :value="searchCityValue" 
                 @updated-input-value="updateSearchCityValue"
                 placeholder="Enter city name"
                 buttonText="Search by city"/>
    <WeatherForm :value="searchZipCodeValue" 
                 @updated-input-value="updateSearchZipCodeValue"
                 placeholder="Enter zip and country code"
                 buttonText="Search by zip code"/>
    <CurrentWeather :search="search" @update-history="updateHistory" />
    <Forecast :search="search"/>
    <Footer/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import WeatherForm from './components/WeatherForm.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import Forecast from './components/Forecast.vue'
import Header from './components/shared/Header.vue'
import Footer from './components/shared/Footer.vue'
import Sidebar from './components/shared/Sidebar.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

export default {
  name: 'app',
  data() {
    return {
      toggleSidebar: false,
      history: [],
      searchCityValue: "London",
      searchZipCodeValue: "81925,de",
      search: {
        type: 'city',
        value: 'London'
      }
    }
  },
  components: {
    WeatherForm,
    CurrentWeather,
    Forecast,
    Header,
    Footer,
    Sidebar
  },
  methods: {
    toggle(toggleEvent) {
      this.toggleSidebar = toggleEvent
    },
    updateHistory() {
      this.history = JSON.parse(localStorage.getItem('history'))
    },
    updateSearchCityValue(newValue) {
      this.searchCityValue = newValue
      this.search = {
        type: 'city',
        value: newValue
      }
    },
    updateSearchZipCodeValue(newValue) {
      this.searchZipCodeValue = newValue
      this.search = {
        type: 'zipCode',
        value: newValue
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
