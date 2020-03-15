<template>
    <el-container class="main">
      <el-header id="header" style="height: 35vh;min-height: 270px; padding:0;">
        <div id="overlay">
          <div id="o-content">
            <h1 class="title" @click="gotoMainpage">
              OASIS
            </h1>
            <search @paperSearch="commonSearch" :searchCon="search_query"></search>
          </div>
        </div>
      </el-header>
        <el-row :gutter="20" style="margin:3% 2%;" id="content">
          <el-col :span="6" id="options">
            <div style="height:100px;">
              <side-bar
                v-bind:authorSummary = "summary_author"
                v-bind:affiliationSummary="summary_affiliation"
                v-bind:conferenceSummary="summary_conference"
                v-bind:termSummary="summary_term"
                @advancedSearch="handleAdvancedSearch"
                @searchWithin="processAdvancedSearch">

              </side-bar>
            </div>
          </el-col>
          <el-col :span="18" id="res">
            <div class="no-result-hint" v-if="!has_result">No result!</div>
            <div class="result-card" v-loading="loading">
              <essay-search-result-card v-for="(result, index) in search_result"
                                        v-bind:key="index"
                                        v-bind:title="result.title"
                                        v-bind:authors="result.authors | getValidItemsForCard"
                                        v-bind:conference="result.conference | getValidItemsForCard"
                                        v-bind:year="result.year.toString()"
                                        v-bind:times="result.citationCount.toString()"
                                        v-bind:terms="result.terms | getValidItemsForCard"
                                        v-bind:affiliation="result.affiliations | getValidItemsForCard"
                                        v-bind:essayLink="result.pdfLink"
                                        v-bind:keyword="search_query"
                                        v-bind:advanced_keywords="advanced_keywords">
              </essay-search-result-card>
            </div>
            <div class="page-pagination"
                 v-if="search_result != null && search_result.length > 0">
              <el-pagination layout="prev,pager,next"
                             :total="search_page_number"
                             :current-page="current_page"
                             :page-size="page_size"
                             @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
    </el-container>
</template>

<script>
  import essaySearchResultCard from "../components/EssaySearchResultCard"
  import sideBar from "../components/SideBar"
  import search from "../components/Search"
  import {getRequest} from "../utils/request.js"
  import bus from "../utils/bus"

