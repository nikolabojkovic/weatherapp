<template>
    <div>
        <b-spinner class="spinner mr-2" variant="primary" label="Large Spinner"></b-spinner>
        <span class="text-primary">{{ this.text }}</span>
    </div>
</template>
<script>
export default {
  name: 'Spinner',
  props: {
      text: String
  },
  data() {
      return { 
      }
  }
}
</script>
<style>
    .spinner {
        width: 2rem; height: 2rem;
    }
</style>