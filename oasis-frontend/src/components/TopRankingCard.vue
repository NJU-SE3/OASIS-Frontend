<template>
    <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
      <div class="title" v-if="topRankingContent.type.length > 0">
        <span class="el-icon-data-line icon"></span>
        <span>Top {{topRankingContent.type}} List</span>
      </div>
      <div class="title-blank" v-if="topRankingContent.type.length <= 0"></div>
      <div class="content" v-loading="topRankingContent.items.length <= 0">
        <div class="item" v-for="(item, index) in topRankingContent.items" :key="index">
          <el-tooltip class="tool-tip" effect="light" :content="item.name" placement="top-start">
            <div class="item-name" v-if="!pdfLink" @click="jumpToProfile(item.id)">
              <span class="item-index">{{topRankingContent.startIndex + index}}. </span>
              <span class="">{{item.name}}</span>
            </div>
          </el-tooltip>
          <el-tooltip class="tool-tip" effect="light" :content="item.name" placement="top-start">
          <a v-bind:href="item.link" v-if="pdfLink">
            <div class="item-name">
              <span class="item-index">{{topRankingContent.startIndex + index}}. </span>
              <span class="">{{item.name}}</span>
            </div>
          </a>
          </el-tooltip>
          <div class="item-value">
            <span v-for="(singleValue, index) in item.values" :key="index">
              <span class="value-type">{{singleValue.type}}:
              </span><span>{{Math.round(singleValue.value)}}    </span>
            </span>
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
    data() {
        return{
          cardClass:"normal-card"
        }
    },
    methods: {
      jumpToProfile(id) {
        jump2Profile(this.$router, this.topRankingContent.router_type, id);
      },
      shadow(){
        this.cardClass="shadow-card"
      },
      normal(){
        this.cardClass="normal-card"
      }
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

  /* .card {
    /* background-color: azure;
    opacity: 0.5; 
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    /* color: #4e4376; 
    color: #eeeeee;
    height: 400px;
    overflow: hidden;
    width: 100%;
  } */
  .normal-card{
    /* background-color: azure;
    opacity: 0.5; */
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    /* color: #4e4376; */
    color: #eeeeee;
    height: 400px;
    overflow: hidden;
    width: 100%;
  }
  .shadow-card{
     /* background-color: azure;
    opacity: 0.5; */
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    /* color: #4e4376; */
    color: #eeeeee;
    height: 400px;
    overflow: hidden;
    width: 100%;
    box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.5)
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
    /* color: #4e4376; */
    color: #eeeeee;
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
    padding-left: 30px;
    display: inline-block;
    width: 50%;
    text-align: left;
    float: left;
    white-space: nowrap;  
    text-overflow:ellipsis; 
    overflow:hidden;
  }

  .item-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .item-value {
    float: right;
    /* text-align: right; */
    /* width: 25%; */
    padding-right: 30px;
    display: inline-block;
    /* color: #1f78bb; */
    color:#eeeeee;
    font-style: italic;
    font-weight: bold;
  }

  .value-type {
    color:  #ebe83d;
    /* color: #eeeeee; */
    font-weight: normal;
  }

  /* .tool-tip{
    font: 2em sans-serif;
  } */

  .item-index{
    font-style: italic;
    font-weight:bold;
    color: #fff;
  }
</style>
