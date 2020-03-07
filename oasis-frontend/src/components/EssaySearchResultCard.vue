<template>
  <div class="result">
    <div class="title">
      <a v-bind:href="essayLink">
        <template>
          <span v-html="brightenKeyword(title)" ></span>
        </template>
      </a>
    </div>
    <div class="content">
      <div id="author"><span class="sub-title">Authors: </span>
      <template>
        <span v-html="brightenKeyword(authors)" ></span>
      </template>
      </div>
      <div><span class="sub-title">Conference: </span>
        <template>
          <span v-html="brightenKeyword(conference)" ></span>
        </template>
      </div>
      <div><span class="sub-title">Year: </span>{{year}} | Conference Paper
      </div>
      <div><span class="sub-title">Affiliation: </span>
        <template>
          <span v-html="brightenKeyword(affiliation)" ></span>
        </template>
      </div>
      <div><span class="sub-title">Cited by: </span>Papers ({{times}})
      </div>
      <div><span class="sub-title sub-title-terms"
                 @click="toggleShowAllTerms">Terms:</span>
        <span v-if="!showAllTerms"
              @click="toggleShowAllTerms"
              class="sub-title-terms">
          ...
        </span>
        <template>
          <span v-html="brightenKeyword(terms)"
                v-if="showAllTerms"
                @click="toggleShowAllTerms"
                class="sub-title-terms"></span>
        </template>
      </div>
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

        keyword: String,
        advanced_keywords: Array,
      },

      data() {
          return {
            showAllTerms: false,

            hasAddedKeyword: false,
          };
      },

      methods: {
        toggleShowAllTerms() {
          this.showAllTerms = !this.showAllTerms;
        },

        brightenKeyword(val) {
          return this.brightenOneKeyword(val,this.advanced_keywords);
        },

        brightenOneKeyword(val, keywords){
          val = val + '';
          var keyword = this.keyword;

          const Reg = new RegExp(keyword, 'gm');
          if (val) {
            return val.replace(Reg, '<span style="background-color: rgba(255,255,255,0.5);' +
              ' color: white">' + keyword + '</span>')
          } else {
            return val
          }
        },
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

  .sub-title-terms:hover {
    text-decoration: underline;
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
