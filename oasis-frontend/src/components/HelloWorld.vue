<template>
  <div class="hello">
    <MyHeader @search="search"></MyHeader>
    <el-row class="link">
    <el-link href="http://localhost:8080/#/mainpage" type="primary">主页</el-link>
    <el-link href="http://localhost:8080/#/ranking" type="primary">数据报表</el-link>
    <el-link href="http://localhost:8080/#/result" type="primary">搜索结果</el-link>
    </el-row>
  </div>
</template>

<script>
import MyHeader from "./Header"
export default {
  name: 'HelloWorld',
  components: {
    MyHeader
  },
  data () {
    return {
      num: 1
    }
  },

  methods: {
    search(data) {
      console.log(data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
  margin-top: 20px;
}
</style>
