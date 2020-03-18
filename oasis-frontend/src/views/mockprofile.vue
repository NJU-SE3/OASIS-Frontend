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

    export default {
      name: "mockprofile",
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

      data() {
        return {
          basicStatistic : [
            {icon: "el-icon-user", type: "Authors", value: "11,223"},
            {icon: "el-icon-document", type: "Papers", value: "11,224"},
            {icon: "el-icon-document", type: "Papers", value: "11,224"},
            {icon: "el-icon-document", type: "Papers", value: "11,224"},
          ],
          basicIntro: {
            name: "Condensed matter physics",
            introduction: "Condensed matter physics is the field of physics that " +
            "deals with the macroscopic and" +
            " microscopic physical properties of matter. In particular it is concerned with" +
            " the 'condensed' phases that appear whenever the number of constituents in a " +
            "system is extremely large and the interactions between the constituents are " +
            "strong. The most familiar examples of condensed phases are solids and liquids," +
            " which arise from the electromagnetic forces between atoms. Condensed matter " +
            "physicists seek to understand the behavior of these phases by using physical " +
            "laws. In particular, they include the laws of quantum mechanics," +
            " electromagnetism and statistical mechanics." +
            "Condensed matter physics is the field of physics that " +
            "deals with the macroscopic and" +
            " microscopic physical properties of matter. In particular it is concerned with" +
            " the 'condensed' phases that appear whenever the number of constituents in a " +
            "system is extremely large and the interactions between the constituents are " +
            "strong. The most familiar examples of condensed phases are solids and liquids," +
            " which arise from the electromagnetic forces between atoms. Condensed matter " +
            "physicists seek to understand the behavior of these phases by using physical " +
            "laws. In particular, they include the laws of quantum mechanics," +
            " electromagnetism and statistical mechanics.",
            details: [{type: "Affiliation", value: "Nanjing University"}],
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
