<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>Main Fields</span>
    </div>
    <div class="graph" v-if="chartData == null">
      Sorry, Currently Unavailable!
    </div>
    <div class="graph" v-if="chartData != null" v-loading="loading">
      <ve-pie :data="chartData"
              :legend-visible="false"
              :settings="chartSettings"
              :extend="chartExtend"></ve-pie>
    </div>
  </div>
</template>

<script>
    export default {
        name: "pie-chart-card",

      props: {
        chartData: Object,
      },

      data() {
        this.chartSettings = {
          offsetY: 150,
        }
        this.chartExtend={
          color:[
                        "#c12e34",
            "#e6b600",
            "#0098d9",
            "#2b821d",
            "#005eaa",
            "#339ca8",
            "#cda819",
            "#32a487",
            "#52bfff",
            "#ff984d",
            "#d082f5",
            "#7cfe78",
            "#76f2f2",
            "#c1232b",
            "#fcce10",
            "#f5e8c8",
            ],
        }
          return{
            loading: false,
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
  /* .card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: hidden;
  } */
  .normal-card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: hidden;
  }
  .shadow-card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: hidden;
    box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.5)
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
    width:95%;
    height: 90%;
  }
  .graph-error{
    padding-top: 100px;
  }
</style>
