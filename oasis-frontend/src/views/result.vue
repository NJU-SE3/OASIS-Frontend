<template>
    <el-container class="main">
      <el-header id="header" style="height: 35vh;min-height: 270px; padding:0;">
        <div id="overlay">
          <div id="o-content">
            <h1>
              OASIS
            </h1>
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </el-header>
        <el-row :gutter="20" style="margin:3% 2%;" id="content">
          <el-col :span="8" id="options">
            <div style="background-color:aquamarine; height:100px;">侧边栏</div>
          </el-col>
          <el-col :span="16" id="res">
            <div style="height:1000px; background-color:white;">搜索结果</div>
          </el-col>
        </el-row>
    </el-container>
</template>

<script>
export default {
  name: 'SearchRes',
  data () {
    return {
      input3:""
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
};

</style>
