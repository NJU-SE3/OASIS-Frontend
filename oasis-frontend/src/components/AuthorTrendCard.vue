<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <el-row>
      <el-col :span="4">
        <ul>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
          <li>2020: aaaaaaaaaaaaaaaaaa</li>
        </ul>
      </el-col>
      <el-col :span="20">
        <div :id="authorTrendId" class="author-trend-lines" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
import { getRequest } from '../utils/request'

export default {
  name: 'author-trend-card',
  data () {
    return {
      cardClass: 'normal-card',
      authorTrendId: '',
      color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
      settings: {
        dataset: this.dataset,
        tooltip: {
          trigger: 'axis',
          formatter: (value, index) => {
            console.log(value)
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
      },
      yearFieldList: [],

      authorTrendList: []
    }
  },
  created () {
    this.authorTrendId = Date.now().toString(36)
  },
  mounted () {
    this.authorId = this.$route.query.id
    this.init()
  },
  methods: {
    shadow () {
      this.cardClass = 'shadow-card'
    },
    normal () {
      this.cardClass = 'normal-card'
    },
    init () {
      getRequest(`/api/attention/batchQuery?authorId=${this.authorId}`)
        .then(res => {
          console.log(res.data)
          this.this.myChart = echarts.init(
            document.getElementById(this.authorTrendId)
          )
          this.myChart.setOption(this.settings)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.normal-card {
  background-color: azure;
  box-sizing: border-box;
  opacity: 0.7;
  border-radius: 4px;
  color: #4e4376;
  height: 350px;
  overflow: scroll;
  padding: 5% 2% 0 0;
  text-align: left;
}
.shadow-card {
  background-color: azure;
  box-sizing: border-box;
  opacity: 0.7;
  border-radius: 4px;
  color: #4e4376;
  height: 350px;
  overflow: scroll;
  box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.5);
  padding: 5% 2% 0 0;
  text-align: left;
  /* overflow: auto; */
}

.author-trend-lines {
  width: 100%;
  height: 100%;
}
</style>
