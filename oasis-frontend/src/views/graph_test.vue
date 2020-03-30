<template>
    <div class="test_graph">
        <div id="graph" style="width: 100%;height:700px;"></div>
    </div>
</template>

<script>
export default {
    name: "Graph",
    data(){
        return {
            myChart:{},
            option:{},
        }
    },
    created() {
        this.init();
    },

    methods: {
        init(){
        this.myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        this.option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
        }
    }
}
</script>

<style scoped>
#graph {
    background-color:paleturquoise;
}
</style>