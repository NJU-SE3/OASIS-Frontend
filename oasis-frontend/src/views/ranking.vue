<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0 0">
        <MyHeader @search="search" ></MyHeader>
      </el-header>
      <el-main>
        <el-row class="bar-ranking">
          <el-col :span="8">
            <div class="name">
              <h1>Top 10 authors with papers cite in 2019</h1><!-- <p>those who publish </p> -->
            </div>
          </el-col>
          <el-col :span="14" :offset="2">
            <div class="chart">
              <ve-histogram class="bar-chart"
              :data="chartData" 
              :settings="authorSettings"
              :events="chartEvents"
              height="100%"
              :extend="authorExtend"
              ></ve-histogram>
          </div>
          </el-col>
        </el-row>
        <el-row class="bar-ranking">
          <el-col :span="8">
            <div class="name">
              <h1>Top 10 organizations with papers cite</h1><!-- <p>those who publish </p> -->
            </div>
          </el-col>
          <el-col :span="14" :offset="2">
            <div class="chart">
              <ve-histogram class="bar-chart"
              :data="chartData" 
              :settings="paperSettings"
              :events="chartEvents"
              height="100%"
              :extend="paperExtend"
              ></ve-histogram>
          </div>
          </el-col>
        </el-row>
        <el-row class="bar-ranking">
          <el-col :span="8">
            <div class="name">
              <h1>Top 10 xxx with papers cite</h1><!-- <p>those who publish </p> -->
            </div>
          </el-col>
          <el-col :span="14" :offset="2">
            <div class="chart">
              <ve-histogram class="bar-chart"
              :data="chartData" 
              :settings="paperSettings"
              :events="chartEvents"
              height="100%"
              :extend="xxxExtend"
              ></ve-histogram>
          </div>
          </el-col>
        </el-row>
        <!-- <div style="width:100%; height:100%; background-color:rgb(181, 241, 181);">看我！我放报表！！</div> -->
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
      this.authorSettings = {
        stack: { 'Papers': ['Paper1','Paper2','Paper3','Paper4','Paper5'] },
      }
      this.authorExtend = {
        textStyle:{
          color: 'white',
        },
          "color": [
          "#ca0b5b",
          "#d95850",
          "#eb8146",
          "#ffb248",
          "#f2d643",
          "#ebdba4",
          "#ff004e",
          "rgba(255,242,0,0.16)"
      ],
      }

      this.paperSettings = {
        stack: { 'Papers': ['Paper1','Paper2','Paper3','Paper4','Paper5'] },
      }
      this.paperExtend = {
        textStyle:{
          color: 'white',
        },
          "color": [
            "#9b8bba",
            "#e098c7",
            "#8fd3e8",
            "#71669e",
            "#cc70af",
            "#7cb4cc",
            "#7992da"
      ],
      }
      this.xxxExtend = {
        textStyle:{
          color: 'white',
        },
          "color": [
            "#2ec7c9",
            "#b6a2de",
            "#5ab1ef",
            "#ffb980",
            "#d87a80",
            "#8d98b3",
            "#e5cf0d",
            "#97b552",
            "#95706d",
            "#dc69aa",
            "#07a2a4",
            "#9a7fd1",
            "#588dd5",
      ],
      }
       var self = this
      this.chartEvents = {
        click: function(e){
          self.getClick(e)
        },
        dblclick : function (e) {
          self.name = e.type
          console.log("db")
        }
      }
      return {
        chartData: {
          columns: ['Author','Paper1','Paper2','Paper3','Paper4','Paper5'],
          rows: []
        },

      }
  },
  mounted(){
    this.initChart();
  },
    methods: {
      initChart(){
        console.log(this.chartData)
        for (var i =0; i<10 ;i++){
        this.chartData.rows.push({
          'Author':"Smith.J",
          'Paper1':Math.ceil(Math.random()*1000),
          'Paper2':Math.ceil(Math.random()*1000),
          'Paper3':Math.ceil(Math.random()*1000),
          'Paper4':Math.ceil(Math.random()*1000),
          'Paper5':Math.ceil(Math.random()*1000),
        })
        }
      },
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
.main{
  color:white;
}
.chart{
  height: 300px;
}
.bar-ranking{
  overflow: hidden;
}

.bar-chart{

}
</style>
