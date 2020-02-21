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
        </div>
        <div id="show">
          <el-card>
            lalalalalala
          </el-card>
        </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
      input3:"123"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#main{
  position: relative;
  overflow-x: auto;
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
  color: white;
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
