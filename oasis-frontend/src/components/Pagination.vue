<template>
  <el-pagination layout="prev,pager,next"
                 :total="search_page_number"
                 :current-page="current_page"
                 :page-size="page_size"
                 @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
    export default {
        name: "pagination",

      props: {
        search_page_number: Number,
        current_page: Number,
        page_size: Number,
      },

      methods: {
        handleCurrentChange: function (currentPage) {
          this.current_page = currentPage;
          this.$emit("page-change", this.current_page);
        },
      },
    }
</script>

<style>
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
