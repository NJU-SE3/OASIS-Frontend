<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0 0">
        <MyHeader @search="search" ></MyHeader>
      </el-header>
      <el-main>
        <div class="bar-ranking">
          <ve-histogram class="bar-chart"
          :data="chartData" 
          :settings="chartSettings"
          :events="chartEvents"
          height="300px"></ve-histogram>
        </div>
        <div style="width:100%; height:100%; background-color:rgb(181, 241, 181);">看我！我放报表！！</div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "../components/Header.vue"
export default {
    name: 'Ranking',
    components:{
      MyHeader,
    },
  data () {
      this.chartSettings = {
        stack: { '用户': ['访问用户', '下单用户'] }
      }
       var self = this
      this.chartEvents = {
        click: function(e){
          // console.log(self);
          self.getClick(e)
        },
        dblclick : function (e) {
          self.name = e.type
          console.log("db")
        }
      }
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 1132 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },

      }
  },
  // watch: {
  //     activeName (v) {
  //       this.$nextTick(_ => {
  //         this.$refs[`chart${v}`].echarts.resize()
  //       })
  //     }
  //   },
    methods: {
    search(data) {
      console.log(data);
    },
    getClick(e){
      console.log("in get",e);
    }
  }
}
</script>
<style scoped>
.bar-chart{
  /* height: 100%; */
  /* height: 100px; */
  width: 100%;
}
.bar-ranking{
  height: 300px;
}
</style>
