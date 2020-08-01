<template>
  <el-pagination layout="prev,pager,next"
                 :total="search_page_num_prop"
                 :current-page="curr_page_prop"
                 :page-size="page_size_prop"
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

      data() {
        return {
          search_page_num_prop: this.search_page_number,
          curr_page_prop: this.current_page,
          page_size_prop: this.page_size
        }
      },

      watch: {
        "search_page_number": function(val) {
          this.search_page_num_prop = val;
        },
        "current_page": function(val) {
          this.curr_page_prop = val;
        },
        "page_size": function(val) {
          this.page_size_prop = val;
        }
      },

      methods: {
        handleCurrentChange: function (currentPage) {
          this.curr_page_prop = currentPage;
          this.$emit("page-change", this.curr_page_prop);
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
