<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <el-row :style="{height: '100%'}">
      <el-col :span="6" :style="{height: '100%'}" class="trend-list-container">
        <ul class="trend-list" @click="changeYear">
          <el-tooltip
            v-for="item in yearFieldList"
            :key="item.year"
            effect="dark"
            :content="item.fieldName"
            placement="top"
          >
            <li
              class="trend-list-item"
              :itemid="item.fieldId"
              :itemname="item.fieldName"
            >
              {{ item.year }}: {{ item.fieldName }}
            </li>
          </el-tooltip>
        </ul>
      </el-col>
      <el-col :span="18" class="trend-line" :style="{ height: '100%' }">
        <div
          :id="authorTrendId"
          class="author-trend-lines"
          v-loading="lineLoading"
          element-loading-background="rgba(0, 0, 0, 0)"
        />
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
              res += `${v.seriesName}: ${Number(v.data.count || v.data.score).toFixed(2)}<br />`
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
        //   console.log(res.data)
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
    setLine (id, name) {
      let all = getRequest(
        `/api/report/paper/trend/year?baseline=activeness&refinement=${id}`
      )
      let author = getRequest(
        `/api/attention/trend?authorId=${this.authorId}&fieldName=${name}`
      )
      let res = Promise.all([all, author])
      res.then(r => {
          let series = []
          let dataset = []
          dataset.push({ source: r[0].data }, { source: r[1].data })
          series.push(
            {
              name: 'total',
              type: 'line',
              datasetIndex: 0,
              encode: {
                x: 'year',
                y: 'count'
              }
            },
            {
              name: "author's",
              type: 'line',
              datasetIndex: 1,
              encode: {
                x: 'year',
                y: 'score'
              }
            }
          )
          this.myChart.setOption({
            series: series,
            dataset: dataset
          })
          this.lineLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeYear (e) {
      let id = e.target.getAttribute('itemId'),
        name = e.target.getAttribute('itemname')
      this.setLine(id, name)
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
  height: 93%;
}
.trend-line {
  overflow: hidden;
}

.trend-list .trend-list-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 3px 0;
  cursor: pointer;
}

.trend-list-container li:hover {
  background-color: rgba(255, 255, 255, 0.7);
  /* background-color: #4e4376; */
}
</style>
