<template>
  <div class="hello">
    <el-link href="http://localhost:8080/#/mainpage" type="primary">主页</el-link>
    <el-link href="http://localhost:8080/#/ranking" type="primary">数据报表</el-link>
    <el-link href="http://localhost:8080/#/result" type="primary">搜索结果</el-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
