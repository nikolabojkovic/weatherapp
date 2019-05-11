<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options', 'title', 'legenddata'],
  mounted () {
    this.renderChart({
      labels: this.legenddata,
      datasets: [
        {
          label: this.title,
          backgroundColor: '#3399ff',
          data: this.chartdata
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>

<style>
</style>