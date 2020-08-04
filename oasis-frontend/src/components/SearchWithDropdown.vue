<template>
  <div class="searchbar" @click="hideMenu">
    <div class="input">
      <el-input class="inputbar" placeholder="" v-model="field_search" @keyup.enter.native="submit">
        <el-button slot="append" icon="el-icon-search" @click="submit"></el-button>
      </el-input>
    </div>
    <div class="dropdown" v-show="show_menu" ref="drop">
      <div class="dropdown-menu">
        <ul class="field-match-list" @click="chooseField">
          <li class="field-item" v-for="(item, index) in field_match_list" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchWithDropdown",
  data() {
    return {
      show_menu: false,
      field_search: "",
      field_match_list: []
    }
  },

  methods: {
    submit() {
      this.field_match_list.push(this.field_search);
      this.show_menu = true;
      this.field_search = "";
    },

    chooseField(e) {
      this.show_menu = false;
      this.$emit("confirmField", e.target.innerText);
      this.field_match_list = [];
    },

    hideMenu(e) {
      let input = document.querySelector(".inputbar"),
          menu = document.querySelector(".dropdown-menu");

      if (e.target !== input && e.target !== menu) {
        this.show_menu = false;
      }
      else {
        this.show_menu = true;
      }
    }
  }
}
</script>

<style scoped>
  .searchbar .input {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .searchbar .input .inputbar{
    /* display: inline-block; */
    width: 300px;
  }

  .searchbar .dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .searchbar .dropdown .dropdown-menu {
    width: 300px;
    background-color: antiquewhite;
    border-radius: 0 0 1em 1em;
  }

  .searchbar .dropdown .dropdown-menu .field-match-list {
    padding: 0;
    position: relative;
  }

  .searchbar .dropdown .dropdown-menu li {
    list-style-type: none;
    text-align: left;
    padding-left: 1em;
  }

  .searchbar .dropdown .dropdown-menu li:hover {
    background: rgba(255, 255, 255, 0.7);
    cursor: default;
  }

</style>