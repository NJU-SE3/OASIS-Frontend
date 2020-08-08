<template>
  <div class="trend" @click="hideMenu">
    <search-with-dropdown class="search" @confirmField="chooseField" :show_dropdown="show_menu"></search-with-dropdown>

    <div class="field-tags">
      <div class="fields">
        <el-tag
          v-for="tag in field_select"
          :key="tag.id"
          closable
          @close="deleteTag(tag)">
          {{ tag.name }}
        </el-tag>
      </div>
    </div>

    <div class="test-group">
      <button @click="addTrend(1, 'a')">1</button
      ><el-button
        type="danger"
        icon="el-icon-delete"
        circle
        @click="deleteTrend(1, 'a')"
      ></el-button>
      <button @click="addTrend(2, 'b')">2</button
      ><el-button
        type="danger"
        icon="el-icon-delete"
        circle
        @click="deleteTrend(2, 'b')"
      ></el-button>
      <button @click="addTrend(3, 'c')">3</button
      ><el-button
        type="danger"
        icon="el-icon-delete"
        circle
        @click="deleteTrend(3, 'c')"
      ></el-button>
    </div>
    <TrendCard :trendsList="trendsList" />
  </div>
</template>

<script>
import SearchWithDropdown from "../components/SearchWithDropdown"
import TrendCard from '../components/FieldsTrendCard'
import { getRequest } from '../utils/request'

export default {
  name: 'Trend',

  components: {
    "search-with-dropdown": SearchWithDropdown,
    TrendCard
  },

  data () {
    return {
      field_select: [],
      show_menu: false,

      testIdList: [
        '5e8331c0982a43f4fd446ca8',
        '5e8331df982a43f4fd446fba',
        '5e8331d2982a43f4fd446f25',
        '5e83326f982a43f4fd44735b',
        '5e83327f982a43f4fd447392'
      ],
      trendsTestList: [
        [
          { year: '2013', count: 19 },
          { year: '2014', count: 12 },
          { year: '2016', count: 14 },
          { year: '2019', count: 10 }
        ],
        [
          { year: '1957', count: 30 },
          { year: '1973', count: 100 },
          { year: '1986', count: 16 },
          { year: '2016', count: 2 }
        ],
        [
          { year: '1954', count: 50 },
          { year: '1967', count: 80 },
          { year: '2002', count: 27 }
        ]
      ],
      trendsList: []
    }
  },

  methods: {
    chooseField(field) {
      console.log("field: ", field);

      if (this.field_select.length === 5) {
        this.$message({
          message: 'no more than 5 fields',
          type: 'warning'
        });
      }
      else if (this.field_select.indexOf(field) !== -1) {
        this.$message({
          message: 'field already exists',
          type: 'warning'
        });
      }
      else {
        this.field_select.push(field);
        this.addTrend(field.id, field.name);
      }

      
    },

    hideMenu(e) {
      let searchbar = document.querySelector(".search");

      console.log(e.target);

      if (e.target !== searchbar) {
        console.log("hide menu");
        this.show_menu = false;
      }
    },

    deleteTag(tag) {
      this.field_select.splice(this.field_select.indexOf(tag), 1);
    },

    addTrend (id, name) {
      getRequest(
        `/api/report/paper/trend/year?baseline=activeness&refinement=${
          this.testIdList[id - 1]
        }`
      ).then(res => {
        console.log(res)
        const curList = [...this.trendsList]
        curList.push({
          id: id,
          name: name,
          list: res.data
        })
        this.trendsList = curList
      })
    },
    deleteTrend (id, name) {
      const curList = this.trendsList.filter(trend => trend.id !== id)
      this.trendsList = curList
    }
  }
}
</script>

<style scoped>
.trend {
  padding: 10px 4%;
}

.trend .field-tags {
  margin: 10px auto;
}
</style>
