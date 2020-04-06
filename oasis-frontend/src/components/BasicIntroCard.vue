<template>
  <div :class="cardClass" @mouseenter="shadow" @mouseleave="normal">
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
      },
      data() {
        return{
          cardClass:"normal-card"
        }
      },
      methods:{
        shadow(){
          this.cardClass="shadow-card"
        },
        normal(){
          this.cardClass="normal-card"
        }
      }
    }
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 0;
  }

  .normal-card{
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: scroll;
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
  }
  .shadow-card{
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    color: #4e4376;
    height: 350px;
    overflow: scroll;
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: 8px 8px 14px 0 rgba(253, 253, 253, 0.726)
    /* overflow: auto; */
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
