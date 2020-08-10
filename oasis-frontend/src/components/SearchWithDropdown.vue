<template>
  <div class="searchbar" @click="hideMenu">
    <div class="input">
      <el-input class="inputbar" placeholder="" v-model="field_search" @keyup.enter.native="submit">
        <el-button slot="append" icon="el-icon-search" @click="submit" class="submit-btn"></el-button>
      </el-input>
    </div>
    <div class="dropdown" v-show="show_menu" ref="drop">
      <div class="dropdown-menu">
        <ul class="field-match-list" @click="chooseField">
          <li class="field-item" v-for="(item, index) in field_match_list" :key="index" :id="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchWithDropdown",
  props: ["show_dropdown"],
  data() {
    return {
      show_menu: this.show_dropdown,
      field_search: "",
      field_match_list: []
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
      if (this.field_search === "") {
        this.$message({
          message: 'please input a field',
          type: 'warning'
        });
      }

      this.field_match_list = [
        {
          id: "5e8331c0982a43f4fd446ca8",
          name: "name1"
        },
        {
          id: "id2",
          name: "name2"
        },
        {
          id: "id2",
          name: "name2"
        },
        {
          id: "id2",
          name: "name2"
        },
        {
          id: "id2",
          name: "name2"
        },
        {
          id: "id2",
          name: "name2"
        },
        {
          id: "id2",
          name: "name2"
        }
      ];
      this.show_menu = true;
      this.field_search = "";
    },

    chooseField(e) {
      this.show_menu = false;
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