<template>
    <div id="header" class="row">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-11 col-10">
                    <span class="text-uppercase text-center font-weight-bold">Welcome to weather forecast</span>
                </div>
                <div class="col-sm-1 col-2">
                    <button type="button" @click="toggle" class="navbar-toggle">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>  
            </div>  
        </div>    
    </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
      return { 
      }
  },
  computed: {
      toggleState() {
          return this.$store.state.sideBarVisible
      }
  },
  methods: {
      toggle() {
          this.$store.commit('toggleSidebar')
      }
  }
}
</script>
<style>
#header {
    background-color: #64befa;
    color: white;
    padding: 20px 0px 0px 0px !important;
}

.navbar-toggle {
    cursor: pointer;
    width: 48px;
    height: 48px;
    background-color: #64befa;
    border: 2px solid white;
    border-radius: 6px;
    position: relative;
    float: right;
    bottom: 10px;
    padding: 0px;
}

.icon-bar {
    width: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    position: relative;
    left: 7px;
    border: 1px solid white;
    display: block !important;
}
</style>