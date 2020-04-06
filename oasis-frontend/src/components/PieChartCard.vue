<template>
  <div class="card">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>Main Fields</span>
    </div>
    <div class="graph" v-loading="loading">
      <ve-pie :data="chartData"
              :legend-visible="false"></ve-pie>
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
          return{
            loading: false,
          }
      }
    }
</script>

<style scoped>
  .card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: hidden;
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
