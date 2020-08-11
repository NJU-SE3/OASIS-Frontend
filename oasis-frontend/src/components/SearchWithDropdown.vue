<template>
  <div class="searchbar" @click="hideMenu">
    <div class="input">
      <el-input class="inputbar" placeholder="" v-model="field_search" @keyup.enter.native="submit">
        <el-button slot="append" icon="el-icon-search" @click="submit" class="submit-btn"></el-button>
      </el-input>
    </div>
    <div class="dropdown" v-show="show_menu" ref="drop">
      <div class="dropdown-menu">
        <ul class="field-match-list" @click="chooseField" v-loading="is_loading">
          <li class="no-content-tip" v-if="no_content">no search result</li>
          <li class="field-item" v-for="(item, index) in field_match_list" :key="index" :id="item.id">{{ item.fieldName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getRequest} from "../utils/request.js"
export default {
  name: "SearchWithDropdown",
  props: ["show_dropdown"],
  data() {
    return {
      show_menu: this.show_dropdown,
      field_search: "",
      field_match_list: [],
      is_loading: true,
      no_content: false
    }
  },

  watch: {
    "show_dropdown": function(val) {
      console.log("watch");
      this.show_menu = val;
    }
  },

  methods: {
    submit() {
      this.is_loading = true;
      this.no_content = false;

      if (this.field_search === "") {
        this.$message({
          message: 'please input a field',
          type: 'warning'
        });
      }

      let _this = this;

      getRequest(`/api/field/search?query=${_this.field_search}`)
        .then(data => {
          // console.log("data", data);
          if (data.data.length === 0) {
            _this.no_content = true;
          }
          else {
            _this.field_match_list = data.data;
            _this.no_content = false;
          }
          _this.is_loading = false;
        })
        .catch(err => {
          _this.is_loading = false;
          _this.no_content = true;
        })

      
      this.show_menu = true;
      this.field_search = "";
    },

    chooseField(e) {
      let no_content = document.querySelector(".no-content-tip");
      this.show_menu = false;

      if (e.target === no_content) {
        return;
      }
      
      this.$emit("confirmField",{id: e.target.id, name: e.target.innerText});
      this.field_match_list = [];
    },

    hideMenu(e) {
      let input = document.querySelector(".inputbar"),
          menu = document.querySelector(".dropdown-menu"),
          submiticon = document.querySelector(".submit-btn");

      console.log(e.target);

      if (e.target !== input && e.target !== menu && e.target !== submiticon) {
        this.show_menu = false;
        console.log("hide");
      }
      else {
        this.show_menu = true;
      }
    }
  }
}
</script>

<style>
  .searchbar {
    position: relative;
  }

  .searchbar .input {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .searchbar .input .inputbar{
    /* display: inline-block; */
    width: 600px;
  }

  .searchbar .input .inputbar .el-input__inner {
    background-color: rgba(255, 255, 255, 0.5);
  }


  .searchbar .dropdown {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .searchbar .dropdown .dropdown-menu {
    width: 600px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0 0 1em 1em;
  }

  .searchbar .dropdown .dropdown-menu .field-match-list {
    padding: 0;
    position: relative;
  }

  .searchbar .dropdown .dropdown-menu li {
    list-style-type: none;
    text-align: left;
    padding: 0.5em 1em;
  }

  .searchbar .dropdown .dropdown-menu li:hover {
    background: rgba(255, 255, 255, 0.7);
    cursor: default;
  }

</style>