<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0 0">
        <MyHeader></MyHeader>
      </el-header>
      <el-main style="padding:0 5%">
        <el-row class="line-ranking ranking">
          <h1><strong>Papers </strong>   in Last 6    <strong> Years</strong></h1>
          <div class="chart">
            <ve-line
            :data="yearData"
            :settings="yearSettings"
            :extend="yearExtend"
            :loading="load1"
            height="100%"></ve-line>
          </div>
        </el-row>
        <el-row class="bar-ranking ranking"  type="flex" align="middle">
          <el-col :span="6">
            <div class="name">
              <h1><strong>Top 10</strong><br /> authors with papers cite</h1>
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
          <el-col :span="12">
              <div class="chart" id="ring">
                <ve-ring id="v-ring"
                :data="paperData"
                :settings="paperSettings"
                :extend="paperExtend"
                :events="paperEvents"
                :loading="load3"
                :legend-visible="false"
                height="100%">
                  <h2 id="ring-name"><strong>Top 10</strong><br /> cited papers <br /><em>↖click the ring for more↘</em></h2>
                </ve-ring>
              </div>
          </el-col>
          <el-col :span="11" display="flex">
            <h2><strong>HOOOOOOOOOOT！ </strong><br />terms in  <select id="year-select" v-model="termY" @change="getNew">
              <option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></option>
            </select></h2>
              <div class="chart" id="word-cloud">
               <ve-wordcloud
               :data="termData"
               :settings="termSettings"
               :extend="termExtend"
               :loading="load4">
               </ve-wordcloud>
          </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "../components/Header.vue"
import {getRequest} from "../utils/request.js"
import 'v-charts/lib/style.css';
import echarts from 'echarts/lib/echarts'
import bus from "../utils/bus"

