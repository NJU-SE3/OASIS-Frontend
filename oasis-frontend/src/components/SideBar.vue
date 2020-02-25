<template>
  <div class="side-bar">
    <div class="search-within">
      <search></search>
    </div>
    <div class="date-pick">
      <el-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
    </div>
    <div class="category-select">
      <el-checkbox class="check-box" v-model="essayChecked">Essay</el-checkbox>
      <el-checkbox class="check-box" v-model="authorChecked">Author</el-checkbox>
      <el-checkbox class="check-box" v-model="organizationChecked">Organization</el-checkbox>
    </div>
  </div>
</template>

<script>
  import search from "./Search"
    export default {
      name: "side-bar",
      components: {
         'search': search,
      },
      data() {
        return {
          essayChecked: true,
          authorChecked: true,
          organizationChecked: true,
          value: '',
        };
      }
    };
</script>

<style>
  .search-within {
    margin: 0 3% 7% 3%;
}
  .date-pick{
    margin: 0 3% 7% 3%;
    /* border: solid pink; */
}

  .el-range-editor.el-input__inner{
    width: 100%;
    height: 100%;
    border-color: transparent;
    background-color: rgba(255,255,255,0.5);
    border-radius: 2em 2em 2em 2em
  }

  .el-range-editor .el-range-input {
    line-height: 1;
    background-color: transparent;
  }

  .el-date-editor .el-range-input{
    background-color: transparent;
  }

  .el-date-editor .el-range-input, .el-date-editor .el-range-separator {
    background-color: transparent;
  }

  .el-checkbox {
    color: azure;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: azure;
  }

  .category-select {
    height: 100%;
    width: 100%;
    border: solid pink;
  }

  .check-box {
    height: 100%;
    border: solid pink;
  }

  .el-pagination button:disabled {
    background-color: rgba(255,255,255,0.5);
  }

  .el-pagination .btn-prev {
    border-radius: 2em 0 0 2em;
    background-color: rgba(255,255,255,0.5);
  }

  .el-pager li {
    background-color: rgba(255,255,255,0.5);
  }

  .el-pager li.active {
    color: azure;
  }

  .el-pagination .btn-next {
    background-color: rgba(255,255,255,0.5);
    border-radius: 0 2em 2em 0;
  }

</style>
