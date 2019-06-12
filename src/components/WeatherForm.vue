<template>
<div class="container">
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <div class="row">
                <b-input-group class="mt-2">
                    <b-form-input type="text" 
                                v-model="inputValue" 
                                :placeholder="inputPlaceholder"
                                v-on:keyup="clearErrors"
                                v-bind:class="{ 'border-danger': errors.length > 0 }"></b-form-input>
                    <b-input-group-append>
                        <b-button class="custom-button" v-on:click="submit">{{ this.submitText }}</b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>
            <div class="row">
                <ul class="text-left text-danger">
                    <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
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
      name: String,
      value: String,
      placeholder: String,
      buttonText: String
  },
  data() {
      return {
       inputPlaceholder: this.placeholder,
       submitText: this.buttonText,
       inputValue: this.value,
       errors: []
      }
  },
  methods: {
      formValid() {
            this.errors = []
            if (!this.inputValue) {
                this.errors.push(`${this.name} is required.`);
                return false;
            }

            return true;
      },
      submit() {
          if (!this.formValid())
            return;

          var search = {
              type: this.type,
              value: this.inputValue
          }
          this.$store.dispatch('updateSearch', search).then(() => { 
            this.$emit('searchSubmitted', {})
          })
      },
      clearErrors() {
          this.errors = []
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

    .border-danger {
        border-color: #dc3545;
    }
</style>