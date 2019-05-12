<template>
<div class=form-contaier>
    <div class="row">
        <div class="col-md-3">

        </div>
        <div class="col-md-6 pl-4 pr-4">
            <b-input-group class="mt-2">
                <b-form-input v-model="inputValue" :placeholder="inputPlaceholder"></b-form-input>
                <b-input-group-append>
                <b-button variant="primary" v-on:click="submit">{{ this.submitText }}</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
        <div class="col-md-3">

        </div>
        
    </div>
</div>
</template>
<script>
export default {
  name: 'WeatherForm',
  props: {
      value: String,
      placeholder: String,
      buttonText: String
  },
  data() {
      return {
       inputValue: this.value,
       inputPlaceholder: this.placeholder,
       submitText: this.buttonText
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

</style>