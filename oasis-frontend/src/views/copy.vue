<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0 0">
        <MyHeader @search="search" ></MyHeader>
      </el-header>
      <el-main>
        <el-row class="bar-ranking">
          <el-col :span="6">
            <div class="name">
              <h1>Top 10 authors with papers cite in 2019</h1><!-- <p>those who publish </p> -->
            </div>
          </el-col>
          <el-col :span="16" :offset="2">
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
    name: 'Copy',
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
            "#516b91",
            "#59c4e6",
            "#edafda",
            "#93b7e3",
            "#a5e7f0",
            "#cbb0e3"
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
 "#e01f54",
            "#001852",
            "#f5e8c8",
            "#b8d2c7",
            "#c6b38e",
            "#a4d8c2",
            "#f3d999",
            "#d3758f",
            "#dcc392",
            "#2e4783",
            "#82b6e9",
            "#ff6347",
            "#a092f1",
            "#0a915d",
            "#eaf889",
            "#6699ff",
            "#ff6666",
            "#3cb371",
            "#d5b158",
            "#38b6b6"
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
  height: 450px;
}
.bar-ranking{
  overflow: hidden;
}

</style>
