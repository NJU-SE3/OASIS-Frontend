<template>
  <div class="main">
    <div id="search">
      <div class="overlay">
        <div class="o-content">
            <h1>
              OASIS
            </h1>
            <div id="tips">
              —— ——CONNECTING THE KNOWLEDGE—— ——
            </div>
            <SearchBar></SearchBar>
          </div>
        </div>
    </div>
    <div id="show">
      <h1>其他栏（应该要做个组件×）</h1>
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/Search"

export default {
  name: 'MainPage',
  components: {
    SearchBar,
  },
  data () {
    return {
    }
  },

  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main{
  position: relative;
  color: white;
}
#search{
  position: relative;
  height: 100vh;
  min-height: 410px;
  background-image: url("../assets/mainpage/video-poster_1576231362701.png");
  background-size: 100% 100%;
}
.overlay{
  position: absolute;
  top: 0;
  display:flex;
  justify-content:center;
  align-items:center;
  height: 100%;
  width: 100%;
  background-color:rgba(79,79,79,0.10);
};

#show{
  background-color: burlywood;
  position: relative;
  height:100px;
}
h1 {
  font-size: 200%
}

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
