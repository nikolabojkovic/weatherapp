<template>
  <div id="app" class="container-fluid">
    <Header @toggle-button-pressed="toggle"/>
    <Sidebar :toggle="toggleSidebar" :history="history"/>
    <Weather @update-history="updateHistory"/>
    <Footer/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Weather from './components/Weather.vue'
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
      history: []
    }
  },
  components: {
    Weather,
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
