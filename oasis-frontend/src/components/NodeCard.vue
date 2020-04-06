<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>Relations</span>
    </div>
    <div class="graph" v-loading="info == null">
      <div :id="graphId" class="node-graph"></div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/graph');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
    export default {
      name: "node-card",
      props: {
        nodes:Array,
        links:Array,
        type:String,
      },
      data () {
        return {
          settings:{
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            tooltip:{
              trigger:"item",
              enterable:"ture",
              confine:"ture",
              textStyle:{
                fontSize:18
              },
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              extraCssText:'width:10em; white-space:pre-wrap',
              formatter(node){
                if(node.dataType=="node"){
                  // console.log("node",node)
                  return `<div style="border-bottom: 1px solid rgba(255,255,255,.3);f
                  ont-size: 22px;padding-bottom: 7px;margin-bottom: 7px"
                  >${node.data.name}</div><div 
                  class="tool-content" style="font-size: 18px; text-align:left;
                  "><strong>Activiness: </strong>${node.data.value}</div>`;
                }
              },
            },
            series: [
              {
                type: 'graph',
                // legendHoverLink :true,
                // coordinateSystem:'none',
                // hoverAnimation:true,
                layout: 'force',
                force:{
                    edgeLength : [100,600],
                    initLayout:'circular',
                    repulsion :50,
                    edgeLength:[1,100]
                },
                draggable:true,
                roam:'scale',
                symbolSize:10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                label: {
                    show: true
                },
                // edgeSymbol: ['circle', 'arrow'],
                // edgeSymbolSize: [4, 10],
                // edgeLabel: {
                //     fontSize: 20
                // },
                data:this.names,
                links:this.edges,
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0.2
                }
              }
            ]
          },
          graphId:"",
          info:null,
          names:[],
          edges:[],
          cardClass:"normal-card"
        }
      },
      watch:{
        nodes:function(oldN,newN){
          this.getData()
          this.myChart.setOption({
            series:[
              {
                type: 'graph',
                data:this.names,
                edges:this.edges
              }
            ]
          })
          this.info="a"
        }
      },
      created(){
        this.graphId=Date.now().toString(36)
      },
      mounted(){
        this.init()
      },
      methods:{
        init(){
          this.myChart = echarts.init(document.getElementById(this.graphId))
          this.myChart.setOption(this.settings)
        },
        getData(){
          let nodeList=[]
          let curN=this.type+"Name"
          console.log("curN",curN)
          for (const node of this.nodes){
              let n={
                  name:node[curN],
                  value:node.activeness,
                  label:{
                    show:false
                  },
                  symbolSize:Math.ceil(Math.log(node.activeness+2))*5,
                }
              nodeList.push(n)
          }
          this.names=nodeList
          let edgeList=[]
          const center=this.nodes.findIndex(n => n.id==this.links[0].begin)
          for (const edge of this.links){
              const tar=this.nodes.findIndex(n => n.id==edge.end)
              let e={
                  source: center,
                  target: tar,
                  value:this.nodes[tar].activeness+2
              }
              edgeList.push(e)
          }
          this.edges=edgeList
          // console.log("node",this.names)
          // console.log("edge",this.edges)
        },
        shadow(){
          this.cardClass="shadow-card"
        },
        normal(){
          this.cardClass="normal-card"
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
    border-radius:10px;
    background: #b4bccc;
  }

  .normal-card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: scroll;
  }
  .shadow-card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: scroll;
    box-shadow: 6px 6px 12px 0 rgba(253, 253, 253, 0.726)
    /* overflow: auto; */
  }

  .title{
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
  .graph{
    width:100%;
    height:100%;
  }
  .node-graph{
    /* width:500px;
    height:400px; */
    width:100%;
    height:100%;
  }
</style>