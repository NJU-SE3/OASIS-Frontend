<template>
  <div
    :class="cardClass"
    @mouseenter="shadow"
    @mouseleave="normal"
    class="card"
  >
    <div class="trend-error " v-if="trendInfo == null">
      Sorry, Currently Unavailable!
    </div>
    <div class="trend" v-if="trendInfo != null">
      <div :id="lineId"></div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title');

export default {
  name: 'trend-card',
  data () {
    return {
      // loading: true,

      extendSettings: {
        series: {
          barMaxWidth: 40
        }
      },
      cardClass: 'normal-card',
      trendInfo: {
        columns: ['日期', '', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      lineId: '',
      settings: {
        colors: [
          '#516b91',
          '#59c4e6',
          '#edafda',
          '#93b7e3',
          '#a5e7f0',
          '#cbb0e3'
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        }
      }
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
      this.myChart = echarts.init(document.getElementById(this.graphId))
      this.myChart.setOption(this.settings)
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
</style>
