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
        <el-col :span="8"><div class="grid-content">
          <NodeCard :nodes="nodeInfo.nodes"
          :links="nodeInfo.links"
          type="author"></NodeCard>
        </div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8"><div class="grid-content">
          <pie-chart-card :chartData="pieChartData"></pie-chart-card>
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
  import NodeCard from "../components/NodeCard"
  import PieChartCard from "../components/PieChartCard"

  import {getRequest} from "../utils/request"
  import {getTrendInfo, getPapersForProfile, getPieChartData} from "../utils/profileInfo"

  export default {
    name: "authorProfile",
    components: {
      TopRankingCard,
      GraphCard,
      BasicStatisticCard,
      BasicIntroCard,
      Header,
      NodeCard,
      'basic-intro-card': BasicIntroCard,
      'Basic-statistic-card': BasicStatisticCard,
      'graph-card': GraphCard,
      'top-ranking-card': TopRankingCard,
      'pie-chart-card': PieChartCard,
    },

    mounted(){
      this.id = this.$route.query.id;
      this.getBasicInfo();
      getTrendInfo(this.graphInfos, this.id);
      this.getTopRankingInfo();
      this.getNodeInfo();
      getPieChartData(this.pieChartData, this.id);
    },

    data() {
      return {
        activenessIcon: "el-icon-star-off",
        documentIcon: "el-icon-document",

        id: "37085783283",

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
        nodeInfo:{
          nodes:[],
          links:[]
        },

        pieChartData: {
          columns: ['Fields', 'Proportion'],
          rows: [],
        },
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

      getTopRankingInfo() {
        getPapersForProfile(this.topRankingContent[0], this.id);
      },

      getNodeInfo(){
        getRequest("/api/graph/author/?id="+this.id)
        .then(res=>{
          if (res.status === 200) {
            this.nodeInfo.links = res.data.edges;
            this.nodeInfo.nodes = res.data.nodes;
          }
          else {

          }
        })

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

  .basic-info, .grid-content {
    margin:1% 1%;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin: 1%;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
