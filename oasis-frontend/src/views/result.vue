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
          <el-col :span="8" id="options">
            <div style="height:100px;">
              <side-bar></side-bar>
            </div>
          </el-col>
          <el-col :span="16" id="res">
            <div style="height:1000px;">
              <essay-search-result-card v-for="result in results"
                                        v-bind:title="result.title"
                                        v-bind:authors="result.authors"
                                        v-bind:organization="result.organization"
                                        v-bind:year="result.year"
                                        v-bind:times="result.times"
                                        v-bind:essayLink="result.essayLink">
              </essay-search-result-card>
            </div>
          </el-col>
        </el-row>
    </el-container>
</template>

<script>
  import essaySearchResultCard from "../components/EssaySearchResultCard"
  import sideBar from "../components/SideBar"
  import search from "../components/Search"
export default {
  name: 'SearchRes',
  components: {
    'essay-search-result-card': essaySearchResultCard,
    'side-bar': sideBar,
    'search': search
  },
  data () {
    return {
      input3:"",
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
          times: '10',
          essayLink: 'https://ieeexplore.ieee.org/document/1248999/'},
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

</style>
