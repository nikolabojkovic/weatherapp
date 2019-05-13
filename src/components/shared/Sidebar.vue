<template>

    <div class="wrapper" v-show="show">
        <transition name="slide-toggle">
        <!-- Sidebar -->
        <nav id="sidebar" class="container-fluid">
            <div class="row sidebar-header pt-3">
                <h3 class="col-12 text-center">History</h3>
            </div>
            <div class="row separator ml-4 mb-3"></div>
            <div id="history" class="history">
                <div class="history-item row" v-bind:key="index" v-for="(item, index) in historyValues">
                    <div class="city float-left">{{ item.city }}</div>
                    <div class="city-details">
                        <div class="title"> {{ Math.round(item.temperature) }} °C </div>
                        <div class="subtitle"> Humidity: {{ item.humidity }} %</div>
                    </div>                    
                </div>
            </div> 
            <div class="row mt-2">
                <div class="col-12 pl-4 pr-4">
                    <b-button @click="clearHistory" block size="sm" variant="light">Clear</b-button>
                </div>
            </div>           
        </nav>
        </transition>
    </div>

</template>
<script>
export default {
  name: 'Sidebar',
  props: {
      toggle: Boolean,
      history: Array 
  },
  data() {
      return { 
          show: this.toggle,
          historyValues: []
      }
  },
  watch: {
    toggle: function(val) {
      this.show = val
    },
    history: function(val) {
      this.historyValues = val
    }
  },
  methods: {
      clearHistory() {
          localStorage.removeItem('history')
          this.historyValues = []
          this.$emit('update-history', {})
      }
  },
  mounted: function () {
    document.getElementById('history').style.height = (screen.height - 150) + 'px'
  }
}
</script>
<style>
.wrapper {
    position: absolute;
    display: flex;
    width: 100%;
}

#sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 999;
    background: #64befa;
    color: #fff;
}

#sidebar a {
    color: #fff;
}

.separator {
    border: 1px solid white;
    width: 80%;
}

.slide-toggle-enter-active,
.slide-toggle-leave-active {
     transition: width 2s;
     -webkit-transition: width 2s;
}
.slide-toggle-enter-active {
     width: 300px;
}
.slide-toggle-enter,
.slide-toggle-leave-active {
    width: 0px;
}
.slide-toggle-leave {
    width: 0px;
} 

.history {
    overflow-y: scroll;
    height: auto;
}

.history-item {
    background-color: #45a7e7;
    margin: 10px;
    padding: 10px;
}

.city {
    display: inline;
}

.city-details {
    display: inline;
}

.title {
    display: block;
}

.subtitle {
    display: block;
    font-size: 11px;
}
</style>