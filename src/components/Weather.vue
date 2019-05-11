<template>
  <div class="hello">
    <!-- <b-alert variant="success" show>Success Alert</b-alert> -->
    <h1>{{ msg }}</h1>
    <img alt="Vue logo" src="../assets/logo.gif">
    <div>
      <b-table  id="weather-table" 
                ref="table" 
                responsive
                :busy.sync="isBusy"  
                :items="weatherProvider" 
                :fields="fields">
        <template slot="temperature" slot-scope="data">
          {{ Math.round(data.value) }} °C
        </template>
        <template slot="atDateTime" slot-scope="data">
          {{ new Date(data.value).toDateString() }}
        </template>
      </b-table>
      <Spinner v-if="isLoading"/>
      <Chart v-if="!isLoading" :chartdata="weatherTemeratures" title="Temperature" :legenddata="legendData"/>
    </div>
  </div>
</template>
<script>

import Spinner from './Spinner.vue'
import Chart from './Chart.vue'
import httpService from '../shared/services/httpService'

export default {
  name: 'Weather',
  components: {
    Spinner,
    Chart
  },
  props: {
    msg: String
  },
  data () {
    return { 
      apiMessage: String,
      isLoading: true,
      isBusy: false,
      fields: [
        {
          key: 'condition',
          label: 'Condition',
          sortable: true,
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true,
        },
        {
          key: 'temperature',
          label: 'Temperature',
          sortable: true,
        },
        {
          key: 'humidity',
          label: 'Humidity',
          sortable: true,
        },
        {
          key: 'windSpeed',
          label: 'Wind speed',
          sortable: true,
        },
        {
          key: 'atDateTime',
          label: 'Date',
          sortable: true,
        }
      ],
      weatherTemeratures: [],
      legendData: []
    }
  },
  methods:  {
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
    weatherProvider() {
      console.log('call');
        this.isBusy = true
        return httpService.get(`weather/forecast?city=Paris`).then(response => {   

          this.weatherTemeratures = response.data.days.map(day => day.temperature);
          this.legendData = response.data.days.map(day => this.dayFormatter(new Date(day.atDateTime).getDay()));

          this.isLoading = false
          this.isBusy = false

          return(response.data.days || []);
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
