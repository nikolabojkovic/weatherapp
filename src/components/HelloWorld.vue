<template>
  <div class="hello">
    <b-alert variant="success" show>Success Alert</b-alert>
    <h1>{{ msg }}</h1>
    <h1>{{ apiMessage }}</h1>

  </div>
</template>

<script>

import httpService from '../shared/services/httpService'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data () {
    return { 
      apiMessage: String
    }
  },
  methods:  {
    
  },
  mounted: function () {
    httpService.get(`weather/forcast?city=Paris`).then(response => {        
        this.apiMessage = response.data
      })
      .catch(error => {
        console.log(error)
      })
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
