<template>
    <div class="card">
      <div class="title" v-if="topRankingContent.type.length > 0">
        <span class="el-icon-data-line icon"></span>
        <span>Top {{topRankingContent.type}} List</span>
      </div>
      <div class="title-blank" v-if="topRankingContent.type.length <= 0"></div>
      <div class="content" v-loading="topRankingContent.items.length <= 0">
        <div class="item" v-for="(item, index) in topRankingContent.items" :key="index">
          <div class="item-name" v-if="!pdfLink" @click="jumpToProfile(item.id)">
            <span class="item-index">{{topRankingContent.startIndex + index}}</span>
            <span class="">{{item.name}}</span>
          </div>
          <a v-bind:href="item.link" v-if="pdfLink">
            <div class="item-name">
              <span class="item-index">{{topRankingContent.startIndex + index}}</span>
              <span class="">{{item.name}}</span>
            </div>
          </a>
          <div class="item-value" v-for="(singleValue, index) in item.values">
            <span class="value-type">{{singleValue.type}}: </span><span>{{singleValue.value}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {jump2Profile} from "../utils/profileInfo";

  export default {
    name: "top-ranking-card",

    props: {
      topRankingContent: Object,
      extended: Boolean,
      pdfLink: Boolean,
      },

    methods: {
      jumpToProfile(id) {
        jump2Profile(this.$router, this.topRankingContent.router_type, id);
      },
    },
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

  .card {
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 400px;
    overflow: scroll;
  }

  .title {
    height: 40px;
    font-size: large;
    font-weight: bold;
    padding-top: 10px;
  }

  .title-blank {
    height: 20px;
  }

  a{
    color: #4e4376;
    text-decoration: transparent;
  }

  .icon{
    font-size: large;
    font-weight: bold;
  }

  .item {
    height: 35px;
  }

  .item-name {
    float: left;
    padding-left: 10px;
    display: inline-block;
  }

  .item-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .item-value {
    float: right;
    padding-right: 10px;
    display: inline-block;
    color: #20a0ff;
    font-style: italic;
    font-weight: bold;
  }

  .value-type {
    color: #4e4376;
    font-weight: normal;
  }
</style>
