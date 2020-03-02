<template>
  <div class="side-bar">
    <div class="search-within">
      <div class="indicator">Search within</div>
      <search @paperSearch="searchVal"></search>
    </div>
    <div class="date-pick">
      <div class="indicator">Year pick</div>
      <div class="year-pick start-year">
        <el-date-picker
          v-model="startYear"
          type="year"
          placeholder="Start"
          @change="checkYear($event)">
        </el-date-picker>
      </div>
      <div class="year-pick end-year">
        <el-date-picker
          v-model="endYear"
          type="year"
          placeholder="End"
          @change="checkYear($event)">
        </el-date-picker>
      </div>
      <div class="apply-button" v-if="startYear != '' || endYear != ''">
        <el-button round @click="collectSearchWithin">
          OK
        </el-button>
      </div>
    </div>
    <div class="category-select">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Author" name="1">
          <div v-for="(author, index) in authorSummary">
            <el-checkbox class="check-box"
                         v-model="authorSummaryCheck[index]">
              {{author.first}}({{author.second}})
            </el-checkbox>
          </div>
          <div class="apply-button">
            <el-button round
                       v-if="showOK(authorSummaryCheck, 'author')"
                       @click="collectSearchWithin">
              OK
            </el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Conference" name="2">
          <div v-for="(conference, index) in conferenceSummary">
            <el-checkbox class="check-box" v-model="conferenceSummaryCheck[index]">
              {{conference.first}}({{conference.second}})
            </el-checkbox>
          </div>
          <div class="apply-button">
            <el-button round
                       v-if="showOK(conferenceSummaryCheck, 'conference')"
                       @click="collectSearchWithin">
              OK
            </el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Affiliation" name="3">
          <div v-for="(affiliation, index) in affiliationSummary">
            <el-checkbox class="check-box" v-model="affiliationSummaryCheck[index]">
              {{affiliation.first}}({{affiliation.second}})
            </el-checkbox>
          </div>
          <div class="apply-button">
            <el-button round
                       v-if="showOK(affiliationSummaryCheck, 'affiliation')"
                       @click="collectSearchWithin">
              OK
            </el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Term" name="4">
          <div v-for="(term, index) in termSummary">
            <el-checkbox class="check-box" v-model="termSummaryCheck[index]">
              {{term.first}}({{term.second}})
            </el-checkbox>
          </div>
          <div class="apply-button">
            <el-button round v-if="showOK(termSummaryCheck, 'term')"
                       @click="collectSearchWithin">
              OK
            </el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
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

      props: {
        authorSummary: Array,
        affiliationSummary: Array,
        termSummary: Array,
        conferenceSummary: Array,
      },

      data() {
        return {
          searchWithinChecked: false,

          yearChecked: false,
          authorChecked: false,
          affiliationChecked: false,
          conferenceChecked: false,
          termChecked: false,

          authorSummaryCheck: Array(this.authorSummary.length).fill(false),
          affiliationSummaryCheck: Array(this.affiliationSummary.length).fill(false),
          termSummaryCheck: Array(this.termSummary.length).fill(false),
          conferenceSummaryCheck: Array(this.conferenceSummary.length).fill(false),


          startYear: "",
          endYear: "",
          activeNames: [],

          searchWithinQuery: {
            conference:"",
            term: "",
            author: "",
            year: "",
            affiliation: "",
          },
        };
      },

      created() {
        var nowDate = new Date();
        this.startYear = nowDate.getFullYear().toString();
        this.endYear = nowDate.getFullYear().toString();
      },

      methods: {
        checkYear(value) {
          this.yearChecked = true;
        },

        handleChange(val) {
          console.log(val);
        },

        searchVal(val) {
          this.$emit("advancedSearch", val);
        },

        getYearFromDatePick(date) {
          if(date.toString().indexOf(" ") < 0)
          {
            return date.toString();
          }
          return date.toString().split(" ")[3];
        },

        showOK(summaryCheckList, type) {
          var result = false;
          summaryCheckList.forEach(item => {result = result || item;});
          if(type.toString() == "author")
          {
            this.authorChecked = result;
          }
          else if(type.toString() == "conference")
          {
            this.conferenceChecked = result;
          }
          else if(type.toString() == "affiliation")
          {
            this.affiliationChecked = result;
          }
          else if(type.toString() == "term")
          {
            this.termChecked = result;
          }
          //console.log(this.authorChecked);
          //console.log(this.conferenceChecked);
          return result;
        },

        collectSearchWithin() {
          if(this.yearChecked) {
            this.searchWithinQuery.year = this.getYearFromDatePick(this.startYear)
              + "_" + this.getYearFromDatePick(this.endYear);
          }
          if(this.authorChecked) {
            var author = "";
            this.authorSummaryCheck.forEach((item,index) => {
              if(item) {
                author += this.authorSummary[index] + " ";
              }
            });
            this.searchWithinQuery.author = author;
          }
          if(this.conferenceChecked) {
            var conference = "";
            this.conferenceSummaryCheck.forEach((item, index) => {
              if(item) {
                conference += this.conferenceSummary[index] + " ";
              }
            });
            this.searchWithinQuery.conference = conference;
          }
          if(this.affiliationChecked) {
            var affiliation = "";
            this.affiliationSummaryCheck.forEach((item, index) => {
              if(item) {
                affiliation += this.affiliationSummary[index] + " ";
              }
            });
            this.searchWithinQuery.affiliation = affiliation;
          }
          if(this.termChecked) {
            var term = "";
            this.termSummaryCheck.forEach((item, index) => {
              if(item) {
                term += this.termSummary[index] + " ";
              }
            });
            this.searchWithinQuery.term = term;
          }
          console.log(this.searchWithinQuery);
        },
      }
    };
</script>

<style>
  .indicator{
    color: azure;
    display: block;
    text-align: left;
  }

  .search-within {
    margin: 0 3% 7% 3%;
}

  .date-pick{
    margin: 0 3% 7% 3%;
}

  .year-pick{
    display: inline-block;
  }

  .el-input__inner
  {
    background-color: transparent;
    border: transparent;
  }

  .el-input__inner{
    color: azure;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100px;
  }

  .el-picker-panel {
    background-color: rgba(255,255,255,0.5);
  }

  .el-date-picker__header-label:hover,.el-picker-panel__icon-btn:hover {
    color: azure;
  }

  .el-year-table td .cell:hover, .el-year-table td.current:not(.disabled) .cell {
    color: azure;
  }

  .el-year-table td.today .cell {
    color: azure;
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
  }

  .check-box {
    height: 100%;
  }

  .el-collapse-item__header{
    background-color: transparent;
    color: azure;
  }

  .el-collapse-item__wrap{
    background-color: transparent;
    display: block;
    text-align: left;
  }

  .apply-button{
    display: block;
    text-align: center;
  }

  .el-button.is-round{
    background-color: rgba(255,255,255,0.5);
    border: transparent;
  }

  .el-button:focus, .el-button:hover{
    color: azure;
  }

</style>
