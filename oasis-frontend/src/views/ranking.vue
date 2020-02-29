<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0 0">
        <MyHeader @search="search" ></MyHeader>
      </el-header>
      <el-main style="padding:0 5%">
        <el-row class="line-ranking">
          <h1>Papers in Last 5 Years</h1>
          <div class="chart">
            <ve-line class="line-chart"
            :data="yearData"
            :events="auEvents"
            :settings="yearSettings"
            :extend="yearExtand"
            height="100%"></ve-line>
          </div>
        </el-row>
        <el-row class="bar-ranking"  type="flex" align="middle">
          <el-col :span="6">
            <div class="name">
              <h1><em>Top 10</em><br /> authors with papers cite</h1>
            </div>
          </el-col>
          <el-col :span="16" :offset="1">
            <div class="chart">
              <ve-histogram class="bar-chart"
              :data="auData" 
              :settings="auSettings"
              :events="auEvents"
              height="100%"
              :extend="auExtend"
              ></ve-histogram>
          </div>
          </el-col>
        </el-row>
        <el-row class="paper-term-ranking"  type="flex" align="middle">
          <el-col :span="10">
            <div class="name">
              <h2><em>Top 10</em><br /> authors with papers cite</h2>
              <div class="chart">
                <ve-ring 
                :data="paperData"
                :settings="paperSettings"
                :events="paperExtand"
                :legend-visible="false"
                height="100%">
                </ve-ring>
              </div>
            </div>
          </el-col>
          <el-col :span="10" :offset="2" display="flex">
            <h2><em>HOOOOOOOT </em> terms!</h2>
            <div class="chart">
               <ve-wordcloud 
               :data="termData"
               :settings="termSettings"></ve-wordcloud>
          </div>
          </el-col>
        </el-row>
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
        shape:"cardioid",

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
        textStyle:{
          color: 'white',
        },
        // legend: {
        // type: 'scroll',
        // bottom: 2
        // }
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
        auData: {
          columns: ['Author','Paper1','Paper2','Paper3','Paper4','Paper5'],
          rows: []
        },
        yearData:{
          columns: ['Year', 'Amount'],
          rows: []
        },
        paperData:{
          columns: ['Title','Cite'],
          rows: []
        },
        termData:{
          columns: ['word', 'count'],
          rows: []
        }
        ,
      }
  },
  mounted(){
    this.initChart();
    console.log(this.yearData)
  },
    methods: {
      initChart(){
        for (let i =0; i<10 ;i++){
        this.auData.rows.push({
          'Author':"Smith.J",
          'Paper1':Math.ceil(Math.random()*1000),
          'Paper2':Math.ceil(Math.random()*1000),
          'Paper3':Math.ceil(Math.random()*1000),
          'Paper4':Math.ceil(Math.random()*1000),
          'Paper5':Math.ceil(Math.random()*1000),
          });
        this.paperData.rows.push({
          'Title':'a long long long long name'+Math.ceil(Math.random()*100),
          'Cite':Math.ceil(Math.random()*1000)
        })
        };
        var a=0,y=2014;
        for (let i=0; i<5 ;i++){
          a=a+Math.ceil(Math.random()*1000)
          y+=1
          this.yearData.rows.push({
            'Year':y.toString(),
            'Amount':a.toString(),
          })
        };
        this.termData.rows=[{
            'word': 'visualMap',
            'count': 22199
          }, {
            'word': 'continuous',
            'count': 10288
          }, {
            'word': 'contoller',
            'count': 620
          }, {
            'word': 'series',
            'count': 274470
          }, {
            'word': 'gauge',
            'count': 12311
          }, {
            'word': 'detail',
            'count': 1206
          }, {
            'word': 'piecewise',
            'count': 4885
          }, {
            'word': 'textStyle',
            'count': 32294
          }, {
            'word': 'markPoint',
            'count': 18574
          }, {
            'word': 'pie',
            'count': 38929
          }, {
            'word': 'roseType',
            'count': 969
          }, {
            'word': 'label',
            'count': 37517
          }, {
            'word': 'emphasis',
            'count': 12053
          }, {
            'word': 'yAxis',
            'count': 57299
          }, {
            'word': 'name',
            'count': 15418
          }, {
            'word': 'type',
            'count': 22905
          }, {
            'word': 'gridIndex',
            'count': 5146
          }, {
            'word': 'normal',
            'count': 49487
          }, {
            'word': 'itemStyle',
            'count': 33837
          }, {
            'word': 'min',
            'count': 4500
          }, {
            'word': 'silent',
            'count': 5744
          }, {
            'word': 'animation',
            'count': 4840
          }, {
            'word': 'offsetCenter',
            'count': 232
          }, {
            'word': 'inverse',
            'count': 3706
          }, {
            'word': 'borderColor',
            'count': 4812
          }, {
            'word': 'markLine',
            'count': 16578
          }, {
            'word': 'line',
            'count': 76970
          }, {
            'word': 'radiusAxis',
            'count': 6704
          }, {
            'word': 'radar',
            'count': 15964
          }, {
            'word': 'data',
            'count': 60679
          }, {
            'word': 'dataZoom',
            'count': 24347
          }, {
            'word': 'tooltip',
            'count': 43420
          }, {
            'word': 'toolbox',
            'count': 25222
          }, {
            'word': 'geo',
            'count': 16904
          }, {
            'word': 'parallelAxis',
            'count': 4029
          },
           {
            'word': 'contoller',
            'count': 620
          }, {
            'word': 'series',
            'count': 274470
          }, {
            'word': 'gauge',
            'count': 12311
          }, {
            'word': 'detail',
            'count': 1206
          }, {
            'word': 'piecewise',
            'count': 4885
          }, {
            'word': 'textStyle',
            'count': 32294
          }, {
            'word': 'markPoint',
            'count': 18574
          }, {
            'word': 'pie',
            'count': 38929
          }, {
            'word': 'roseType',
            'count': 969
          }, {
            'word': 'label',
            'count': 37517
          }, {
            'word': 'emphasis',
            'count': 12053
          }, {
            'word': 'yAxis',
            'count': 57299
          }, {
            'word': 'name',
            'count': 15418
          }, {
            'word': 'type',
            'count': 22905
          }, {
            'word': 'gridIndex',
            'count': 5146
          }, {
            'word': 'normal',
            'count': 49487
          }, {
            'word': 'itemStyle',
            'count': 33837
          }, {
            'word': 'min',
            'count': 4500
          }, {
            'word': 'silent',
            'count': 5744
          }, {
            'word': 'animation',
            'count': 4840
          }, {
            'word': 'offsetCenter',
            'count': 232
          }, {
            'word': 'inverse',
            'count': 3706
          }, {
            'word': 'borderColor',
            'count': 4812
          }, {
            'word': 'markLine',
            'count': 16578
          }, {
            'word': 'line',
            'count': 76970
          }, {
            'word': 'radiusAxis',
            'count': 6704
          }, {
            'word': 'radar',
            'count': 15964
          }, {
            'word': 'data',
            'count': 60679
          }, {
            'word': 'dataZoom',
            'count': 24347
          }, {
            'word': 'tooltip',
            'count': 43420
          }, {
            'word': 'toolbox',
            'count': 25222
          }, {
            'word': 'geo',
            'count': 16904
          }, {
            'word': 'parallelAxis',
            'count': 4029
          },
           {
            'word': 'contoller',
            'count': 620
          }, {
            'word': 'series',
            'count': 274470
          }, {
            'word': 'gauge',
            'count': 12311
          }, {
            'word': 'detail',
            'count': 1206
          }, {
            'word': 'piecewise',
            'count': 4885
          }, {
            'word': 'textStyle',
            'count': 32294
          }, {
            'word': 'markPoint',
            'count': 18574
          }, {
            'word': 'pie',
            'count': 38929
          }, {
            'word': 'roseType',
            'count': 969
          }, {
            'word': 'label',
            'count': 37517
          }, {
            'word': 'emphasis',
            'count': 12053
          }, {
            'word': 'yAxis',
            'count': 57299
          }, {
            'word': 'name',
            'count': 15418
          }, {
            'word': 'type',
            'count': 22905
          }, {
            'word': 'gridIndex',
            'count': 5146
          }, {
            'word': 'normal',
            'count': 49487
          }, {
            'word': 'itemStyle',
            'count': 33837
          }, {
            'word': 'min',
            'count': 4500
          }, {
            'word': 'silent',
            'count': 5744
          }, {
            'word': 'animation',
            'count': 4840
          }, {
            'word': 'offsetCenter',
            'count': 232
          }, {
            'word': 'inverse',
            'count': 3706
          }, {
            'word': 'borderColor',
            'count': 4812
          }, {
            'word': 'markLine',
            'count': 16578
          }, {
            'word': 'line',
            'count': 76970
          }, {
            'word': 'radiusAxis',
            'count': 6704
          }, {
            'word': 'radar',
            'count': 15964
          }, {
            'word': 'data',
            'count': 60679
          }, {
            'word': 'dataZoom',
            'count': 24347
          }, {
            'word': 'tooltip',
            'count': 43420
          }, {
            'word': 'toolbox',
            'count': 25222
          }, {
            'word': 'geo',
            'count': 16904
          }, {
            'word': 'parallelAxis',
            'count': 4029
          },
           {
            'word': 'contoller',
            'count': 620
          }, {
            'word': 'series',
            'count': 274470
          }, {
            'word': 'gauge',
            'count': 12311
          }, {
            'word': 'detail',
            'count': 1206
          }, {
            'word': 'piecewise',
            'count': 4885
          }, {
            'word': 'textStyle',
            'count': 32294
          }, {
            'word': 'markPoint',
            'count': 18574
          }, {
            'word': 'pie',
            'count': 38929
          }, {
            'word': 'roseType',
            'count': 969
          }, {
            'word': 'label',
            'count': 37517
          }, {
            'word': 'emphasis',
            'count': 12053
          }, {
            'word': 'yAxis',
            'count': 57299
          }, {
            'word': 'name',
            'count': 15418
          }, {
            'word': 'type',
            'count': 22905
          }, {
            'word': 'gridIndex',
            'count': 5146
          }, {
            'word': 'normal',
            'count': 49487
          }, {
            'word': 'itemStyle',
            'count': 33837
          }, {
            'word': 'min',
            'count': 4500
          }, {
            'word': 'silent',
            'count': 5744
          }, {
            'word': 'animation',
            'count': 4840
          }, {
            'word': 'offsetCenter',
            'count': 232
          }, {
            'word': 'inverse',
            'count': 3706
          }, {
            'word': 'borderColor',
            'count': 4812
          }, {
            'word': 'markLine',
            'count': 16578
          }, {
            'word': 'line',
            'count': 76970
          }, {
            'word': 'radiusAxis',
            'count': 6704
          }, {
            'word': 'radar',
            'count': 15964
          }, {
            'word': 'data',
            'count': 60679
          }, {
            'word': 'dataZoom',
            'count': 24347
          }, {
            'word': 'tooltip',
            'count': 43420
          }, {
            'word': 'toolbox',
            'count': 25222
          }, {
            'word': 'geo',
            'count': 16904
          }, {
            'word': 'parallelAxis',
            'count': 4029
          },
           {
            'word': 'contoller',
            'count': 620
          }, {
            'word': 'series',
            'count': 274470
          }, {
            'word': 'gauge',
            'count': 12311
          }, {
            'word': 'detail',
            'count': 1206
          }, {
            'word': 'piecewise',
            'count': 4885
          }, {
            'word': 'textStyle',
            'count': 32294
          }, {
            'word': 'markPoint',
            'count': 18574
          }, {
            'word': 'pie',
            'count': 38929
          }, {
            'word': 'roseType',
            'count': 969
          }, {
            'word': 'label',
            'count': 37517
          }, {
            'word': 'emphasis',
            'count': 12053
          }, {
            'word': 'yAxis',
            'count': 57299
          }, {
            'word': 'name',
            'count': 15418
          }, {
            'word': 'type',
            'count': 22905
          }, {
            'word': 'gridIndex',
            'count': 5146
          }, {
            'word': 'normal',
            'count': 49487
          }, {
            'word': 'itemStyle',
            'count': 33837
          }, {
            'word': 'min',
            'count': 4500
          }, {
            'word': 'silent',
            'count': 5744
          }, {
            'word': 'animation',
            'count': 4840
          }, {
            'word': 'offsetCenter',
            'count': 232
          }, {
            'word': 'inverse',
            'count': 3706
          }, {
            'word': 'borderColor',
            'count': 4812
          }, {
            'word': 'markLine',
            'count': 16578
          }, {
            'word': 'line',
            'count': 76970
          }, {
            'word': 'radiusAxis',
            'count': 6704
          }, {
            'word': 'radar',
            'count': 15964
          }, {
            'word': 'data',
            'count': 60679
          }, {
            'word': 'dataZoom',
            'count': 24347
          }, {
            'word': 'tooltip',
            'count': 43420
          }, {
            'word': 'toolbox',
            'count': 25222
          }, {
            'word': 'geo',
            'count': 16904
          }, {
            'word': 'parallelAxis',
            'count': 4029
          },
           {
            'word': 'contoller',
            'count': 620
          }, {
            'word': 'series',
            'count': 274470
          }, {
            'word': 'gauge',
            'count': 12311
          }, {
            'word': 'detail',
            'count': 1206
          }, {
            'word': 'piecewise',
            'count': 4885
          }, {
            'word': 'textStyle',
            'count': 32294
          }, {
            'word': 'markPoint',
            'count': 18574
          }, {
            'word': 'pie',
            'count': 38929
          }, {
            'word': 'roseType',
            'count': 969
          }, {
            'word': 'label',
            'count': 37517
          }, {
            'word': 'emphasis',
            'count': 12053
          }, {
            'word': 'yAxis',
            'count': 57299
          }, {
            'word': 'name',
            'count': 15418
          }, {
            'word': 'type',
            'count': 22905
          }, {
            'word': 'gridIndex',
            'count': 5146
          }, {
            'word': 'normal',
            'count': 49487
          }, {
            'word': 'itemStyle',
            'count': 33837
          }, {
            'word': 'min',
            'count': 4500
          }, {
            'word': 'silent',
            'count': 5744
          }, {
            'word': 'animation',
            'count': 4840
          }, {
            'word': 'offsetCenter',
            'count': 232
          }, {
            'word': 'inverse',
            'count': 3706
          }, {
            'word': 'borderColor',
            'count': 4812
          }, {
            'word': 'markLine',
            'count': 16578
          }, {
            'word': 'line',
            'count': 76970
          }, {
            'word': 'radiusAxis',
            'count': 6704
          }, {
            'word': 'radar',
            'count': 15964
          }, {
            'word': 'data',
            'count': 60679
          }, {
            'word': 'dataZoom',
            'count': 24347
          }, {
            'word': 'tooltip',
            'count': 43420
          }, {
            'word': 'toolbox',
            'count': 25222
          }, {
            'word': 'geo',
            'count': 16904
          }, {
            'word': 'parallelAxis',
            'count': 4029
          }
          , {
            'word': 'contoller',
            'count': 620
          }, {
            'word': 'series',
            'count': 274470
          }, {
            'word': 'gauge',
            'count': 12311
          }, {
            'word': 'detail',
            'count': 1206
          }, {
            'word': 'piecewise',
            'count': 4885
          }, {
            'word': 'textStyle',
            'count': 32294
          }, {
            'word': 'markPoint',
            'count': 18574
          }, {
            'word': 'pie',
            'count': 38929
          }, {
            'word': 'roseType',
            'count': 969
          }, {
            'word': 'label',
            'count': 37517
          }, {
            'word': 'emphasis',
            'count': 12053
          }, {
            'word': 'yAxis',
            'count': 57299
          }, {
            'word': 'name',
            'count': 15418
          }, {
            'word': 'type',
            'count': 22905
          }, {
            'word': 'gridIndex',
            'count': 5146
          }, {
            'word': 'normal',
            'count': 49487
          }, {
            'word': 'itemStyle',
            'count': 33837
          }, {
            'word': 'min',
            'count': 4500
          }, {
            'word': 'silent',
            'count': 5744
          }, {
            'word': 'animation',
            'count': 4840
          }, {
            'word': 'offsetCenter',
            'count': 232
          }, {
            'word': 'inverse',
            'count': 3706
          }, {
            'word': 'borderColor',
            'count': 4812
          }, {
            'word': 'markLine',
            'count': 16578
          }, {
            'word': 'line',
            'count': 76970
          }, {
            'word': 'radiusAxis',
            'count': 6704
          }, {
            'word': 'radar',
            'count': 15964
          }, {
            'word': 'data',
            'count': 60679
          }, {
            'word': 'dataZoom',
            'count': 24347
          }, {
            'word': 'tooltip',
            'count': 43420
          }, {
            'word': 'toolbox',
            'count': 25222
          }, {
            'word': 'geo',
            'count': 16904
          }, {
            'word': 'parallelAxis',
            'count': 4029
          }]
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
}
.chart{
  height: 450px;
}
.bar-ranking{
  overflow: hidden;
}

.bar-ranking .name{
  margin: 0 0 13% 0;
}
</style>
