<template>
    <el-container class="main">
      <el-header id="header" style="height: 35vh;min-height: 270px; padding:0;">
        <div id="overlay">
          <div id="o-content">
            <h1 class="title">
              OASIS
            </h1>
            <search @paperSearch="commonSearch"></search>
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
                @advancedSearch="handleAdvancedSearch"></side-bar>
            </div>
          </el-col>
          <el-col :span="18" id="res">
            <div class="result-card">
              <essay-search-result-card v-for="(result, index) in search_result"
                                        v-bind:key="index"
                                        v-bind:title="result.title"
                                        v-bind:authors="result.authors"
                                        v-bind:conference="result.conference"
                                        v-bind:year="result.year.toString()"
                                        v-bind:times="result.citationCount.toString()"
                                        v-bind:essayLink="result.pdfLink">
              </essay-search-result-card>
            </div>
            <div class="page-pagination">
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
      _this.search_query = _this.handleBlankSpace(_this.search_query);
      console.log("search query",_this.search_query);
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
      search_query: "",
      search_type: "",

      search_view_query: "",
      search_view_type: "",

      search_within_query: "",
      search_within_type: "",

      search_result: null,
      search_page_number: 100,

      summary_term: [],
      summary_author: [],
      summary_conference: [],
      summary_affiliation: [],

      current_page: 0,
      page_size: 10,
    }
  },

  methods:{
    handleCurrentChange: function (currentPage) {
      this.current_page = currentPage;
      this.getNextPage();
    },

    commonSearch(val) {
      this.search_view_type = val.type;
      this.search_view_query = val.con;
    },

    handleAdvancedSearch(val) {
      this.search_within_type = val.type;
      this.search_within_query = val.con;
      console.log(this.search_within_type, this.search_within_query);
    },

    getFuzzySearchResult(){
      getRequest("/query/paper/list?query=" + this.search_query + "&returnFacets=" + this.search_type)
        .then(res=>{
          console.log("res",res);
          this.search_result = res.data;
          this.getSummary();
        })
    },

    getSummary() {
      getRequest("/query/paper/summary").then(res=>{
          console.log("summary", res);
          this.summary_term = res.data.term;
          this.summary_author = res.data.author;
          this.summary_conference = res.data.conference;
          this.summary_affiliation = res.data.affiliation;
          console.log(this.summary_author);
      })
    },

    getNextPage() {
      getRequest("/query/paper/list?query=" + this.search_query +
        "&returnFacets=" + this.search_type +
        "&pageNum=" + this.current_page)
        .then(res=>{
          console.log("next page",res);
          this.search_result = res.data;
        })
    },

    // convert blank space to %20
    handleBlankSpace(input) {
      return input.split(" ").join("%20");
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
}

#header{
  position: relative;

  background-image: url("../assets/mainpage/test.png");
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
