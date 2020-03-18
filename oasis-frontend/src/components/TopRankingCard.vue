<template>
    <div class="card">
      <div class="title" v-if="topRankingContent.type.length > 0">
        <span class="el-icon-data-line icon"></span>
        <span>Top {{topRankingContent.type}} List</span>
      </div>
      <div class="title" v-if="topRankingContent.type.length <= 0"></div>
      <div class="content">
        <div class="item" v-for="(item, index) in topRankingContent.items">
          <div class="item-name">
            <span class="item-index">{{topRankingContent.startIndex + index}}</span>
            <span class="">{{item.name}}</span>
          </div>
          <div class="item-value">
            <span>{{item.value}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "top-ranking-card",

      props: {
          topRankingContent: Object,
      },
    }
</script>

<style scoped>
  .card {
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 400px;
  }

  .title {
    height: 40px;
    /*border: solid orange;*/
    font-size: large;
    font-weight: bold;
    padding-top: 10px;
  }

  .icon{
    font-size: large;
    font-weight: bold;
  }

  .item {
    /*border: solid pink;*/
    height: 35px;
  }

  .item-name {
    /*border: solid orange;*/
    float: left;
    padding-left: 10px;
    display: inline-block;
  }

  .item-value {
    float: right;
    padding-right: 10px;
    display: inline-block;
    color: #20a0ff;
    font-style: italic;
    font-weight: bold;
  }
</style>
