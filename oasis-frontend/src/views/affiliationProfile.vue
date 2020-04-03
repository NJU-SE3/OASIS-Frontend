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
          :links="nodeInfo.links"></NodeCard>
        </div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12"><div class="grid-content">
          <top-ranking-card :topRankingContent="topRankingContent[0]"
                            :pdfLink="false"></top-ranking-card>
        </div></el-col>
        <el-col :span="12"><div class="grid-content">
          <NodeCard :nodes="nodeInfo.nodes"  
          :links="nodeInfo.links"></NodeCard>
        </div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="24"><div class="grid-content">
          <top-ranking-card :topRankingContent="topRankingContent[1]"
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

  import {getRequest} from "../utils/request"
  import {getTrendInfo} from "../utils/trend"

  export default {
    name: "affiliationProfile",
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
      NodeCard
    },

    mounted() {
      this.getBasicInfo();
      this.getTopRankingInfo();
      getTrendInfo(this.graphInfos, this.id);
      this.getNodeInfo();
    },

    data() {
      return {
        activenessIcon: "el-icon-star-off",
        documentIcon: "el-icon-document",
        authorIcon: "el-icon-user",

        id: "5e7a20d1b04a431b0988beb5",

        basicStatistic : [],
        basicIntro: {
          name: "",
          introduction: "",
          details: [],
        },

        topRankingContent: [
          {
            type: "Authors",
            startIndex: 1,
            items: [],
          },
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
          links:[],
          nodes:[]
        }
      }
    },

    methods: {
      getBasicInfo() {
        getRequest("/api/affiliation/detail?id=" + this.id)
          .then(res => {
            console.log(res);
            this.basicIntro.name = res.data.affiliationName;

            this.basicStatistic.push(
              {
                icon: this.activenessIcon,
                type: "Activeness",
                value: res.data.activeness,
              },
              {
                icon: this.documentIcon,
                type: "Papers",
                value: res.data.paperCount,
              },
              {
                icon: this.documentIcon,
                type: "Citation",
                value: res.data.citationCount,
              },
              {
                icon: this.documentIcon,
                type: "Heat",
                value: res.data.heat.toFixed(1),
              },
              {
                icon: this.documentIcon,
                type: "H-index",
                value: res.data.H_index,
              },
            );

          });
      },

      getTopRankingInfo() {
        getRequest("/api/author/list?refinement=affiliation:" + this.id)
          .then(res=>{
            res.data.forEach(item=> {
              this.topRankingContent[0].items.push({
                name: item.authorName,
                value: item.activeness,
                id: item.id,
              });
            });
          });

        getRequest("/api/paper/list?id=" + this.id)
          .then(res=>{
            console.log(res);
              res.data.forEach(item=> {
                this.topRankingContent[1].items.push({
                  name: item.title,
                  value: item.citationCount,
                  id: item.id,
                  link: item.pdfLink,
                })
              });
          });
      },
      getNodeInfo(){
        getRequest("/api/graph/affiliation/?id="+this.id)
        .then(res=>{
          console.log("in res",res)
          this.nodeInfo.links=res.data.edges
          this.nodeInfo.nodes=res.data.nodes
        })
      }
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
