<template>
    <el-container class="main">
      <el-header id="header" style="height: 35vh;min-height: 270px; padding:0;">
        <div id="overlay">
          <div id="o-content">
            <h1>
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
            <div style="height:1200px;">
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


  data () {
    return {
      current_page: 1,
      page_size: 1,
      is_ready: false,
      results: [
        { title: 'Synthesis and SAW characteristics of AlN thin films fabricated on Si and GaN using helicon sputtering system',
        authors: 'Paul Hershey ; Charles B. Silio',
        organization: '2009 3rd Annual IEEE Systems Conference',
        year: '2009',
        times: '8',
        essayLink: 'https://www.google.com/'},
        { title: 'Reliable and accurate algorithm to compute the limit cycle locus for uncertain nonlinear systems',
          authors: 'Paul Hershey ; Charles B. Silio',
          organization: '2009 3rd Annual IEEE Systems Conference',
          year: '2009',
          times: '9',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
        { title: 'Parametric Lyapunov function approach to H/sub 2/ analysis and control of linear parameter-dependent systems',
          authors: 'Paul Hershey ; Charles B. Silio',
          organization: '2009 3rd Annual IEEE Systems Conference',
          year: '2009',
          times: '100',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
        { title: 'Parametric Lyapunov function approach to H/sub 2/ analysis and control of linear parameter-dependent systems',
          authors: 'Paul Hershey ; Charles B. Silio',
          organization: '2009 3rd Annual IEEE Systems Conference',
          year: '2009',
          times: '1',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
        { title: 'Parametric Lyapunov function approach to H/sub 2/ analysis and control of linear parameter-dependent systems',
          authors: 'Paul Hershey ; Charles B. Silio',
          organization: '2009 3rd Annual IEEE Systems Conference',
          year: '2009',
          times: '10',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
        { title: 'Parametric Lyapunov function approach to H/sub 2/ analysis and control of linear parameter-dependent systems',
          authors: 'Paul Hershey ; Charles B. Silio',
          organization: '2009 3rd Annual IEEE Systems Conference',
          year: '2009',
          times: '11',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
        { title: 'Parametric Lyapunov function approach to H/sub 2/ analysis and control of linear parameter-dependent systems',
          authors: 'Paul Hershey ; Charles B. Silio',
          organization: '2009 3rd Annual IEEE Systems Conference',
          year: '2009',
          times: '12',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
        { title: 'Parametric Lyapunov function approach to H/sub 2/ analysis and control of linear parameter-dependent systems',
          authors: 'Paul Hershey ; Charles B. Silio',
          organization: '2009 3rd Annual IEEE Systems Conference',
          year: '2009',
          times: '13',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
      ],
      displayedResults: [],
      type: {
        type_main: "",  //主页
        type_second: "",  //结果页的一级搜索
        type_advanced: "" //结果页的二级搜索
      },
      keywords: {
        words_main: "",
        words_second: "",
        words_advanced: ""
      }
  created(){
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
      search_result: null,
      search_page_number: 100,
      qid: "",

      summary_term: [],
      summary_author: [],
      summary_conference: [],
      summary_affiliation: [],

      current_page: 0,
      page_size: 10,
    }
  },

  created(){
    this.currentPageChange(1);
    var _this = this;
    bus.$on("fuzzySearch", data => {
      _this.type.type_main = data.type;
      _this.keywords.words_main = data.con;
      console.log(_this.type, ", ", _this.keywords);
    })
  },

  mounted() {
    getRequest("/api/query/paper/list?query=system&returnFacets=all").then(res=>{
      console.log("res",res);
      console.log("in");
    })
    console.log("outer");
  },

  beforeDestroy() {
    // console.log("before destroy");
    bus.$off("fuzzySearch");
  },

  methods:{
    handleCurrentChange: function (currentPage) {
      console.log("!!!!");
      this.current_page = currentPage;
      this.getNextPage();
    },

    getFuzzySearchResult(){
      getRequest("/query/paper/list?query=" + this.search_query + "&returnFacets=" + this.search_type)
        .then(res=>{
        console.log("res",res);
        this.search_result = res.data.papers;
        this.qid = res.data.qid;
        this.getSummary();
      })
    },

    commonSearch(val) {
      this.type.type_second = val.type;
      this.keywords.words_second = val.con;
    },

    handleAdvancedSearch(val) {
      this.type.type_advanced = val.type;
      this.keywords.words_advanced = val.con;
      console.log(this.type, this.keywords);
    },
    
    getSummary() {
      getRequest("/query/paper/summary?qid=" + this.qid).then(res=>{
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
          this.search_result = res.data.papers;
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

#header{
  position: relative;

  background-image: url("../assets/mainpage/video-poster_1576231362701.png");
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
