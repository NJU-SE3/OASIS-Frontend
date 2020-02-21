<template>
    <div class="search-bar">
        <el-input class="input-with-select" placeholder="请输入内容" v-model="searchCon">
            <el-select class="search-pre" v-model="searchType" slot="prepend" placeholder="请选择">
            <el-option label="任意输入" value="1"></el-option>
            <el-option label="文章标题" value="2"></el-option>
            <el-option label="作者" value="3"></el-option>
            <el-option label="研究机构" value="4"></el-option>
            </el-select>
        <el-button slot="append" icon="el-icon-search" @click="submit"></el-button>
        </el-input>
    </div>
</template>

<script>
export default{
    name: "search-bar",
    data(){
        return{
            searchType:"1",
            searchCon:""
        }
    },
    methods:{
        submit(){
            console.log(this.searchType,"  ",this.searchCon);
        }
    }
}
</script>

<style>
  .el-select .el-input {
    width: 8em;
  }
  .input-with-select  {
    background-color: transparent;
  }
  .input-with-select .el-input-group__prepend , 
    .input-with-select .el-input__inner, 
    .input-with-select .el-input-group__append{
    background-color: rgba(255,255,255,0.5);
    border-color: transparent;
    color: black;
    /* font-weight: bold; */
  }
  .input-with-select .el-input-group__prepend{
    border-radius: 2em 0 0 2em;
  }
  .input-with-select .el-input-group__append{
      border-radius: 0 2em 2em 0;
  }

  .input-with-select{
      font-size: 65%;
  }
  .el-select .el-input .el-select__caret{
      color:black;
  }
  .input-with-select .el-input__inner{
      padding:6% 0 6% 15%;
      border: none;
  }
  .el-input-group__append, .el-input-group__prepend{
      padding: 0, 4%;
  }

</style>