<template>
  <div class="hello" id="weather-container">
    <h2 class="text-uppercase">Weather</h2>
    <!-- <img alt="Vue logo" src="../assets/logo.gif"> -->
    <WeatherForm :value="searchInputValue" @updated-input-value="updateSearchInputValue"/>
    <h4 class="m-4 text-uppercase">Current weather</h4>
    <div id="current-weather" v-if="!isLoading">
      <img width="200" height="200" v-bind:src="'http://openweathermap.org/img/w/' + currentWeather.icon + '.png'"/>
       <span id="temperature">{{ Math.round(this.currentWeather.temperature) }} °C </span>
      <div>       
        <div>Humidity {{ this.currentWeather.humidity }} % </div>
        <div>Wind speed {{ this.currentWeather.windSpeed }} m/s </div>
      </div>
    </div>
    <h4 class="m-4 text-uppercase">next 5 days</h4>
    <div class="pl-4 pr-4" id="forecast">
      <b-table  id="forecast-table" 
                ref="table" 
                responsive
                :busy.sync="isBusy"  
                :items="items" 
                :fields="fields">
        <template slot="condition" slot-scope="data">
          <img v-bind:src="'http://openweathermap.org/img/w/' + data.item.icon + '.png'"/>
        </template>
        <template slot="temperature" slot-scope="data">
          {{ Math.round(data.value) }} °C
        </template>
        <template slot="humidity" slot-scope="data">
          {{ data.value }} %
        </template>
        <template slot="atDateTime" slot-scope="data">
          {{ new Date(data.value).toDateString() }}
        </template>
        <template slot="windSpeed" slot-scope="data">
          {{ Math.round(data.value) }} m/s
        </template>
      </b-table>
      <Spinner v-if="isLoading"/>
      <div class="row" v-if="!isLoading" id="foreast-charts">
        <div class="col-sm-6 p-5">
            <LineChart id="forecast-temp-chart" :chartdata="lineChartData" :options="options"/>
        </div>
        <div class="col-sm-6 p-5">
            <BarChart id="forecast-humidity-chart" :chartdata="barChartData" :options="options"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Spinner from './shared/Spinner.vue'
import LineChart from './chart/LineChart.vue'
import BarChart from './chart/BarChart.vue'
import WeatherForm from './WeatherForm.vue'
import httpService from '../shared/services/httpService'

export default {
  name: 'Weather',
  components: {
    Spinner,
    LineChart,
    BarChart,
    WeatherForm
  },
  props: {
  },
  data () {
    return { 
      searchInputValue: "London",
      isLoading: true,
      isBusy: false,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      },
      items: [],
      fields: [
        {
          key: 'atDateTime',
          label: 'Date',
          sortable: false,
        },
        {
          key: 'condition',
          label: 'Condition',
          sortable: false,
        },
        {
          key: 'description',
          label: 'Description',
          sortable: false,
        },
        {
          key: 'temperature',
          label: 'Temperature',
          sortable: false,
        },
        {
          key: 'humidity',
          label: 'Humidity',
          sortable: false,
        },
        {
          key: 'windSpeed',
          label: 'Wind speed',
          sortable: false,
        }
      ],
      lineChartData: {},
      barChartData: {},
      currentWeather: {}
    }
  },
  methods:  {
    fetcWeather() {
      this.isLoading = true;
      this.isBusy = true
      var paramType = 'city'
      var paramValue = this.searchInputValue 

      httpService.get(`weather/current?${paramType}=${paramValue}`)
                 .then(response => {       
        this.currentWeather = response.data || []
        console.log(this.currentWeather)
      })
         
      httpService.get(`weather/forecast?${paramType}=${paramValue}`)
                 .then(response => {  
        this.updateChart(response);          
        this.isLoading = false
        this.isBusy = false
        this.items = response.data.days || []
      })
      .catch(error => {
        console.log(error)
        this.isLoading = false
        this.isBusy = false
        return []
      })
    },
    dayFormatter(indexOfDay) {
      switch(indexOfDay) {
        case 1:
          return "Monday"
        case 2:
          return "Teusday"    
        case 3:
          return "Wednesday"    
        case 4:
          return "Thursday"   
        case 5:
          return "Friday"   
        case 6:
          return "Saturday" 
        case 0:
          return "Sunday"
        default: 
          return "Unknown"
      }
    },
    updateSearchInputValue(newValue) {
      this.searchInputValue = newValue;
      this.fetcWeather()
    },
    updateChart(response) {
      var legendData = response.data.days.map(day => this.dayFormatter(new Date(day.atDateTime).getDay()))
          
          this.lineChartData = {
            labels: legendData,
            datasets: [
              {
                label: "Temperature",
                backgroundColor: '#3399ff',
                data: response.data.days.map(day => day.temperature)
              }
            ]
          }

          this.barChartData = {
            labels: legendData,
            datasets: [
              {
                label: "Humimidity",
                backgroundColor: '#3399ff',
                data: response.data.days.map(day => day.humidity)
              }
            ]
          }
    }
  },
  mounted: function () {
    this.fetcWeather()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.temperature {
  font-size: 52px;
  color: lightgrey;
}
</style>
