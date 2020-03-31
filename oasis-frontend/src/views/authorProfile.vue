<template>
  <el-container class="main">
    <el-header class="oasis-header">
      <Header></Header>
    </el-header>
    <el-main>
      <el-row :gutter="15">
        <el-col :span="16"><div class="basic-info">
          <basic-intro-card :intro="basicIntro"></basic-intro-card>
        </div></el-col>
        <el-col :span="8"><div class="basic-info">
          <basic-statistic-card :statistics="basicStatistic"></basic-statistic-card>
        </div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8"><div class="grid-content">
          <graph-card :graphInfo="graphInfos[0]"></graph-card>
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <graph-card :graphInfo="graphInfos[1]"></graph-card>
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <graph-card :graphInfo="graphInfos[2]"></graph-card>
        </div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8"><div class="grid-content">
          <graph-card :graphInfo="graphInfos[3]"></graph-card>
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <graph-card :graphInfo="graphInfos[4]"></graph-card>
        </div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="24"><div class="grid-content">
          <top-ranking-card :topRankingContent="topRankingContent[0]"
                            :pdfLink="true"></top-ranking-card>
        </div></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import Header from "../components/Header";
  import BasicIntroCard from "../components/BasicIntroCard.vue";
  import BasicStatisticCard from "../components/BasicStatisticCard.vue";
  import GraphCard from "../components/GraphCard.vue";
  import TopRankingCard from "../components/TopRankingCard.vue";

  import {getRequest} from "../utils/request"

  export default {
    name: "authorProfile",
    components: {
      TopRankingCard,
      GraphCard,
      BasicStatisticCard,
      BasicIntroCard,
      Header,
      'basic-intro-card': BasicIntroCard,
      'Basic-statistic-card': BasicStatisticCard,
      'graph-card': GraphCard,
      'top-ranking-card': TopRankingCard,
    },

    mounted(){
      this.getBasicInfo();
      this.getTrendInfo();
      this.getTopRankingInfo();
    },

    data() {
      return {
        activenessIcon: "el-icon-star-off",
        documentIcon: "el-icon-document",

        id: "37085783283",
        // id:"37061639100",

        basicStatistic : [],
        basicIntro: {
          name: "",
          introduction: "",
          details: [],
        },

        topRankingContent: [
          {
            type: "Papers",
            startIndex: 1,
            items: [],
          },
        ],

        graphInfoUrlParam: ["activeness","count","citation","heat","H_index"],
        graphInfoType: ["Activeness","Papers","Citation","Heat","H-index"],

        graphInfos: [
          {
            type: "Activeness",
            chartData: {
              columns: ['Year', 'Activeness'],
              rows: []
            },
          },
          {
            type: "Papers",
            chartData: {
              columns: ['Year', 'Papers'],
              rows: []
            },
          },
          {
            type: "Citation",
            chartData: {
              columns: ['Year', 'Citation'],
              rows: []
            },
          },
          {
            type: "Heat",
            chartData: {
              columns: ['Year', 'Heat'],
              rows: []
            },
          },
          {
            type: "H-index",
            chartData: {
              columns: ['Year', 'H-index'],
              rows: []
            },
          },
        ],
      }
    },

    methods: {
      getBasicInfo() {
        getRequest("/api/author/detail?id=" + this.id)
          .then(res => {
            this.basicIntro.name = res.data.authorName;
            this.basicIntro.introduction = res.data.bioParagraphs;
            this.basicIntro.details.push({
              type: "Affiliation",
              value: res.data.affiliationName,
            });

            this.basicStatistic.push(
              {
                icon: this.activenessIcon,
                type: "Activeness",
                value: res.data.activeness
              },
              {
                icon: this.documentIcon,
                type: "Papers",
                value: res.data.paperCount
              },
              {
                icon: this.documentIcon,
                type: "Citation",
                value: res.data.citationCount
              },
              {
                icon: this.documentIcon,
                type: "Heat",
                value: res.data.heat.toFixed(1)
              },
              {
                icon: this.documentIcon,
                type: "H-index",
                value: res.data.H_index
              },
            );
          });
      },

      getTrendInfo(){
        getRequest("/api/report/paper/trend/year?baseline=activeness&refinement=" + this.id)
          .then(res=>{
            res.data.forEach(data=> {
              this.graphInfos[0].chartData.rows
                .push({
                  "Year": parseInt(data.year),
                  "Activeness": parseFloat(data.count).toFixed(1),
                });
            });

          });
        getRequest("/api/report/paper/trend/year?baseline=count&refinement=" + this.id)
          .then(res=>{
            res.data.forEach(data=> {
              this.graphInfos[1].chartData.rows
                .push({
                  "Year": parseInt(data.year),
                  "Papers": parseFloat(data.count).toFixed(1),
                });
            });
          });
        getRequest("/api/report/paper/trend/year?baseline=citation&refinement=" + this.id)
          .then(res=>{
            res.data.forEach(data=> {
              this.graphInfos[2].chartData.rows
                .push({
                  "Year": parseInt(data.year),
                  "Citation": parseFloat(data.count).toFixed(1),
                });
            });
          });
        getRequest("/api/report/paper/trend/year?baseline=heat&refinement=" + this.id)
          .then(res=>{
            res.data.forEach(data=> {
              this.graphInfos[3].chartData.rows
                .push({
                  "Year": parseInt(data.year),
                  "Heat": parseFloat(data.count).toFixed(1),
                });
            });
          });
        getRequest("/api/report/paper/trend/year?baseline=H_index&refinement=" + this.id)
          .then(res=>{
            res.data.forEach(data=> {
              this.graphInfos[4].chartData.rows
                .push({
                  "Year": parseInt(data.year),
                  "H-index": parseFloat(data.count).toFixed(1),
                });
            });
          });
      },

      getTopRankingInfo() {
        getRequest("/api/paper/list?id=" + this.id)
          .then(res=>{
            console.log(res);
            res.data.forEach(item=> {
              this.topRankingContent[0].items.push({
                name: item.title,
                value: item.citationCount,
                id: item.id,
                link: item.pdfLink,
              })
            });
          });
      },
    },
  }
</script>

<style scoped>
  .main{
    color:white;
    /*height: 100%;*/
    overflow: auto
  }

  .oasis-header{
    padding: 0;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

  .basic-info {

  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
