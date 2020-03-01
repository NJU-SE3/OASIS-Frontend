<template>
    <el-container class="main">
      <el-header id="header" style="height: 35vh;min-height: 270px; padding:0;">
        <div id="overlay">
          <div id="o-content">
            <h1>
              OASIS
            </h1>
            <search></search>
          </div>
        </div>
      </el-header>
        <el-row :gutter="20" style="margin:3% 2%;" id="content">
          <el-col :span="6" id="options">
            <div style="height:100px;">
              <side-bar></side-bar>
            </div>
          </el-col>
          <el-col :span="18" id="res">
            <div style="height:500px;">
              <essay-search-result-card v-for="(result, index) in displayedResults"
                                        v-bind:key="index"
                                        v-bind:title="result.title"
                                        v-bind:authors="result.authors"
                                        v-bind:organization="result.organization"
                                        v-bind:year="result.year"
                                        v-bind:times="result.times"
                                        v-bind:essayLink="result.essayLink">
              </essay-search-result-card>
            </div>
            <div class="page-pagination">
              <el-pagination layout="prev,pager,next"
                             :total="results.length"
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
export default {
  name: 'SearchRes',
  components: {
    'essay-search-result-card': essaySearchResultCard,
    'side-bar': sideBar,
    'search': search
  },

  created(){
    this.currentPageChange(1);
  },

  mounted() {
    this.getFuzzySearchResult();
  },

  data () {
    return {
      search_query: "system",
      search_type: "all",
      search_result: null,

      current_page: 1,
      page_size: 10,
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
    }
  },

  methods:{
    handleCurrentChange: function (currentPage) {
      this.current_page = currentPage;
      this.currentPageChange(currentPage);
    },
    currentPageChange(currentPage){
      let from = (currentPage - 1) * this.page_size;
      let to = currentPage * this.page_size;
      this.displayedResults = [];
      for(; from < to; from++) {
        if(this.results[from]) {
          this.displayedResults.push(this.results[from]);
        }
      }
    },

    getFuzzySearchResult(){
      getRequest("/api/query/paper/list?query=system&returnFacets=all")
        .then(res=>{
        console.log("res",res);
        console.log("in");
        this.search_result = res.data.papers;
        console.log(this.search_result);
      })
      console.log("outer");
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main{
  position: relative;
  color: white;
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
