<script>

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: []
  },
  mutations: {
    updateHistory (state, currentWeather) {
        var historyFromStorage = []
        if (localStorage.getItem('history') != null && JSON.parse(localStorage.getItem('history')).length != 0) {
            historyFromStorage = JSON.parse(localStorage.getItem('history'))
        }

        state.history = [{
            city: currentWeather.cityName,
            temperature: currentWeather.temperature,
            humidity: currentWeather.humidity
        }, ...historyFromStorage]

       localStorage.setItem('history', JSON.stringify(state.history));
    },
    claerHistory (state) {
        state.history = []
        localStorage.removeItem('history')
    },
    initHistory(state) {
        var historyFromStorage = []
        if (localStorage.getItem('history') != null && JSON.parse(localStorage.getItem('history')).length != 0) {
            historyFromStorage = JSON.parse(localStorage.getItem('history'))
        }

        state.history = historyFromStorage
    }
  }
})
</script>