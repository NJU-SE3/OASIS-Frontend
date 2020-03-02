<template>
  <div class="result">
    <div class="title">
      <a v-bind:href="essayLink">{{title}}</a>
    </div>
    <div class="content">
      <div id="author">{{authors}}</div>
      <div>{{conference}}</div>
      <div>Year: {{year}} | Conference Paper</div>
      <div>Cited by: Papers ({{times}})</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "essay-search-result-card",
      props:{
        title: String,
        authors: String,
        conference: String,
        year: String,
        times: String,
        essayLink: String,
      },
    }
</script>

<style scoped>
  .result{
    font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif;
    color: azure;
    text-align: left;
    margin: 0 3% 3% 3%;
  }
  .title{
    font-size: large;
    font-weight: normal;
    margin-bottom: 1%;
  }

  a{
    color: azure;
    text-decoration: transparent;
  }

  a:hover {
    text-decoration: underline;
  }

  .content{
    color: darkgrey;
  }
</style>