export default {
    name: 'Ranking',
    components:{
      MyHeader,
    },
  data () {
      var self = this;
      var colors=[
            "#516b91",
            "#59c4e6",
            "#edafda",
            "#93b7e3",
            "#a5e7f0",
            "#cbb0e3"];
      var emphasisStyle = {
        itemStyle: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
      };

    //Year
      this.yearSettings ={
        area: true,
      }
      this.yearExtend={
        textStyle:{
          color: 'white',
          fontSize:'10'
        },
        color:['#5682c8'],
        animation: true ,
        series: {
          label: {
            normal: {
              show: true
            }
          },
          lineStyle:{
            width:'3'
          },
          areaStyle:{
            color:new echarts.graphic.LinearGradient(0,0,1,0, [
              { offset: 0,  color: "#345379"},
              { offset: 0.2, color: "#59c4e6",},
              { offset: 0.4, color: "#9179cb",},
              { offset: 0.6, color: "#edafda",},
              { offset: 0.8, color: "#a5e7f0",},
              { offset: 1, color: "#ffa0dd",},
              ],)
          },
        }
      }


    //Author
      this.auSettings = {
        stack: { 'Papers': ['Paper1','Paper2','Paper3','Paper4','Paper5'] },
      }
      this.auExtend = {
        textStyle:{
          color: 'white',
        },
        color:colors,
        series:{
          emphasis:emphasisStyle,
        },
        tooltip:{
          trigger:"item",
          enterable:"ture",
          confine:"ture",
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          extraCssText:'width:25em; white-space:pre-wrap',
          formatter: function (obj) {
            let au=obj.dataIndex;
            let paper=obj.componentIndex;
            return `<div style="border-bottom: 1px solid rgba(255,255,255,.3);font-size: 22px;padding-bottom: 7px;margin-bottom: 7px">${self.authors[au].papers[paper].title}</div><div class="tool-content" style="font-size: 18px; text-align:left;"><strong>Author: </strong>${self.authors[au].papers[paper].authors}<br /><strong>Year: </strong>${self.authors[au].papers[paper].year}<br /><strong>Citation: </strong>${self.authors[au].papers[paper].citationCount}</div>`;
            }
          }
        }
      this.auEvents = {
        click: function(e){
          self.auClick(e)
        }
      };



    //Paper
      this.paperSettings ={
        radius: ['80%', '95%'],
        offsetY:'50%',
        // roseType:'area',
        label:{
          show:false,
        },
      }
      this.paperExtend={
        tooltip:{
          trigger:"item",
          enterable:"ture",
          confine:"ture",
          padding: 10,
          backgroundColor:'#222',
          borderColor: '#777',
          borderWidth: 1,
          extraCssText:'width:25em; white-space:pre-wrap',
          formatter: function (obj) {
            let p=obj.dataIndex;
            return `<div style="border-bottom: 1px solid rgba(255,255,255,.3);font-size: 22px;padding-bottom: 7px;margin-bottom: 7px">${self.paperData.rows[p].title}</div><div class="tool-content"style="font-size: 18px; text-align:left;"><strong>Author: </strong>${self.paperData.rows[p].authors}<br /><strong>Year: </strong>${self.paperData.rows[p].year}<br /><strong>Citation:</strong>${self.paperData.rows[p].citationCount}</div>`;
          }
        },
        color:colors
      }
      this.paperEvents = {
        click: function(e){
          self.paClick(e)
        }
      }


    //Terms
      this.termSettings ={
        "color": [
            "#6aa9ff",
            "#59c4e6",
            "#edafda",
            "#93b7e3",
            "#a5e7f0",
            "#cbb0e3",
            "#b884b3",
            "#74e3ff",
            "#ddb4ff",
            "#ff68b5",
            "#85e3d7",
            "#5aaef0",
            "#fd94d1"
        ],
      }

      this.termExtend={
        series: {
          width: '100%',
          height: '100%',
          gridSize: 10,
        }
      }


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
        authors:[],
        termY:"2019",
          options: [{
          value: '2013',
          label: '2013'
        }, {
          value: '2015',
          label: '2015'
        }, {
          value: '2016',
          label: '2016'
        }, {
          value: '2017',
          label: '2017'
        }, {
          value: '2018',
          label: '2018'
        },{
          value: '2019',
          label: '2019'
        }],


        keywords: ""
      }
  },
  mounted(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.initChart();
  },

    methods: {
      initChart(){
        this.getFir();
        this.getSec();
        this.getTrd();
      },
      getFir(){
        let l=getRequest("/api/report/paper/trend/year");
        // let res=Promise.all([l,a]);
        l.then(r=>{
          this.yearData.rows=r.data;
          this.load1=false;
          console.log("fin 1")
        })
      },
      getSec(){
        getRequest("/api/report/author/rank/paper_cnt").then(r=>{
          console.log("rrr",r);
          let l=[];
          for(var i=0; i<10 ; i++){
            let len=5-r.data[i].papers.length
            for (let  j=0; j< len; j++){
                console.log('A')
                r.data[i].papers.push({
                  'citationCount':'0'
                })
            }
            console.log(i,r.data[i].papers)
            l.push({
              'Author':r.data[i].author,
              'Paper1':r.data[i].papers[0].citationCount,
              'Paper2':r.data[i].papers[1].citationCount,
              'Paper3':r.data[i].papers[2].citationCount,
              'Paper4':r.data[i].papers[3].citationCount,
              'Paper5':r.data[i].papers[4].citationCount,
            })
          }
          this.auData.rows = l;
          this.authors=r.data;
          this.load2=false;
        })
      },
      getTrd(){
        let p=getRequest("/api/report/paper/rank/citation")
        let w=getRequest("/api/report/wdcld/year?year="+2019)
        let res=Promise.all([p,w]);
        res.then(r=>{
          console.log(r[0].data,r[1].data);
          this.paperData.rows=r[0].data;
          this.load3=false;
          this.termData.rows=r[1].data.slice(1,301);
          this.load4=false;
          console.log("fin 2")
        })
      },

      auClick(e){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        window.location.href = this.authors[e.dataIndex].papers[e.componentIndex].pdfLink
      },
      paClick(e){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        window.location.href = this.paperData.rows[e.dataIndex].pdfLink
      },
      getNew(){
        console.log("new!!",this.termY)
        this.load4=true;
        getRequest("/api/report/wdcld/year?year="+this.termY).then(r=>{
          if(this.termY==2019)
            this.termData.rows=r.data.slice(1,301);
          else
            this.termData.rows=r.data.slice(0,300);
          this.load4=false;
        })
      }
  }
}
</script>
<style scoped>

h1{
  font-size:200%;
  margin:0;
}
h2{
  font-size:150%;
}
strong{
  font-size:150%;
  color:rgb(255, 253, 108);
  font-style:oblique;
}
#ring-name em{
  font-size:80%;
  font-style:normal;
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
.chart>>>.tool-content strong{
  font-size:130%;
  color:rgb(255, 253, 108);
}

#ring{
  height: 600px;;
}
#id{
  height: 500px;
}

#v-ring{
  position: relative;
}
#ring-name{
  position: absolute;
  top:30%;
  width:100%;
  margin: 0 auto 0 auto ;
  /* padding: 0 10%; */
  z-index:-1;
}
#year-select option::-ms-expand{ display: none; }
option{
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari 和 Chrome */
    appearance:none;
}
#year-select{
  background-color:transparent;
  font-size:1em;
  color:white;
  border:none;
}
#year-select option{
  background-color:white;
  color:black;
}
option:hover{
    color:#fff;
    background-color:red;
}
</style>
