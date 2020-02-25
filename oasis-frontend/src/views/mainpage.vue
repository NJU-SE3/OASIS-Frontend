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
    <!-- <div class="show">
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
      </div> -->

      <!-- <div class="link-content">
        <div class="content-item" 
             v-for="(imageUrl, index) in urls" 
             :key="index"
             v-show="(index == current)">
          <img :src="imageUrl" class="content-img">
        </div>
      </div> -->
      <!-- <div class="link-content">
        <div class="ontent-item-one"></div>
        <div class="content-item-two"></div>
        <div class="content-item-three"></div>
      </div>
    </div> -->


      <el-row class="show">
        <el-col :span="6" :offset="2">
        <div class="link-tab">
          <ul class="tab-list">
            <li class="tab-list-item" 
                v-for="(item, index) in nav_list" 
                :key="index" 
                :class="{active : (index == current)}"
                @mouseenter="enter(index)">
              <el-link :underline="false" href="#">{{ item }}</el-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="14" :offset="2">
      <div class="link-content">
        <div id="content-item-one" :class="{imgActive : pic_one}">
          <img src="/static/mainpage/charts.jpg" alt="ooops" class="img-item">
        </div>
        <div id="content-item-two" :class="{imgActive : pic_two}">
          <img src="/static/mainpage/TODO1.png" alt="ooops" class="img-item">
        </div>
        <div id="content-item-three" :class="{imgActive : pic_three}">
          <img src="/static/mainpage/TODO2.png" alt="ooops" class="img-item">
        </div>
      </div>
      </el-col>
    </el-row>
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
      pic_one: true,
      pic_two: false,
      pic_three: false
    }
  },

  methods: {
    enter(index) {
      this.current = index;
      if (index == 0) {
        this.pic_one = true;
        this.pic_two = false;
        this.pic_three = false;
      }
      else if (index == 1) {
        this.pic_two = true;
        this.pic_three = false;
        this.pic_one = false;
      }
      else {
        this.pic_three = true;
        this.pic_one = false;
        this.pic_two = false;
      }
    },
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
}

.link-content {
  width: 800px;
  height: 550px;
  vertical-align: top;
  background: #76797C;
  font-size: 0;
}

.link-content > * {
  opacity: 0.3;
}

.link-content #content-item-one {
  display: inline-block;
  width: 50%;
  height: 50%;
  background: pink;
}

.link-content #content-item-two {
  display: inline-block;
  width: 50%;
  height: 50%;
  background: yellow;
}

.link-content #content-item-three {
  width: 100%;
  height: 50%;
  background: white;
}

.imgActive {
  transition: all 1s;
  opacity: 1;
}

/* .img-item {
  max-width: 100%;
  max-height: 100%;
} */

.img-item {
  width: 100%;
  height: 100%;
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
