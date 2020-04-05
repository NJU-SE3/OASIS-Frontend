<template>
	<el-container class="main">
		<el-header id="header" style="height: 35vh;min-height: 270px; padding:0;">
			<div id="overlay">
				<div id="o-content" class="content">
					<h1 class="title">
						OASIS
					</h1>
					<el-input class="filter-input" placeholder="" v-model="searchCon" @keyup.enter.native="filterInRes">
            <el-button slot="append" icon="el-icon-search" @click="filterInRes"></el-button>
					</el-input>
				</div>
			</div>
		</el-header>

    <el-row class="main-content">
      <el-col :span="5" v-if="sort_type == 'author'" class="field-filter-bar">
        <!-- <div class="field-filter" style="height: 500px;"></div> -->
        <filter-bar :author_fields="author_fields" @filterField="searchByField"></filter-bar>
      </el-col>
      <el-col class="sort-table" :span="span_len" :offset="2">
        <div class="sort-table-title">
          Top {{ sort_type }} in all
        </div>
        <sort-list :list_title="sort_title" 
                   :table_data_prop="table_data" 
                   :loading="shouldLoad"
                   @getProfile="jumpToProfile"></sort-list>
      </el-col>
    </el-row>

    <el-row class="page-footer">
      <pagination :search_page_number="search_page_number"
                  :current_page="current_page"
                  :page_size="page_size"
                  @page-change="getNextPage">
      </pagination>
    </el-row>


	</el-container>
</template>

<script>
import search from "../components/Search"
import sort_list from "../components/SortList"
import filter_bar from "../components/FilterBar"
import pagination from "../components/Pagination"

import { getRequest } from "../utils/request"
import {jump2Profile} from "../utils/profileInfo";

export default {
	name: "sort",

	components: {
    "search": search,
    "sort-list": sort_list,
    "filter-bar": filter_bar,
    "pagination": pagination
  },

  data() {
    return {
      searchCon: "",
      sort_title: [],
      sort_type: "",
      table_data: [],
      field_affi_conf_title: ["activeness", "paperCount", "citationCount", "authorCount", "heat", "H_index"],
      author_title: ["activeness", "paperCount", "citationCount", "heat", "H_index"],
      span_len: 22,
      // author_fields: ["Software Engineering", "Artificial Intelligence", "Computer Network"],
      author_fields: [],
      origin_data: [],
      field_summary: [],
      shouldLoad: true,
      search_page_number: 100,
      current_page: 0,
      page_size: 20
    }
  },

  created() {
    this.sort_type = this.$route.query.type;
    if (this.sort_type == "author") {
      this.sort_title = this.author_title;
      this.span_len = 17;
    }
    else {
      this.sort_title = this.field_affi_conf_title;
    }

    // /api/field/list
    var url = "/api/" + this.sort_type + "/list?pageNum=" + this.current_page;
    var _this = this;
    getRequest(url)
        .then(res => {
          // console.log(res);
          _this.handleTableData(res.data);
          // _this.getFieldSummary();
        })
        .catch(err => {
          console.log(err);
        })

  },

  methods: {
    filterInRes() {
      // console.log(this.searchCon);

      if (this.searchCon === "") {
        this.table_data = this.origin_data;
        return;
      }

      var filterRes = new Array(0);
      var _this = this;
      _this.origin_data.forEach(item => {
        if (item.name.indexOf(_this.searchCon) != -1) {
          filterRes.push(item);
        }
      });
      _this.table_data = filterRes;

    },

    handleTableData(rawData) {
      if (this.sort_type === "author") {
        rawData.forEach(element => {
          element.name = element.authorName;
          element.heat = Math.round(element.heat * 100) / 100;

          delete element.authorName;
          delete element.affiliationName;
          delete element.bioParagraphs;
          delete element.trends;
        })
      }
      else {
        var type = this.sort_type;
        rawData.forEach(element => {
          element.heat = Math.round(element.heat * 100) / 100;
          if (type === "affiliation") {
            element.name = element.affiliationName;
          }
          else if (type === "conference") {
            element.name = element.conferenceName;
          }
          else {
            element.name = element.fieldName;
          }
        })
      }

      this.origin_data = rawData;
      this.table_data = rawData;
    },

    jumpToProfile(val) {
      jump2Profile(this.$router, this.sort_type, val.id);
    },

    searchByField(data) {
      console.log("searchByField: ", data);
    },

    getNextPage(updatedPage) {
      var _this = this;
      _this.current_page = updatedPage;
      var url = "/api/" + _this.sort_type + "/list?pageNum=" + _this.current_page;
      getRequest(url)
        .then(res => {
          _this.handleTableData(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style>
.main{
  color:white;
  height: 100%;
  overflow: auto
}

.title {
  font-size: 50px;
  margin: 0 0 8px 0;
  cursor: pointer;
}

#header{
  position: relative;

  background-image: url("../assets/mainpage/index.jpg");
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
}

.main-content {
  font-size: 0;
}

/* .main-content > .field-filter {
  width: 100%;
  height: 500px;
  background: rosybrown;
} */

.main-content > .field-filter-bar {
  /* margin-top: 80px; */
  padding: 0 80px;
}

.sort-table {
  /* background: rgba(255, 255, 255, .3); */
  height: 100%;
  /* margin: 45px 180px; */
  padding-right: 100px;
}

.sort-table  .sort-table-title {
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0 30px 0;
}

/* .table-content .content-title {
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}

.table-content .content-title .content-title-item {
  display: inline-block;
} */

.filter-input {
  width: 450px;
}

.el-input__inner {
  background: rgba(255,255,255,0.5);
  border-radius: 2em 0 0 2em;
  border-right: 0;
  /* border-color: transparent; */
}

.el-input__inner:focus {
  border-color: rgba(255, 255, 255, 0.5);
}

.el-input-group__append, .el-input-group__prepend {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0 2em 2em 0;
}

.content > [class*=" el-icon-"], [class^=el-icon-] {
  color: black;
}

.page-footer{
  display: block;
  text-align: center;
  margin: 40px 0;
}

</style>
