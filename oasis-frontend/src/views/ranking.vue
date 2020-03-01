<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0 0">
        <MyHeader @search="search" ></MyHeader>
      </el-header>
      <el-main style="padding:0 5%">
        <el-row class="line-ranking ranking">
          <h1>Papers in Last 5 Years</h1>
          <div class="chart">
            <ve-line
            :data="yearData"
            :settings="yearSettings"
            :extend="yearExtand"
            :loading="load1"
            height="100%"></ve-line>
          </div>
        </el-row>
        <el-row class="bar-ranking ranking"  type="flex" align="middle">
          <el-col :span="6">
            <div class="name">
              <h1><em>Top 10</em><br /> authors with papers cite</h1>
            </div>
          </el-col>
          <el-col :span="16" :offset="1">
            <div class="chart">
              <ve-histogram
              :data="auData" 
              :settings="auSettings"
              :events="auEvents"
              height="100%"
              :loading="load2"
              :extend="auExtend"
              ></ve-histogram>
          </div>
          </el-col>
        </el-row>
        <el-row class="paper-term-ranking ranking"  type="flex" align="middle">
          <el-col :span="8">
            <div class="name">
              <h2><em>Top 10</em><br /> authors with papers cite</h2>
              <div class="chart">
                <ve-ring 
                class="load-c"
                :data="paperData"
                :settings="paperSettings"
                :events="paperExtand"
                :loading="load3"
                :legend-visible="false"
                height="100%">
                </ve-ring>
              </div>
            </div>
          </el-col>
          <el-col :span="14" :offset="2" display="flex">
            <h2><em>HOOOOOOOT </em> terms!</h2>

          </el-col>
        </el-row>
            <div class="chart word-cloud">
               <ve-wordcloud
               class="load-c"
               :data="termData"
               :settings="termSettings"
               :loading="load4"></ve-wordcloud>
          </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "../components/Header.vue"
import {getRequest} from "../utils/request.js"
import 'v-charts/lib/style.css';

export default {
    name: 'Ranking',
    components:{
      MyHeader,
    },
  data () {
      this.auSettings = {
        stack: { 'Papers': ['Paper1','Paper2','Paper3','Paper4','Paper5'] },
      }
      this.yearSettings ={
        area: true
      }
      this.paperSettings ={
        radius: ['88%', '75%'],
        // offsetY:'-1%',
        // roseType:'area',
        label:{
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        }
      }
      this.termSettings ={
        color: [
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
            "#6699FF",
            "#ff6666",
            "#3cb371",
            "#d5b158",
            "#38b6b6"
        ],
         shape: 'circle'

      }
      this.auExtend = {
        textStyle:{
          color: 'white',
        },
          color: [
            "#516b91",
            "#59c4e6",
            "#edafda",
            "#93b7e3",
            "#a5e7f0",
            "#cbb0e3"
        ],
      }
      this.yearExtand={
        textStyle:{
          color: 'white',
        },
        "color":[
            "#a5e7f0",
            "#516b91",
            "#59c4e6",
            "#edafda",
            "#93b7e3",
            "#cbb0e3"],
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      }
      this.paperExtand = {
         color: [
            "#516b91",
            "#59c4e6",
            "#edafda",
            "#93b7e3",
            "#a5e7f0",
            "#cbb0e3"
        ],
        textStyle:{
          color: 'white',
        }
      }

      var self = this;
      this.auEvents = {
        click: function(e){
          self.getClick(e)
        },
        dblclick : function (e) {
          self.name = e.type
          console.log("db")
        }
      };

      return {
        yearData:{
          columns: ['year', 'count'],
          rows: []
        },
        auData: {
          columns: ['Author','Paper1','Paper2','Paper3','Paper4','Paper5'],
          rows: []
        },
        paperData:{
          columns: ['title','citationCount'],
          rows: []
        },
        termData:{
          columns: ['term', 'count'],
          rows: []
        },
        load1:true,
        load2:true,
        load3:true,
        load4:true,
        // load1:false,
        // load2:false,
        // load3:false,
        // load4:false,
      }
  },
  mounted(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    console.log("outer")
    this.initChart();
  },
    methods: {
      initChart(){
        this.getFir();
        this.getSec();
      },
      getFir(){
        let l=getRequest("/api/report/paper/trend/year");
        let a=getRequest("/api/report/author/rank/paper_cnt")
        let res=Promise.all([l,a]);
        res.then(r=>{
          console.log(r[0].data,r[1].data);
          this.yearData.rows=r[0].data;
          this.load1=false;
          this.auData.rows=r[1].data;
          this.load2=false;
          console.log("fin 1")
        })
      },
      getSec(){
        console.log("beg 2")
        let p=getRequest("/api/report/paper/rank/citation")
        let w=getRequest("/api/report/wdcld/year?year="+2019)
        let res=Promise.all([p,w]);
        res.then(r=>{
          console.log(r[0].data,r[1].data);
          // this.paperData.rows=r[0].data;

          this.load3=false;
          this.termData.rows=r[1].data;
          this.load4=false;
          console.log("fin 2")
        })
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

h1{
  font-size:220%;
  margin:0;
}
em{
  font-size:150%;
  color:rgb(255, 253, 108);
}
.main{
  color:white;
  height: 100%;
  overflow: auto
}
.chart{
  height: 450px;
}
.chart>>>.v-charts-component-loading {
  background-color: rgba(0, 0, 0, 0) ; 
}
.ranking{
  margin:1% 0;
}
.bar-ranking{
  overflow: hidden;
}

.bar-ranking .name{
  margin: 0 0 13% 0;
}
.word-cloud{
  height: 1000px;
  width: 100%;
}
</style>
          // for (let i=0; i < 6; i++) {
          //   let item=r[0].data[i];
          //   this.yearData.rows.push({
          //     'year':item.year.toString(),
          //     'count':item.count.toString()
          //   })
          // }
          // console.log("year",this.yearData)
          // this.load1=false;
          // this.auData.rows=r[1].data;



          //         for(let i = 0; i<10; i++){
          // this.auData.rows.push({
          //   'Author':'SM',
          //   'Paper1':Math.ceil(Math.random()*1000).toString(),
          //   'Paper2':Math.ceil(Math.random()*1000).toString(),
          //   'Paper3':Math.ceil(Math.random()*1000).toString(),
          //   'Paper4':Math.ceil(Math.random()*1000).toString(),
          //   'Paper5':Math.ceil(Math.random()*1000).toString(),
            // 'Paper1':Math.ceil(Math.random()*1000),
            // 'Paper2':Math.ceil(Math.random()*1000),
            // 'Paper3':Math.ceil(Math.random()*1000),
            // 'Paper4':Math.ceil(Math.random()*1000),
            // 'Paper5':Math.ceil(Math.random()*1000),
          })
        }