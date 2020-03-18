<template>
  <div class="card">
    <div class="item" v-for="(item, index) in statistics">
      <span :class= "item.icon" class="item-icon"></span>
      <span class="item-title">{{item.type}}</span>
      <span class="item-number">{{item.value}}</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "basic-statistic-card",

      props: {
        statistics: Array,
      },

      methods: {
      },
    }
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 0;
  }

  .card {
    background-color: azure;
    opacity: 0.7;
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: scroll;
  }

  .item {
    /*border: solid pink;*/
    padding: 10%;
  }

  .item-icon {
    /*border: solid pink;*/
    font-size: x-large;
    padding-right: 5%;
  }

  .item-title {
    font-size: x-large;
    padding-right: 10%;
  }

  .item-number {
    color: #20a0ff;
    font-style: italic;
    font-size: xx-large;
  }

</style>
