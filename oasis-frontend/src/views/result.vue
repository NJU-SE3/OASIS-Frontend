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
                @advancedSearch="handleAdvancedSearch"
                @searchWithin="processAdvancedSearch">

              </side-bar>
            </div>
          </el-col>
          <el-col :span="18" id="res">
            <div class="result-card">
              <essay-search-result-card v-for="(result, index) in search_result"
                                        v-bind:key="index"
                                        v-bind:title="result.title"
                                        v-bind:authors="result.authors | getValidItemsForCard"
                                        v-bind:conference="result.conference"
                                        v-bind:year="result.year.toString()"
                                        v-bind:times="result.citationCount.toString()"
                                        v-bind:terms="result.terms"
                                        v-bind:affiliation="result.affiliations | getValidItemsForCard"
                                        v-bind:essayLink="result.pdfLink">
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
      _this.search_query = _this.handleBlankSpace(_this.search_query);
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

      search_within_query: "",
      search_within_type: "",
      search_within_arguments: "",

      is_search_within: false,

      search_result: null,
      search_affiliation: "",

      summary_term: [],
      summary_author: [],
      summary_conference: [],
      summary_affiliation: [],

      current_page: 0,
      page_size: 10,
      search_page_number: 100,

      advanced_query: null,
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

    getValidItemsForSideBar(items) {
      return items.filter(item => {
        return item.length > 0 && item != "NA" && item != " NA";
      });
    },
  },

  methods:{

    handleCurrentChange: function (currentPage) {
      this.current_page = currentPage;
      this.getNextPage();
    },

    commonSearch(val) {
      this.search_type = val.type;
      this.search_query = val.con;
      this.search_query = this.handleBlankSpace(this.search_query);
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

       var str_arguments = "";

      if(this.advanced_query.conference.length > 0) {
        this.advanced_query.conference.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=conference:" + item + ";";
          }
        });
      }
      if(this.advanced_query.term.length > 0) {
        this.advanced_query.term.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=term:" + item + ";";
          }
        });
      }
      if(this.advanced_query.author.length > 0) {
        this.advanced_query.author.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=author:" + item + ";";
          }
        });
      }
      if(this.advanced_query.year.length > 0) {
        this.advanced_query.year.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=year:" + item + ";";
          }
        });
      }
      if(this.advanced_query.affiliation.length > 0){
        this.advanced_query.affiliation.split(";").forEach(item => {
          if(item.length > 0) {
            str_arguments += "refinements=affiliation:" + item + ";";
          }
        });
      }
      this.search_within_arguments = str_arguments.trim().split(";")
        .join("&").substring(0, str_arguments.length - 1);

      this.getAdvancedSearchResult();
    },

    getFuzzySearchResult(){
      this.is_search_within = false;
      this.search_result = null;
      this.current_page = 0;

      getRequest("/api/query/paper/list?query=" + this.search_query + "&returnFacets=" + this.search_type)
        .then(res=>{
          //console.log(res);
          this.search_result = res.data.papers;
          this.search_page_number = res.data.itemCnt;

          this.getSummary();
        });
    },

    getSummary() {
      getRequest("/api/query/paper/summary").then(res=>{
        console.log(res);
          this.summary_term = res.data.term;
          this.summary_author = res.data.author;
          this.summary_conference = res.data.conference;
          this.summary_affiliation = res.data.affiliation;
      })
    },

    getAdvancedSearchResult() {
      this.is_search_within = true;
      this.current_page = 0;
      this.search_result = null;

      getRequest("/api/query/paper/refine?" + this.search_within_arguments).then(res => {
        //console.log("search within: ", res);
        this.search_result = res.data.papers;
        this.search_page_number = res.data.itemCnt;
      });
    },

    getNextPage() {
      this.search_result = null;
      if(!this.is_search_within) {
        getRequest("/api/query/paper/list?query=" + this.search_query +
          "&returnFacets=" + this.search_type +
          "&pageNum=" + this.current_page)
          .then(res => {
            this.search_result = res.data.papers;
          })
      }
      else {
        getRequest("/api/query/paper/refine?" + this.search_within_arguments +
        "&pageNum=" + this.current_page).then(res => {
          //console.log("search within: ", res);
          this.search_result = res.data.papers;
        });
      }
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
