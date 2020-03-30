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
          <graph-card :graphInfo="graphInfo1"></graph-card>
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <graph-card :graphInfo="graphInfo2"></graph-card>
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <graph-card :graphInfo="graphInfo3"></graph-card>
        </div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12"><div class="grid-content">
          <top-ranking-card :topRankingContent="topRankingContent1"></top-ranking-card>
        </div></el-col>
        <el-col :span="12"><div class="grid-content">
          <top-ranking-card :topRankingContent="topRankingContent2"></top-ranking-card>
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
    },

    mounted() {
      this.getBasicInfo();
    },

    data() {
      return {
        activenessIcon: "el-icon-star-off",
        documentIcon: "el-icon-document",
        authorIcon: "el-icon-user",

        basicStatistic : [],
        basicIntro: {
          name: "",
          introduction: "",
          details: [],
        },

        topRankingContent1: {
          type: "Author",
          startIndex: 1,
          items: [
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
          ],
        },

        topRankingContent2: {
          type: "",
          startIndex: 11,
          items: [
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
            {name: "Physics", value: "1323"},
          ],
        },

        graphInfo1: {
          type: "H-index",
          chartData: {
            columns: ['Year', 'Activation'],
            rows: [
              { 'Year': 2016, 'Activation': 3530,},
              { 'Year': 2017, 'Activation': 2923,},
              { 'Year': 2018, 'Activation': 1723,},
              { 'Year': 2019, 'Activation': 3792,},
              { 'Year': 2020, 'Activation': 4593,},
            ]
          },
        },

        graphInfo2: {
          type: "Papers",
          chartData: {
            columns: ['Year', 'Activation'],
            rows: [
              { 'Year': 2016, 'Activation': 3530,},
              { 'Year': 2017, 'Activation': 2923,},
              { 'Year': 2018, 'Activation': 1723,},
              { 'Year': 2019, 'Activation': 3792,},
              { 'Year': 2020, 'Activation': 4593,},
            ]
          },
        },

        graphInfo3: {
          type: "Citation",
          chartData: {
            columns: ['Year', 'Activation'],
            rows: [
              { 'Year': 2016, 'Activation': 3530,},
              { 'Year': 2017, 'Activation': 2923,},
              { 'Year': 2018, 'Activation': 1723,},
              { 'Year': 2019, 'Activation': 3792,},
              { 'Year': 2020, 'Activation': 4593,},
            ]
          },
        }
      }
    },

    methods: {
      getBasicInfo() {
        getRequest("/api/affiliation/detail?id=5e7a20d1b04a431b0988beb4")
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
