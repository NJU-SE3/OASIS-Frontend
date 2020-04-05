<template>
  <div class="card">
    <div class="name">
      {{intro.name}}
    </div>
    <div class="details" v-if="intro.details.length > 0">
      <div class="detail" v-for="(detail, index) in intro.details" :key="index">
        <span>{{detail.type}}:</span><span>{{detail.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "basic-intro-card",
      props: {
          intro: Object,
      }
    }
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 0;
  }

  .card {
    /* background-color: azure;
    opacity: 0.7; */
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: scroll;
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
  }

  .name {
    height: 140px;
    color: black;
    font-size: 50px;
    font-style: italic;
    padding-top: 50px;
   }

  .details {
   height: 80px;
    font-size: x-large;
  }

</style>
