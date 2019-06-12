<script>

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSideBarVisible: false,
    history: [],
    search: {
        type: 'city',
        value: 'London'
    }
  },
  mutations: {
    loadHistory(state) {
        if (localStorage.getItem('history') != null && JSON.parse(localStorage.getItem('history')).length != 0) {
            state.history = JSON.parse(localStorage.getItem('history'))
        }
    },
    updateHistory (state, currentWeather) {
        state.history = [{
            city: currentWeather.cityName,
            temperature: currentWeather.temperature,
            humidity: currentWeather.humidity
        }, ...state.history]
    },
    saveHistory(state) {
      localStorage.setItem('history', JSON.stringify(state.history))
    },
    claerHistory (state) {
        state.history = []
        localStorage.removeItem('history')
    },
    toggleSidebarState(state) {
        state.isSideBarVisible = !state.isSideBarVisible
    },
    updateSearchValue(state, search) {
      state.search = search
    }
  },
  actions: {
    initHistory({commit}) {
      commit('loadHistory')
    },
    updateHistory({commit}, currentWeather) {
      commit('loadHistory')
      commit('updateHistory', currentWeather)
      commit('saveHistory') 
    },
    claerHistory({commit}) {
      commit('claerHistory')
    },
    toggleSidebar({commit}) {
      commit('toggleSidebarState')
    },
    updateSearch({commit}, search) {
      commit('updateSearchValue', search)
    }
  }
})
</script>