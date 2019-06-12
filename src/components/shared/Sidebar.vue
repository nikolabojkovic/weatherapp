<template>
    <div class="wrapper" v-show="isVisible">
        <!-- Sidebar -->
        <nav id="sidebar" class="container-fluid">
            <div class="row sidebar-header pt-3">
                <h3 class="col-12 text-center">History</h3>
            </div>
            <div class="row separator ml-4 mb-3"></div>
            <div v-if="history.length <= 0">No data</div> 
            <div id="history" class="history">
                <div class="history-item row" v-bind:key="index" v-for="(item, index) in history">
                    <div class="city float-left">{{ item.city }}</div>
                    <div class="city-details">
                        <div class="title">{{ Math.round(item.temperature) }}<span class="history-temp-scale">°C</span>
                        </div>
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
    </div>
</template>
<script>

export default {
  name: 'Sidebar',
  data() {
      return { 
      }
  },
  methods: {
    clearHistory() {
        this.$store.dispatch('claerHistory')
    },
    resize() {
        document.getElementById('history').style.height = (screen.height - 280) + 'px'
    }
  },
  computed: {
    history () {
      return this.$store.state.history
    },
    isVisible() {
        return this.$store.state.isSideBarVisible
    }
  },
  mounted: function () {    
    this.resize()
    window.onresize = this.resize
    this.$store.dispatch('initHistory')
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
    -webkit-transition: width 2s, height 4s; /* For Safari 3.1 to 6.0 */
    transition: width 2s, height 4s;
    overflow: scroll;
}

#sidebar a {
    color: #fff;
}

.separator {
    border: 1px solid white;
    width: 80%;
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

.history-temp-scale {
    font-size: 11px;
    position: relative;
    bottom: 7px;
    right: 0px;
  }
</style>