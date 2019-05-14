<template>
<div class="container">
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <b-input-group class="mt-2">
                <b-form-input v-model="inputValue" :placeholder="inputPlaceholder"></b-form-input>
                <b-input-group-append>
                <b-button class="custom-button" v-on:click="submit">{{ this.submitText }}</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
        <div class="col-md-3"></div>        
    </div>
</div>
</template>
<script>
export default {
  name: 'WeatherForm',
  props: {
      type: String,
      value: String,
      placeholder: String,
      buttonText: String
  },
  data() {
      return {
       inputPlaceholder: this.placeholder,
       submitText: this.buttonText,
       inputValue: this.value
      }
  },
  methods: {
      submit() {
          var search = {
              type: this.type,
              value: this.inputValue
          }
          this.$store.commit('updateSearchValue', search)
          this.$emit('searchSubmitted', {})
      }
  }
}
</script>
<style>
    .custom-button, .custom-button:hover  {
        background-color: #45a7e7;
        border-color: #45a7e7;
    }

    .custom-button:active {
        background-color: #3d96d1 !important;
        border-color: #3d96d1 !important;
    }
</style>