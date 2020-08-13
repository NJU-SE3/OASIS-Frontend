<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <el-row :style="{ height: '100%' }">
      <el-col :span="4" :style="{ height: '100%' }">
        <ul class="trend-list" @click="changeYear">
          <li v-for="item in yearFieldList" :key="item.year">
            {{ item.year }}: {{ item.fieldName }}
          </li>
        </ul>
      </el-col>
      <el-col :span="20" class="trend-line" :style="{ height: '100%' }" v-loading="lineLoading" element-loading-background="rgba(0, 0, 0, 0)">
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
      lineLoading: true,
      color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
      series: [],
      dataset: [],
      settings: {
        dataset: this.dataset,
        tooltip: {
          trigger: 'axis',
          formatter: (value, index) => {
            // console.log(value)
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
          this.yearFieldList = res.data
          this.myChart = echarts.init(
            document.getElementById(this.authorTrendId)
          )
          this.myChart.setOption(this.settings)
          if (this.yearFieldList.length !== 0) {
            this.setLine(
              this.yearFieldList[0].fieldId,
              this.yearFieldList[0].fieldName
            )
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeYear (e) {
      // console.log(e)
    },
    setLine (id, name) {
      let all = getRequest(
        `/api/report/paper/trend/year?baseline=activeness&refinement=${id}`
      )
      let author = getRequest(
        `/api/attention/trend?authorId=${this.authorId}&fieldName=${name}`
      )
      let res = Promise.all([all, author])
      res
        .then(r => {
          console.log(r)
          let series = []
          let dataset = []

          dataset.push({ source: r[0].data }, { source: r[1].data } )
          series.push({
            name: 'total',
            type: 'line',
            datasetIndex: 0
          },
          {
            name: "author's",
            type: 'line',
            datasetIndex: 1
          })
          this.myChart.setOption({
            series: series,
            dataset: dataset
          })
          this.lineLoading=false
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
  /* padding: 2% 2% ; */
  text-align: left;
}
.shadow-card {
  background-color: azure;
  box-sizing: border-box;
  opacity: 0.7;
  border-radius: 4px;
  color: #4e4376;
  height: 350px;
  box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.5);
  /* padding: 2% 2% ; */
  text-align: left;
}

.author-trend-lines {
  width: 100%;
  height: 100%;
}
.trend-list {
  overflow: auto;
  overflow-y: scroll;
}
.trend-line {
  overflow: hidden;
}
</style>
