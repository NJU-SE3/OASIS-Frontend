<template>
  <div class="card">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>Relations</span>
    </div>
    <div class="graph" v-loading="loading">
      <ve-wordcloud
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
        data: Object,
      },

      data () {
        return {
          loading: false,
          wordSettings:{
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
          },
          wordExtend:{
            series: {
              width: '100%',
              height: '100%',
              gridSize: 10,
            }
          },
          wordData:{

          }
        }
      },
      mounted(){
        this.getData()
      },
      methods:{
        getData(){
          console.log(this.data)
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

</style>
