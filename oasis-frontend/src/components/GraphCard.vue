<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>{{graphInfo.type}}</span>
    </div>
    <div class="graph" v-loading="graphInfo.chartData.rows.length <= 0">
      <ve-histogram :data="graphInfo.chartData"
                    :extend="extendSettings"
                    :legend-visible="false"
                    :colors="colors"
                     height="100%"></ve-histogram>
    </div>
  </div>
</template>

<script>
    export default {
      name: "graph-card",
      props: {
        graphInfo: Object,
      },

      data () {
        return {
          // loading: true,
          colors: [ "#93b7e3",],
          extendSettings:{
            series: {
              barMaxWidth: 40,
            }
          },
          cardClass:"normal-card"
        }
      },

      methods: {
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
    overflow-y: hidden;
    overflow-x: hidden;
    /* overflow: auto; */
  }
    .shadow-card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow-y: hidden;
    overflow-x: hidden;
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
    height: 100%;
    width: 100%;
  }

</style>
