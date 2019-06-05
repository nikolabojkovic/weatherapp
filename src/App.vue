<template>
  <div id="app" class="container-fluid">
    <Header />
    <Sidebar />
    <WeatherForm @searchSubmitted="search"
                 value="London"
                 type="city"
                 name="City"
                 placeholder="Enter city name"
                 buttonText="Search by city"/>
    <WeatherForm @searchSubmitted="search"
                 value="81925,de"
                 type='zipCode'
                 name='Zip code'
                 placeholder="Enter zip and country code"
                 buttonText="Search by zip code"/>
    <CurrentWeather ref="currentWeather"  />
    <Forecast ref="forecast" type='city'/>
    <Footer type='zipCode'/>
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
import store from './store/Store.vue'

Vue.use(BootstrapVue)

export default {
  name: 'app',
  store,
  components: {
    WeatherForm,
    CurrentWeather,
    Forecast,
    Header,
    Footer,
    Sidebar
  },
  methods: {
    search() {
      this.$refs.forecast.fetchData()
      this.$refs.currentWeather.fetchData()
    }
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
