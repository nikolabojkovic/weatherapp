<template>
  <div class="hello" id="weather-container">
    <h1>{{ msg }}</h1>
    <img alt="Vue logo" src="../assets/logo.gif">
    <WeatherForm :value="searchInputValue" @updated-input-value="updateSearchInputValue"/>
    <div class="p-5">
      <b-table  id="weather-table" 
                ref="table" 
                responsive
                :busy.sync="isBusy"  
                :items="items" 
                :fields="fields">
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
          {{ Math.round(data.value) }} mps
        </template>
      </b-table>
      <Spinner v-if="isLoading"/>
      <div class="row" v-if="!isLoading">
        <div class="col-sm-6 p-5 weather-chart">
            <LineChart :chartdata="temperatureChartData" :options="options"/>
        </div>
        <div class="col-sm-6 p-5 weather-chart">
            <BarChart :chartdata="humidityChartData" :options="options"/>
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
    msg: String
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
      temperatureChartData: {},
      humidityChartData: {},
    }
  },
  methods:  {
    updateSearchInputValue(newValue) {
      this.searchInputValue = newValue;
      this.fetcWeather()
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
    fetcWeather() {
      var paramType = 'city'
      var paramValue = this.searchInputValue
        this.isBusy = true
        httpService.get(`weather/forecast?${paramType}=${paramValue}`).then(response => {  
          var legendData = response.data.days.map(day => this.dayFormatter(new Date(day.atDateTime).getDay()))
          
          this.temperatureChartData = {
            labels: legendData,
            datasets: [
              {
                label: "Temperature",
                backgroundColor: '#3399ff',
                data: response.data.days.map(day => day.temperature)
              }
            ]
          }

          this.humidityChartData = {
            labels: legendData,
            datasets: [
              {
                label: "Humimidity",
                backgroundColor: '#3399ff',
                data: response.data.days.map(day => day.humidity)
              }
            ]
          }
          
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

.weather-chart {
  
}
</style>
