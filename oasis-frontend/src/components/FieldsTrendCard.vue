<template>
  <div
    :class="cardClass"
    @mouseenter="shadow"
    @mouseleave="normal"
    class="card"
  >
    <div
      class="trendCard"
      :id="lineId"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      :style="{
        display: empty ? 'none' : 'block'
      }"
    ></div>
    <!-- <div
      class="trendCard"
      :style="{
        display: empty ? 'block' : 'none'
      }"
    >
      <h2>FIELD TREND</h2>
      <div>wanna see the trends of the fields you are interested in?</div>
      <div>JUST Enter the name!</div>
    </div> -->
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')

export default {
  name: 'trend-card',
  props: {
    trendsList: Array
  },
  data () {
    return {
      trendInfo: null,
      loading: false,
      empty: true,
      cardClass: 'normal-card',
      dataset: [],
      series: [],
      lineId: '',
      color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
      settings: {
        dataset: this.dataset,
        tooltip: {
          trigger: 'axis',
          formatter: (value, index) => {
            let res = `${value[0].axisValue}<br />`
            value.forEach((v, i) => {
              res += `${v.seriesName}: ${Number(v.data.count).toFixed(2)}<br />`
            })
            return res
          }
        },

        xAxis: {
          type: 'value',
          min: 'dataMin',
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 18,
            formatter: (value, index) => {
              return value.toString()
            }
          }
        },
        yAxis: {},
        series: this.series
      }
    }
  },
  watch: {
    trendsList: function (newT, oldT) {
      this.loading = true
      if (newT.length < oldT.length) {
        this.myChart.clear()
        this.myChart.setOption(this.settings)
      }
      this.getData()
      if (this.series.length === 0) {
        this.empty = true
        // this.myChart = echarts.init(document.getElementById(this.lineId))
      } else if (this.series.length === 1) {
        this.empty = false
        this.myChart.setOption(this.settings)
        this.myChart.setOption({
          dataset: this.dataset,
          series: this.series
        })
      } else {
        this.myChart.setOption({
          dataset: this.dataset,
          series: this.series
        })
      }
      this.loading = false
    }
  },
  created () {
    this.lineId = Date.now().toString(36)
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.myChart = echarts.init(document.getElementById(this.lineId))
    },
    getData () {
      let dataset = []
      let series = []
      this.trendsList.forEach((trend, i) => {
        dataset.push({
          source: trend.list
        })
        series.push({
          type: 'line',
          name: trend.name,
          datasetIndex: i,
          itemStyle: { normal: { color: this.color[i] } }
        })
      })
      // console.log('in get', series, dataset)
      this.series = series
      this.dataset = dataset
    },
    shadow () {
      this.cardClass = 'shadow-card'
    },
    normal () {
      this.cardClass = 'normal-card'
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b4bccc;
}
.card {
  padding: 2% 4%;
}

.normal-card {
  background-color: azure;
  opacity: 0.7;
  border-radius: 4px;
  color: #4e4376;
  height: 500px;
  overflow: hidden;
}
.shadow-card {
  background-color: azure;
  opacity: 0.7;
  border-radius: 4px;
  color: #4e4376;
  height: 500px;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.4);
}
.trendCard {
  height: 100%;
  width: 100%;
}
</style>
