<template>
    <div class="m-2">
        <b-spinner class="spinner mr-3" variant="primary" label="Large Spinner"></b-spinner>
        <strong><span class="text-primary loading-text">{{ this.text }}</span></strong>
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

    .loading-text {
        position: relative;
        bottom: 6px;
    }
</style>