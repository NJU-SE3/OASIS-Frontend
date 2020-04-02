<template>
    <div class="test_graph">
        <div id="graph" style="width: 100%;height:700px;"></div>
    </div>
</template>

<script>
import {getRequest} from "../utils/request.js"

export default {
    name: "Graph",
    data(){
        return {
            relations: [
                {
                    center:'Little Bai',
                    node:'A',
                    value:'100'
                },
                {
                    center:'Little Bai',
                    node:'B',
                    value:'10'
                },
                                {
                    center:'Little Bai',
                    node:'C',
                    value:'40'
                },
                                {
                    center:'Little Bai',
                    node:'D',
                    value:'90'
                },
                                {
                    center:'Little Bai',
                    node:'E',
                    value:'60'
                },
                                {
                    center:'Little Bai',
                    node:'F',
                    value:'50'
                },
                                {
                    center:'Little Bai',
                    node:'G',
                    value:'30'
                },

                                {
                    center:'Little Bai',
                    node:'Xue junjun',
                    value:'130'
                },
            ],
            id:"5e7a20d1b04a431b0988beb4",
            names:[],
            edges:[],
            nodes:[]
        }
    },
      methods: {
        drawChart() {
        var echarts = require('echarts/lib/echarts');
        require('echarts/lib/chart/graph');
        require('echarts/lib/component/tooltip');
        require('echarts/lib/component/title');
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("graph"));
        // 指定图表的配置项和数据
        // this.getData()
        let option = {
        title: {
            text: 'Graph 简单示例'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
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
                    repulsion :2000
                },
                draggable:true,
                // focusNodeAdjacency:true,
                symbolSize: 50,
                roam:'scale',
                // symbolSize :[10,100],
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                label: {
                    show: true
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                data:this.names,
                links:this.edges,
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0.2
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    getData(){
        let names=[]
        let edges=[]
        // console.log(this.relations)
        let node={
            name:this.relations[0].center,
            value:150,
            symbolSize:150
        }
        names.push(node)
        for (let i=0; i<this.relations.length; i++){
            let item=this.relations[i]
            let n={
                name:item.node,
                value:item.value,
                symbolSize:item.value
            }
            names.push(n)
            let l={
                source:item.center,
                target:item.node,
                value:item.value
            }
            edges.push(l)
        }

        this.names=names
        this.edges=edges
    },
    getRealData(){
        let res= getRequest("/api/graph/affiliation/?id="+this.id)
        return res
    }
  },
  mounted() {
    let get=this.getRealData()
    get.then(res=>{
        //保存nodes列表对应关系
        this.nodes=res.data.nodes
        let nodes=[]
        for (const node of res.data.nodes){
            console.log("node",node)
            let n={
                name:node.affiliationName,
                value:node.affiliationName.length
            }
            nodes.push(n)
        }
        this.names=nodes
        let edges=[]
        const center=this.nodes.findIndex(n => n.id==res.data.edges[0].begin)
        for (const edge of res.data.edges){
            console.log("aaa",edge)
            const tar=this.nodes.findIndex(n => n.id==edge.end)
            let e={
                source: center,
                target: tar
            }
            edges.push(e)
        }
        this.edges=edges
        console.log("node",this.names)
        console.log("edge",this.edges)
        this.drawChart();

    })

  }
}

</script>

<style scoped>
#graph {
    background-color:paleturquoise;
}
</style>