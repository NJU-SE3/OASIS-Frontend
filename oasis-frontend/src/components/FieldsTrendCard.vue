<template>
  <div
    :class="cardClass"
    @mouseenter="shadow"
    @mouseleave="normal"
    class="card"
  >
    <!-- <div class="trend-error " v-if="trendInfo == null">
      Sorry, Currently Unavailable!
    </div> -->
    <div class="trend">
      <div :id="lineId" class="node-graph"></div>
    </div>
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
    const testData = [
      [
        { year: '2013', count: 19 },
        { year: '2014', count: 12 },
        { year: '2016', count: 14 },
        { year: '2019', count: 10 }
      ],
      [
        { year: '1957', count: 30 },
        { year: '1973', count: 100 },
        { year: '1986', count: 16 },
        { year: '2016', count: 2 }
      ],
      [
        { year: '1954', count: 50 },
        { year: '1967', count: 80 },
        { year: '2002', count: 27 }
      ]
    ]
    return {
      trendInfo: null,
      cardClass: 'normal-card',
      dataset: [],
      series: [],
      lineId: '',
      settings: {
        dataset: this.dataset,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'value',
          min: 'dataMin',
          splitLine: {
            show: false
          },
          minInterval: 1,
          maxInterval: 5,
          axisLabel: {
            fontSize: 18,
            formatter: (value, index) => {
              return value.toString()
            }
          }
        },
        yAxis: {},
        series: this.series,
        color: [
          '#516b91',
          '#59c4e6',
          '#edafda',
          '#93b7e3',
          '#a5e7f0',
          '#cbb0e3'
        ]
      }
    }
  },
  watch: {
    trendsList: function (newT, oldT) {
      if (newT.length < oldT.length) {
        this.myChart.clear()
        this.myChart.setOption(this.settings)
      }
      this.getData()
      this.myChart.setOption({
        dataset: this.dataset,
        series: this.series
      })

      console.log(this.myChart.getOption())
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
      this.myChart.setOption(this.settings)
    },
    getData () {
      let dataset = []
      let series = []
      // console.log("before get", this.trendsList)
      this.trendsList.forEach((trend, i) => {
        dataset.push({
          source: trend.list
        })
        series.push({
          type: 'line',
          name: trend.name,
          datasetIndex: i
        })
      })
      console.log('in get', series, dataset)
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
  /* height: 350px; */
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
  /* overflow: auto; */
}

.title {
  font-size: large;
  font-weight: bold;
  padding-top: 5px;
  padding-left: 20px;
  text-align: left;
}

.type-icon {
  font-size: large;
  font-weight: bold;
}
.trend {
  height: 100%;
  width: 100%;
}

.trend-error {
  padding-top: 100px;
}
.node-graph {
  /* width:500px;
    height:400px; */
  width: 100%;
  height: 100%;
}
</style>
