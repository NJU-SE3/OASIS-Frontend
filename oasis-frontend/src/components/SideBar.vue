<template>
  <div class="side-bar">
    <div class="search-within">
      <div class="indicator">Search within</div>
      <search></search>
    </div>
    <div class="date-pick">
      <div class="indicator">Year pick</div>
      <div class="year-pick start-year">
        <el-date-picker
          v-model="startYear"
          type="year"
          placeholder="Start">
        </el-date-picker>
      </div>
      <div class="year-pick end-year">
        <el-date-picker
          v-model="endYear"
          type="year"
          placeholder="End">
        </el-date-picker>
      </div>
      <div class="apply-button" v-if="startYear != '' || endYear != ''">
        <el-button round>
          OK
        </el-button>
      </div>
    </div>
    <div class="category-select">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Author" name="1">
          <div>
            <el-checkbox class="check-box" v-model="essayChecked">Essay</el-checkbox>
          </div>
          <div>
            <el-checkbox class="check-box" v-model="authorChecked">Author</el-checkbox>
          </div>
          <div>
            <el-checkbox class="check-box" v-model="organizationChecked">Organization</el-checkbox>
          </div>
          <div class="apply-button">
            <el-button round v-if="essayChecked || authorChecked || organizationChecked">
              OK
            </el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Organization" name="2">
          <div>
            <el-checkbox class="check-box" v-model="essayChecked">Essay</el-checkbox>
          </div>
          <div>
            <el-checkbox class="check-box" v-model="authorChecked">Author</el-checkbox>
          </div>
          <div>
            <el-checkbox class="check-box" v-model="organizationChecked">Organization</el-checkbox>
          </div>
          <div class="apply-button">
            <el-button round v-if="essayChecked || authorChecked || organizationChecked">
              OK
            </el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Term" name="3">
          <div>
            <el-checkbox class="check-box" v-model="essayChecked">Essay</el-checkbox>
          </div>
          <div>
            <el-checkbox class="check-box" v-model="authorChecked">Author</el-checkbox>
          </div>
          <div>
            <el-checkbox class="check-box" v-model="organizationChecked">Organization</el-checkbox>
          </div>
          <div class="apply-button">
            <el-button round v-if="essayChecked || authorChecked || organizationChecked">
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
      data() {
        return {
          essayChecked: false,
          authorChecked: false,
          organizationChecked: false,
          startYear: '',
          endYear: '',
          activeNames: [],
        };
      },
      methods: {
        handleChange(val) {
          console.log(val);
        }
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