export default {
  name: 'SearchRes',
  components: {
    'essay-search-result-card': essaySearchResultCard,
    'side-bar': sideBar,
    'search': search
  },

  created() {
    var _this = this;
    bus.$on("fuzzySearch", data => {
      _this.search_type = data.type;
      _this.search_query = data.con;
      _this.search_query = _this.convertSpecialChar(_this.search_query);
    })
  },

  mounted() {
    this.getFuzzySearchResult();
  },

  beforeDestroy() {
    bus.$off("fuzzySearch");
  },

  data () {
    return {
      loading: true,

      search_query: "",
      search_type: "",

      search_within_query: "",
      search_within_type: "",
      search_within_arguments: "",

      is_search_within: false,

      search_result: null,
      has_result: true,
      search_affiliation: "",

      summary_term: [],
      summary_author: [],
      summary_conference: [],
      summary_affiliation: [],

      current_page: 0,
      page_size: 10,
      search_page_number: 100,

      advanced_query: null,

      advanced_keywords: [],
    }
  },

  filters: {
    getValidItemsForCard(items) {
      var list_items = [];
      var str_items = "";
      items.split(";").forEach(item => {
        if(item.length > 0 && item != "NA" && item != " NA"
          && str_items.indexOf(item) < 0) {
          str_items += item;
          list_items.push(item);
        }
      });
      return list_items.join(";");
    },

    getValidItemsForCard_terms(items) {
      var str_terms = items.split("[")[1].split("]")[0].split("'").join("");
      return str_terms;
    },
  },

  methods:{
    gotoMainpage(){
      this.$router.push({path: "/mainpage"});
    },

    handleCurrentChange: function (currentPage) {
      this.current_page = currentPage;
      this.getNextPage();
    },

    commonSearch(val) {
      this.search_type = val.type;
      this.search_query = val.con;
      this.search_query = this.convertSpecialChar(this.search_query);
      this.getFuzzySearchResult();
    },

    handleAdvancedSearch(val) {
      this.search_within_type = val.type;
      this.search_within_query = val.con;
    },

    processAdvancedSearch(val) {
      this.advanced_query = val;

      this.is_search_within = true;
      this.search_within_arguments = "";
      this.advanced_keywords = [];

       var str_arguments = "";

      if(this.advanced_query.conference.length > 0) {
        this.advanced_query.conference.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=conference:" + item + ";";
            this.advanced_keywords.push(item);
          }
        });
      }
      if(this.advanced_query.term.length > 0) {
        this.advanced_query.term.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=term:" + item + ";";
            this.advanced_keywords.push(item);
          }
        });
      }
      if(this.advanced_query.author.length > 0) {
        this.advanced_query.author.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=author:" + item + ";";
            this.advanced_keywords.push(item);
          }
        });
      }
      if(this.advanced_query.year.length > 0) {
        this.advanced_query.year.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=year:" + item + ";";
            this.advanced_keywords.push(item.split("_")[0]);
            this.advanced_keywords.push(item.split("_")[1]);
          }
        });
      }
      if(this.advanced_query.affiliation.length > 0){
        this.advanced_query.affiliation.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=affiliation:" + item + ";";
            this.advanced_keywords.push(item);
          }
        });
      }
      this.search_within_arguments = str_arguments.trim().split(";")
        .join("&").substring(0, str_arguments.length - 1);

      if(this.search_within_arguments.length == 0){
        this.getFuzzySearchResult();
      }
      else {
        this.getAdvancedSearchResult();
      }
    },

    getFuzzySearchResult(){
      this.loading = true;

      this.is_search_within = false;
      this.search_result = null;
      this.current_page = 0;

      this.advanced_keywords = [];

      getRequest("/api/query/paper/list?query=" + this.search_query + "&returnFacets=" + this.search_type)
        .then(res=>{
          this.search_result = res.data.papers;
          this.search_page_number = res.data.itemCnt;

          this.loading = false;

          if(this.search_page_number > 0) {
            this.getSummary();
            this.has_result = true;
          }
          else {
            this.has_result = false;
            this.summary_author = [];
            this.summary_affiliation = [];
            this.summary_conference = [];
            this.summary_term = [];
          }
        });
    },

    getSummary() {
      getRequest("/api/query/paper/summary").then(res=>{
        this.summary_term = this.getValidItemsForSideBar(res.data.term);
        this.summary_author = this.getValidItemsForSideBar(res.data.author);
        this.summary_conference = this.getValidItemsForSideBar(res.data.conference);
        this.summary_affiliation = this.getValidItemsForSideBar(res.data.affiliation);
      });
    },

    getAdvancedSearchResult() {
      this.loading = true;

      this.is_search_within = true;
      this.current_page = 0;
      this.search_result = null;

      this.search_within_arguments = this.convertSpecialChar(this.search_within_arguments);

      getRequest("/api/query/paper/refine?" + this.search_within_arguments).then(res => {
        this.search_result = res.data.papers;
        this.search_page_number = res.data.itemCnt;

        this.loading = false;

        if(this.search_page_number > 0) {
          this.has_result = true;
        }
        else {
          this.has_result = false;
        }
      });
    },

    getNextPage() {
      this.loading = true;
      this.search_result = null;
      if(!this.is_search_within) {
        getRequest("/api/query/paper/list?query=" + this.search_query +
          "&returnFacets=" + this.search_type +
          "&pageNum=" + this.current_page)
          .then(res => {
            this.search_result = res.data.papers;
            this.loading = false;
          })
      }
      else {
        getRequest("/api/query/paper/refine?" + this.search_within_arguments +
        "&pageNum=" + this.current_page).then(res => {
          this.search_result = res.data.papers;
          this.loading = false;
        });
      }
    },

    getValidItemsForSideBar(items) {
      return items.filter(item => {
        return item.first.length > 0 && item.first != "NA"
          && item.first != " NA";
      });
    },

    // convert blank space to %20
    convertSpecialChar(input) {
      return input.split(" ").join("%20").split(",").join("%2C");
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main{
  color:white;
  height: 100%;
  overflow: auto
}

.title {
  font-size: 50px;
  margin: 0 0 8px 0;
  cursor: pointer;
}

#header{
  position: relative;

  background-image: url("../assets/mainpage/index.jpg");
  background-size: 100% auto;
}
#overlay{
  position: absolute;
  top: 0;
  display:flex;
  justify-content:center;
  align-items:center;
  height: 100%;
  width: 100%;
  background-color:rgba(79,79,79,0.10);
}

.result-card {
  display: block;
}

.page-pagination{
  display: block;
  text-align: right;
}

.el-pagination button:disabled {
  background-color: rgba(255,255,255,0.5);
}

.el-pagination .btn-prev {
  border-radius: 2em 0 0 2em;
  background-color: rgba(255,255,255,0.5);
}

.el-pager li {
  background-color: rgba(255,255,255,0.5);
}

.el-pager li.active {
  color: azure;
}

.el-pagination .btn-next {
  background-color: rgba(255,255,255,0.5);
  border-radius: 0 2em 2em 0;
}
</style>
