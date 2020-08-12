<template>
  <div class="side-bar">
    <!--<div class="search-within">-->
      <!--<div class="indicator">Search within</div>-->
      <!--<search @paperSearch="searchVal"></search>-->
    <!--</div>-->
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
    </div>
    <div class="category-select">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Author" name="1">
          <div v-for="(author, index) in authorSummary" :key="index">
            <el-checkbox class="check-box"
                         v-model="authorSummaryCheck[index]">
              {{handleLength(author.first)}}({{author.second}})
            </el-checkbox>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Conference" name="2">
          <div v-for="(conference, index) in conferenceSummary" :key="index">
            <el-checkbox class="check-box" v-model="conferenceSummaryCheck[index]">
              {{handleLength(conference.first)}}({{conference.second}})
            </el-checkbox>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Affiliation" name="3">
          <div v-for="(affiliation, index) in affiliationSummary"
               :key="index">
            <el-tooltip placement="bottom">
              <div slot="content">{{affiliation.first}}({{affiliation.second}})</div>
              <el-checkbox class="check-box" v-model="affiliationSummaryCheck[index]">
                {{handleLength(affiliation.first)}}({{affiliation.second}})
              </el-checkbox>
            </el-tooltip>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Term" name="4">
          <div v-for="(term, index) in termSummary" :key="index">
            <el-checkbox class="check-box" v-model="termSummaryCheck[index]">
              {{handleLength(term.first)}}({{term.second}})
            </el-checkbox>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="apply-button">
        <el-button round
                   @click="collectSearchWithin">
          OK
        </el-button>
      </div>
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

      watch: {
        authorSummary(){
          this.setValuesToDefault();
        },

        affiliationSummary() {
          this.setValuesToDefault();
        },

        termSummary() {
          this.setValuesToDefault();
        },

        conferenceSummary(){
          this.setValuesToDefault();
        },
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
        this.setValuesToDefault();
      },

      methods: {
        handleLength(value){
          if(value.length <= 30){
            return value;
          }
          else {
            return value.substring(0, 30) + "...";
          }
        },

        checkYear(value) {
          this.yearChecked = true;
        },

        handleChange(val) {
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

        collectSearchWithin() {
          this.authorChecked = false;
          this.conferenceChecked = false;
          this.affiliationChecked = false;
          this.termChecked = false;

          this.authorSummaryCheck.forEach(item => {
            this.authorChecked = this.authorChecked || item;
          });
          this.conferenceSummaryCheck.forEach(item => {
            this.conferenceChecked = this.conferenceChecked || item;
          });
          this.affiliationSummaryCheck.forEach(item => {
            this.affiliationChecked = this.affiliationChecked || item;
          });
          this.termSummaryCheck.forEach(item => {
            this.termChecked = this.termChecked || item;
          });

          this.searchWithinQuery.year = "";
          this.searchWithinQuery.author = "";
          this.searchWithinQuery.conference = "";
          this.searchWithinQuery.affiliation = "";
          this.searchWithinQuery.term = "";

          if(this.yearChecked) {
            this.searchWithinQuery.year = this.getYearFromDatePick(this.startYear)
              + "_" + this.getYearFromDatePick(this.endYear);
          }
          if(this.authorChecked) {
            var author = "";
            this.authorSummaryCheck.forEach((item,index) => {
              if(item) {
                author += this.authorSummary[index].first + ";";
              }
            });
            this.searchWithinQuery.author = author;
          }
          if(this.conferenceChecked) {
            var conference = "";
            this.conferenceSummaryCheck.forEach((item, index) => {
              if(item) {
                conference += this.conferenceSummary[index].first + ";";
              }
            });
            this.searchWithinQuery.conference = conference;
          }
          if(this.affiliationChecked) {
            var affiliation = "";
            this.affiliationSummaryCheck.forEach((item, index) => {
              if(item) {
                affiliation += this.affiliationSummary[index].first + ";";
                affiliation += this.affiliationSummary[index].first + ";";
              }
            });
            this.searchWithinQuery.affiliation = affiliation;
          }
          if(this.termChecked) {
            var term = "";
            this.termSummaryCheck.forEach((item, index) => {
              if(item) {
                term += this.termSummary[index].first + ";";
              }
            });
            this.searchWithinQuery.term = term;
          }
          this.$emit("searchWithin", this.searchWithinQuery);
        },

        setValuesToDefault() {
          var nowDate = new Date();
          this.startYear = nowDate.getFullYear().toString();
          this.endYear = nowDate.getFullYear().toString();

          this.authorSummaryCheck.fill(false);
          this.conferenceSummaryCheck.fill(false);
          this.affiliationSummaryCheck.fill(false);
          this.termSummaryCheck.fill(false);

          this.yearChecked = false;
          this.authorChecked = false;
          this.affiliationChecked = false;
          this.conferenceChecked = false;
          this.termChecked = false;
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

  .el-date-editor input
  {
    background-color: transparent;
    border: transparent;
    color: azure;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100px;
  }

  .el-picker-panel {
    background-color: rgba(255,255,255,0.8);
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
    margin-top: 5%;
  }

  .el-button.is-round{
    background-color: rgba(255,255,255,0.5);
    border: transparent;
  }

  .el-button:focus, .el-button:hover{
    color: azure;
  }

  .el-tooltip__popper.is-dark{
    color: #444a69;
    background: rgba(255,255,255,0.7);
  }

</style>
