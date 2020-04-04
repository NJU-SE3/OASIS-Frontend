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
        <filter-bar :author_fields="author_fields"></filter-bar>
      </el-col>
      <el-col class="sort-table" :span="span_len" :offset="2">
        <div class="sort-table-title">
          Top {{ sort_type }} in all
        </div>
        <sort-list :list_title="sort_title" :table_data_prop="table_data" @getProfile="jumpToProfile"></sort-list>
      </el-col>
    </el-row>


	</el-container>
</template>

<script>
import search from "../components/Search"
import sort_list from "../components/SortList"
import filter_bar from "../components/FilterBar"

import { getRequest } from "../utils/request"

export default {
	name: "sort",

	components: {
    "search": search,
    "sort-list": sort_list,
    "filter-bar": filter_bar
  },

  data() {
    return {
      searchCon: "",
      sort_title: [],
      sort_type: "",
      table_data: [],
      field_affi_conf_title: ["activeness", "paperCount", "citationCount", "authorCount", "heat", "H_index"],
      // field_affi_conf_title: ["activeness", "paperCount", "citationCount", "heat", "H_index", "id"],
      author_title: ["activeness", "paperCount", "citationCount", "heat", "H_index"],
      // affiliation_title: ["Liveness", "PaperCount", "Citation", "AuthorCount", "Heat"],
      // conference_title: ["Liveness", "PaperCount", "Citation", "AuthorCount", "Heat"]
      span_len: 22,
      author_fields: ["Software Engineering", "Artificial Intelligence", "Computer Network"],
      author_table_data: [
        {
          Name: "testname1",
          Liveness: 100,
          PaperCount: 20,
          Citation: 300,
          Heat: 45
        },
        {
          Name: "testname2",
          Liveness: 200,
          PaperCount: 35,
          Citation: 200,
          Heat: 39
        },
        {
          Name: "testname3",
          Liveness: 120,
          PaperCount: 30,
          Citation: 240,
          Heat: 40
        }
      ],
      field_affi_conf_table_data: [
        {
          Name: "testname1",
          activeness: 100,
          paperCount: 20,
          citationCount: 300,
          authorCount: 250,
          heat: 45
        },
        {
          activeness: 100,
          Name: "testname1",
          heat: 45,
          paperCount: 20,
          citationCount: 300,
          authorCount: 250,
          
        },
        {
          Name: "testname1",
          activeness: 100,
          paperCount: 20,
          citationCount: 300,
          authorCount: 250,
          heat: 45
        }
      ],
      assist_data: []
    }
  },

  created() {
    this.sort_type = this.$route.query.type;
    if (this.sort_type == "author") {
      this.sort_title = this.author_title;
      // this.table_data = this.author_table_data;
      this.span_len = 17;
    }
    else {
      this.sort_title = this.field_affi_conf_title;
      // this.table_data = this.field_affi_conf_table_data;
    }

    // /api/field/list
    var url = "/api/" + this.sort_type + "/list";
    var _this = this;
    getRequest(url)
        .then(res => {
          console.log(res);
          _this.handleTableData(res.data);
          console.log(_this.table_data);
          // console.log("end");
        })
        .catch(err => {
          console.log(err);
        })

  },

  methods: {
    filterInRes() {
      console.log(this.searchCon);
    },

    handleTableData(rawData) {
      // console.log("rawData: ", rawData);

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


      this.table_data = rawData;
    },

    jumpToProfile(val) {
      var toPath = "/" + this.sort_type + "-profile";
      this.$router.push({ path: toPath, query: { id: val.id }});
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


</style>