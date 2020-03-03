<template>
  <div class="result">
    <div class="title">
      <a v-bind:href="essayLink">{{title}}</a>
    </div>
    <div class="content">
      <div id="author"><span class="sub-title">Authors: </span>{{authors}}</div>
      <div><span class="sub-title">Conference: </span>{{conference}}</div>
      <div><span class="sub-title">Year: </span>{{year}} | Conference Paper</div>
      <div><span class="sub-title">Affiliation: </span>{{affiliation}}</div>
      <div><span class="sub-title">Cited by: </span>Papers ({{times}})</div>
      <div><span class="sub-title">Terms:</span>
        <span v-if="!showAllTerms"
              @click="toggleShowAllTerms"
              class="sub-title-terms">
          ...
        </span>
        <span v-if="showAllTerms"
              @click="toggleShowAllTerms"
              class="sub-title-terms">
          {{terms}}
        </span></div>
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
        terms: String,
        affiliation: String,
      },

      data() {
          return {
            showAllTerms: false,
          };
      },

      methods: {
        toggleShowAllTerms() {
          this.showAllTerms = !this.showAllTerms;
        }
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

  .sub-title {
    font-weight: bold;
  }

  .sub-title-terms {
    cursor: pointer;

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
