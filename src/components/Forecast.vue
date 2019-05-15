<template>
  <div class="container-fluid"> 
    <h4 class="m-4 text-uppercase" >Next 5 days</h4>
    <div class="pl-2 pr-2" id="forecast">
      <b-table  v-if="!forecastError"
                id="forecast-table" 
                ref="table" 
                responsive
                :busy.sync="isBusy"  
                :items="items" 
                :fields="fields">
        <div slot="table-busy" class="text-center text-primary my-2">
          <Spinner text="Loading..."/>
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
      <div class="row" v-if="!isLoading && !forecastError" id="forecast-charts">
        <div class="col-sm-6 p-3">
            <LineChart id="forecast-temp-chart" :chartdata="lineChartData" :options="options"/>
        </div>
        <div class="col-sm-6 p-3">
            <BarChart id="forecast-humidity-chart" :chartdata="barChartData" :options="options"/>
        </div>
      </div>
      <div><div v-if="forecastError">No data</div></div>
    </div>
  </div>
</template>
<script>

import Spinner from './shared/Spinner.vue'
import LineChart from './chart/LineChart.vue'
import BarChart from './chart/BarChart.vue'

import api from '../shared/services/api'

export default {
  name: 'Forecast',
  components: {
    Spinner,
    LineChart,
    BarChart
  },
  data () {
    return { 
      isLoading: true,
      forecastError: null,
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
      barChartData: {}
    }
  },
  methods:  {
    fetchData() {
      this.isLoading = true;
      this.isBusy = true
      this.forecastError = null
      api.get(`weather/forecast?${this.search.type}=${this.search.value}`).then(response => {  
       
        this.items = response.data.days || []
        this.updateChart(response); 

        this.isLoading = false
        this.isBusy = false
        this.forecastError = null;
      })
      .catch(error => {
        console.log(error)
        this.isLoading = false
        this.isBusy = false
        this.forecastError = error
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
    updateChart(response) {
      var legendData = response.data.days.map(day => this.dayFormatter(new Date(day.atDateTime).getDay()))
          
          this.lineChartData = {
            labels: legendData,
            datasets: [
              {
                label: "Temperature °C",
                backgroundColor: '#3399ff',
                data: response.data.days.map(day => day.temperature)
              }
            ]
          }

          this.barChartData = {
            labels: legendData,
            datasets: [
              {
                label: "Humimidity %",
                backgroundColor: '#3399ff',
                data: response.data.days.map(day => day.humidity)
              }
            ]
          }
    }
  },
  computed: {
    search() {
      return this.$store.state.search
    }
  },
  mounted: function () {
    this.fetchData()
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
</style>
