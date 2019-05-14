<script>

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideBarVisible: false,
    history: [],
    search: {
        type: 'city',
        value: 'London'
    }
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
    },
    toggleSidebar(state) {
        state.sideBarVisible = !state.sideBarVisible
    },
    updateSearchValue(state, search) {
      state.search = search
    }
  }
})
</script>