<template>
    <div class="search-bar">
        <el-input class="input-with-select" placeholder="" v-model="searchCon" @keyup.enter.native="submit">
            <el-select class="search-pre" v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option label="All" value="all"></el-option>
                <el-option label="Title" value="title"></el-option>
                <el-option label="Author" value="authors"></el-option>
                <el-option label="Conference" value="conferences"></el-option>
                <el-option label="Terms" value="terms"></el-option>
                <el-option label="Affiliation" value="affiliations"></el-option>
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
            searchType:"All",
            searchCon:""
        }
    },
    methods:{
        submit(){
            // console.log(this.searchType,"  ",this.searchCon);
            this.$emit("paperSearch", {type: this.searchType, con: this.searchCon});
        }
    }
}
</script>

<style>
  .el-select .el-input {
    width: 9em;
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
      padding:6% 1% 6% 15%;
      border: none;
  }
  .el-input-group__append, .el-input-group__prepend{
      padding: 0, 4%;
  }
    .input-with-select .el-input__inner::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
        color: black; 
        font-size: 65%;
    } 
    .input-with-select .el-input__inner:-moz-placeholder, textarea:-moz-placeholder { 
        color: black; 
        font-size: 65%;
    } 
    .input-with-select .el-input__inner::-moz-placeholder, textarea::-moz-placeholder { 
        color: black; 
        font-size: 65%;
    } 
    .input-with-select .el-input__inner:-ms-input-placeholder, textarea:-ms-input-placeholder { 
        color: black;
        font-size: 65%;
    }
    .el-select-dropdown__wrap{
        background-color:transparent;
    }
    .el-select-dropdown {
        background-color:rgba(255,255,255,0.5);
    }
    .el-select-dropdown__item.selected{
        color:black;
    }

</style>