<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>Main Fields</span>
    </div>
    <div class="graph" v-loading="loading">
      <ve-pie :data="chartData"
              :legend-visible="false" :settings="chartSettings"></ve-pie>
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
          offsetY: 150
        };
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
    box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.726)
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
</style>
