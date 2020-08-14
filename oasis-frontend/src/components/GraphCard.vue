<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
    <div class="title">
      <span class="el-icon-data-analysis type-icon"></span>
      <span>{{ graphInfo.type }}</span>
      <el-tooltip
        class="item"
        effect="light"
        placement="top"
        v-if="helpInfos !== ''"
        :content="helpInfos"
      >
        <span class="el-icon-question" />
      </el-tooltip>
    </div>
    <div class="graph graph-error" v-if="graphInfo.chartData.rows == null">
      Sorry, Currently Unavailable!
    </div>
    <div
      class="graph"
      v-if="graphInfo.chartData.rows != null"
      v-loading="graphInfo.chartData.rows.length <= 0"
    >
      <ve-histogram
        :data="graphInfo.chartData"
        :extend="extendSettings"
        :legend-visible="false"
        :colors="colors"
        height="100%"
      ></ve-histogram>
    </div>
  </div>
</template>

<script>
export default {
  name: 'graph-card',
  props: {
    graphInfo: Object
  },
  data () {
    return {
      // loading: true,
      colors: ['#ffe422'],
      extendSettings: {
        series: {
          barMaxWidth: 40
        }
      },
      cardClass: 'normal-card',
      helpInfos: ''
    }
  },
  mounted () {
    if (this.graphInfo.type === 'Activeness') {
      this.helpInfos = 'sum(PaperCount/(Ceiling((CurrentYear-SomeYear)/3))'
    } else if (this.graphInfo.type === 'Heat') {
      this.helpInfos = 'totalCiteCount/totalPaperCount'
    } else if (this.graphInfo.type === 'H-index') {
      this.helpInfos =
        'An author-level metric that attempts to measure both the productivity and citation impact of the publications of a scientist or scholar'
    }
  },
  methods: {
    shadow () {
      setTimeout
      this.cardClass = 'shadow-card'
    },
    normal () {
      this.cardClass = 'normal-card'
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
  border-radius: 10px;
  background: #b4bccc;
}

.normal-card {
  background-color: azure;
  opacity: 0.7;
  border-radius: 4px;
  color: #4e4376;
  height: 350px;
  overflow-y: hidden;
  overflow-x: hidden;
  /* overflow: auto; */
}
.shadow-card {
  background-color: azure;
  opacity: 0.7;
  border-radius: 4px;
  color: #4e4376;
  height: 350px;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.5);
  /* overflow: auto; */
}

.title {
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
.graph {
  height: 100%;
  width: 100%;
}

.graph-error {
  padding-top: 100px;
}
</style>
