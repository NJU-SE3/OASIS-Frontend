<template>
  <div class="card">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>Relations</span>
    </div>
    <div class="graph" v-loading="loading">
      <ve-wordcloud class="word-cloud"
        :data="wordData"
        :settings="wordSettings"
        :extend="wordExtend">
      </ve-wordcloud>
    </div>
  </div>
</template>

<script>
    export default {
      name: "graph-card",
      props: {
        data: Array,
      },
      data () {
        return {
          loading: false,
          wordSettings:{
            "color": [
              "#c12e34",
              "#e6b600",
              "#0098d9",
              "#e01f54",
              "#38b6b6",
              "#8c6ac4",
              "#2b821d",
              "#005eaa",
              "#339ca8",
              "#cda819",
              "#32a487",
            ],
            sizeMin: 1,
            sizeMax: 40
          },
          wordExtend:{
            series: {
              width: '100%',
              height: '100%',
              gridSize: 10,
            }
          },
        }
      },
      computed:{
        wordData(){
          let d=[]
          for (const item of this.data){
            d.push({
              term: item.fieldName,
              count: item.activeness
            })
          }
          return {
            columns: ['term', 'count'],
            rows:d
            }
        }
      },
      mounted(){
      },
      methods:{
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

  .card{
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: scroll;
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
  /* .card{
    width:100%;
    height:100%;
  } */
  .word-cloud{
    padding:2%;
  }
</style>
