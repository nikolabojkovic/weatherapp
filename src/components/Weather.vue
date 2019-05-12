<template>
  <div class="container" id="weather-container">
    <WeatherForm :value="searchCityValue" 
                 @updated-input-value="updateSearchCityValue"
                 placeholder="Enter city name"
                 buttonText="Search city"/>
    <WeatherForm :value="searchZipCodeValue" 
                 @updated-input-value="updateSearchZipCodeValue"
                 placeholder="Enter zip code"
                 buttonText="Search zip code"/>
    <div id="current-weather" v-if="!isLoading">
      <h4 class="m-4 text-uppercase">Current weather <span>{{ this.city }}</span> </h4>
      <div class="temp-container">
        <img width="170" height="170" v-bind:src="'http://openweathermap.org/img/w/' + currentWeather.icon + '.png'"/>
        <span id="temperature">
          {{ Math.round(this.currentWeather.temperature) }} 
          <span class="temp-scale">°C</span>
        </span>
       </div>
      <div>       
        <div>Humidity {{ this.currentWeather.humidity }} % </div>
        <div>Wind speed {{ this.currentWeather.windSpeed }} m/s </div>
      </div>
    </div>
    <h4 class="m-4 text-uppercase" v-if="!isLoading">next 5 days</h4>
    <div class="pl-2 pr-2" id="forecast">
      <b-table  id="forecast-table" 
                ref="table" 
                responsive
                :busy.sync="isBusy"  
                :items="items" 
                :fields="fields">
        <div slot="table-busy" class="text-center text-primary my-2">
          <b-spinner class="align-middle mr-1"></b-spinner>
          <strong>Loading...</strong>
        </div>
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
      <Spinner v-if="isLoading" text="Loading charts..."/>
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
      searchCityValue: "London",
      searchZipCodeValue: "",
      searchValue: "London",
      searchParam: "city",
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
          thClass: 'd-none d-lg-block',
          tdClass: 'd-none d-lg-block'
        },
        {
          key: 'condition',
          label: 'Condition',
          sortable: false,
        },
        {
          key: 'temperature',
          label: 'Temperature',
          sortable: false,
        },
        {
          key: 'description',
          label: 'Description',
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
      currentWeather: {},
      city: String
    }
  },
  methods:  {
    fetcWeather() {
      this.isLoading = true;
      this.isBusy = true

      httpService.get(`weather/current?${this.searchParam}=${this.searchValue}`)
                 .then(response => {       
        this.currentWeather = response.data || []
      })
         
      httpService.get(`weather/forecast?${this.searchParam}=${this.searchValue}`)
                 .then(response => {  
        this.city = response.data.city           
        this.items = response.data.days || []
        this.updateChart(response);     

        this.isLoading = false
        this.isBusy = false
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
    updateSearchCityValue(newValue) {
      this.searchCityValue = newValue
      this.searchValue = newValue
      this.searchParam = 'city'
      this.fetcWeather()
    },
    updateSearchZipCodeValue(newValue) {
      this.searchZipCodeValue = newValue
      this.searchValue = newValue
      this.searchParam = 'zipCode'
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

#temperature {
  font-size: 52px;
  position: relative;
  right: 30px;
}

.temp-scale {
  font-size: 24px;
  position: relative;
  bottom: 20px;
  right: 15px;
}
</style>
