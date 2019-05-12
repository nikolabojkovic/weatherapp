<template>
<div class="row">
    <div class="col-md-3">

    </div>
    <div class="col-md-6 pl-4 pr-4">
        <b-input-group class="mt-2">
            <b-form-input v-model="inputValue"></b-form-input>
            <b-input-group-append>
            <b-button variant="primary" v-on:click="submit">Show weather</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
    <div class="col-md-3">

    </div>
    
</div>
</template>
<script>
export default {
  name: 'WeatherForm',
  props: {
      value: String
  },
  data() {
      return {
       inputValue: this.value
      }
  },
  methods: {
      submit() {
          this.$emit('updated-input-value', this.inputValue)
      }
  }
}
</script>
<style>
.row {
    width: 100%;
}
</style>