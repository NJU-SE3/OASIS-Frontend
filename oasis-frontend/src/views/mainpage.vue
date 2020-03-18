<template>
  <div class="main">
    <div id="search">
      <div class="overlay">
        <div class="o-content">
            <h1 class="title">
              OASIS
            </h1>
            <div id="tips">
              —— ——CONNECTING THE KNOWLEDGE—— ——
            </div>
            <div class="bar">
            <SearchBar @paperSearch="search"></SearchBar>
            </div>
          </div>
        </div>
    </div>
    
    <el-row>
        <el-col :span="14" :offset="2" class="table-tab">
          <div class="link-table">
           <div class="table-title">Top 30 {{entity}}</div>
           <el-row>
            <el-col :span="12">
              <top-ranking-card class="table-left" :topRankingContent=topLeft></top-ranking-card>
            </el-col>
            <el-col :span="12">
              <top-ranking-card :topRankingContent=topRight></top-ranking-card>
            </el-col>
           </el-row>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="link-tab">
            <ul class="tab-list">
              <li class="tab-list-item table-item"
                  v-for="(item, index) in tab_list"
                  :key="index"
                  :class="{active : (index == table_current)}"
                  @mouseenter="enterTable(index)"
                  @click="detail(index)">
                <el-link :underline="false">{{ item }}</el-link>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>

    <el-row class="show">
      <el-col :span="6" :offset="2">
        <div class="link-tab">
          <ul class="tab-list">
            <li class="tab-list-item"
                v-for="(item, index) in nav_list"
                :key="index"
                :class="{active : (index == current)}"
                @mouseenter="enter(index)"
                @click="detail(index)">
              <el-link :underline="false">{{ item }}</el-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="14" :offset="2">
        <div class="link-content">
          <div id="content-item-one" :class="{imgActive : pic_one}">
            <el-image src="/static/mainpage/charts.jpg"
                      alt="ooops"
                      class="img-item"
                      lazy
                      @click="detail(0)"
                      @mouseenter="enter(0)"></el-image>
          </div>
          <div id="content-item-two" :class="{imgActive : pic_two}">
            <el-image src="/static/mainpage/TODO1.jpg"
                      alt="ooops"
                      class="img-item"
                      lazy
                      @click="detail(1)"
                      @mouseenter="enter(1)"></el-image>
          </div>
          <div id="content-item-three" :class="{imgActive : pic_three}">
            <el-image src="/static/mainpage/TODO2.jpg"
                      alt="ooops"
                      class="img-item"
                      lazy
                      @click="detail(2)"
                      @mouseenter="enter(2)"></el-image>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchBar from "../components/Search"
import bus from "../utils/bus"
import TopRankingCard from "../components/TopRankingCard.vue";

export default {
  name: 'MainPage',
  components: {
    SearchBar,
    'top-ranking-card': TopRankingCard,
  },
  data () {
    return {
      nav_list: ["Ranking", "TODO1", "TODO2"],
      current: 0,
      pic_one: true,
      pic_two: false,
      pic_three: false,
      search_val: "",
      tab_list: ["Authors","Affiliations","Conferences","Fields"],
      entity:"Authors",
      table_current:0,
      topRanking:[
        [
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
          {name: "Physics", value: "1323"},
        ],
        [
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
          {name: "Math", value: "1323"},
        ],
        [
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
          {name:"Field", value: "1323"},
        ],
        [
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
          {name:"Conference", value: "1323"},
        ]
      ],
      topLeft: {
        type: "",
        startIndex: 1,
        items: []
      },
      topRight: {
        type: "",
        startIndex: 11,
        items: []
    },
    }
  },
  created(){
    this.topLeft.items=this.topRanking[0].slice(1,10)
    this.topRight.items=this.topRanking[0].slice(11)
  },
  beforeDestroy() {
    var val = this.search_val;
    bus.$emit("fuzzySearch", val);
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

    detail(index) {
      if (index == 0) {
        console.log("jump to rank");
        this.$router.push({path: "/ranking"});
      }
      else {
        console.log("to do");
      }
    },

    enterTable(index) {
      this.table_current=index;
      this.entity=this.tab_list[index];
      this.topLeft.items=this.topRanking[index].slice(1,10)
      this.topRight.items=this.topRanking[index].slice(11,20)

    },

    search(value) {
      // console.log("value: ", value);
      this.search_val = value;
      // this.$nextTick(function() {
      //   bus.$emit("fuzzySearch", value);
      // })
      this.$router.push("result");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* 开屏 */
  .main{
    /* //position: relative;
    //color: white; */
    color:white;
    height: 100%;
    overflow: auto
  }

  .title {
    font-size: 70px;
    margin: 0 0 3px 0;
  }

  #tips {
    margin-bottom: 50px;
  }

  .bar {
    display: flex;
    justify-content: center;
  }

  .search-bar {
    width: 35%;
  }

  #search{
    position: relative;
    height: 100vh;
    min-height: 410px;
    /* background-image: url("../assets/mainpage/test.png"); */
    background-image: url("../assets/mainpage/index.jpg");
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

  .o-content {
    width: 100%;
  }
/* 图片 */
  .link-content {
    width: 850px;
    height: 580px;
    vertical-align: top;
    background: #76797C;
    font-size: 0;
  }

  .link-content > * {
    opacity: 0.3;
    transition: all 0.6s;
  }

  .link-content #content-item-one {
    display: inline-block;
    width: 50%;
    height: 50%;
    /* background: pink; */
  }

  .link-content #content-item-two {
    display: inline-block;
    width: 50%;
    height: 50%;
    /* background: yellow; */
  }

  .link-content #content-item-three {
    width: 100%;
    height: 50%;
    /* background: white; */
  }

  .imgActive {
    transition: all 1s;
    opacity: 1;
    cursor: pointer;
  }

  /* .img-item {
    max-width: 100%;
    max-height: 100%;
  } */

  .img-item {
    width: 100%;
    height: 100%;
  }

/* 图片-tab */
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

/* 表格 */

  .table-title{
      font-size: 60px;
      color: #fff;
      font-weight: bold;
      /* font-style: italic; */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 25px  0;
  }
  .tab-list .table-item {
    display: flex;
    justify-content: flex-start;
    padding: 15px 30px;
    margin: 45px 0;
  }

  .table-left{
    border-right: #fff 10px;
  }
  .table-tab{
    margin-left:13%
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
