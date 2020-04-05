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
      <template v-for="(author, index) in authors">
        <span class="profile-entity"
              v-html="brightenKeyword(author.authorName)"
              @click="jumpToProfile('author', author.id)"></span>
        <span>; </span>
      </template>
      </div>
      <div><span class="sub-title">Conference: </span>
        <template>
          <span class="profile-entity"
                v-html="brightenKeyword(conference.conferenceName)"
                @click="jumpToProfile('conference', conference.id)"></span>
        </template>
      </div>
      <div><span class="sub-title">Year: </span>{{year}} | Conference Paper
      </div>
      <div><span class="sub-title">Affiliation: </span>
        <template v-for="(affiliation, index) in affiliations">
          <span class="profile-entity"
                v-html="brightenKeyword(affiliation.affiliationName)"
                @click="jumpToProfile('affiliation', affiliation.id)" ></span>
          <span>; </span>
        </template>
      </div>
      <div><span class="sub-title">Cited by: </span>Papers ({{times}})
      </div>
      <div><span class="sub-title sub-title-terms"
                 @click="toggleShowAllTerms">Fields:</span>
        <template v-for="(field, index) in fields">
          <span class="profile-entity"
                v-html="brightenKeyword(field.fieldName)"
                @click="jumpToProfile('field', field.id)" ></span>
          <span>; </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {jump2Profile} from "../utils/profileInfo";

    export default {
        name: "essay-search-result-card",
      props:{
        title: String,
        authors: Array,
        conference: Object,
        year: String,
        times: String,
        essayLink: String,
        fields: Array,
        affiliations: Array,

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
          var result = this.brightenKeywordList(val, this.keyword.split("%20"));
          result = this.brightenKeywordList(result, this.advanced_keywords);
          return result;
        },

        brightenKeywordList(val,keywords_list){
          var result = val;

          keywords_list.forEach(keyword => {
            const Reg = new RegExp(keyword, 'gi');
            if (result) {
              result = result.replace(Reg, '<span style="background-color: rgba(255,255,255,0.5);' +
                ' color: white">' + keyword + '</span>');
            }
          });
          return result;
        },

        jumpToProfile(type, id) {
          jump2Profile(this.$router, type, id);
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

  .highlighted {
    background-color: rgba(255,255,255,0.5);
    color: white;
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

  .profile-entity:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
