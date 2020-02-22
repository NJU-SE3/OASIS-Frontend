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
    <div class="show">
      <div class="link-tab">
        <ul class="tab-list">
          <li class="tab-list-item" 
              v-for="(item, index) in nav_list" 
              :key="index" 
              :class="{active : (index == current)}"
              @mouseenter="toggle(index)">
            <el-link :underline="false" href="#">{{ item }}</el-link>
          </li>
        </ul>
      </div>
      <div class="link-content">
        <div class="content-item" 
             v-for="(imageUrl, index) in urls" 
             :key="index"
             v-show="(index == current)">
          <img :src="imageUrl" class="content-img">
          <!-- </img> -->
        </div>
      </div>
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
      nav_list: ["Ranking", "TODO1", "TODO2"],
      current: 0,
      urls: [
        "/static/mainpage/charts.jpg",
        "/static/mainpage/TODO1.png",
        "/static/mainpage/TODO2.png"
      ],
    }
  },

  methods: {
    toggle(index) {
      this.current = index;
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

.show{
  /* background-color: burlywood; */
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height:200px;

}
/* 
.link-content, .link-tab {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
} */

.link-tab {
  display: inline-flex;
  width: 30%;
}

.link-content {
  display: inline-flex;
  width: 60%;
  vertical-align: top;
}

.tab-list .tab-list-item {
  display: flex;
  justify-content: flex-start;
  padding: 20px 50px;
  margin: 50px 0;
}


.tab-list .tab-list-item a{
  font-size: 40px;
  color: #76797C;
  font-weight: bold;
  font-style: italic;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.tab-list .active {
  /* padding-left: 60px; */
  border-left: 3px solid #ffffff;
  transition-property: padding;
  transition-duration: 0.5s;
}

.tab-list .active:hover {
  padding-left: 70px;
}

.tab-list .active a{
  color: #fff;
}

#show li {
  list-style-type: none;
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

  .content-item {
    height: 100%;
  }

  .content-img {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }

</style>
