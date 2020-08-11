<template>
  <div class="trend" @click="hideMenu">
    <search-with-dropdown
      class="search"
      @confirmField="chooseField"
      :show_dropdown="show_menu"
    ></search-with-dropdown>

    <div class="field-tags">
      <div class="fields">
        <el-tag
          v-for="tag in field_select"
          :key="tag.id"
          closable
          @close="deleteTag(tag)"
          class="tag-item"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>

    <!-- <div class="test-group">
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
    </div> -->
    <TrendCard class="trend-card" :trendsList="trendsList" />
  </div>
</template>

<script>
import SearchWithDropdown from '../components/SearchWithDropdown'
import TrendCard from '../components/FieldsTrendCard'
import { getRequest } from '../utils/request'

export default {
  name: 'Trend',

  components: {
    'search-with-dropdown': SearchWithDropdown,
    TrendCard
  },

  data () {
    return {
      field_select: [],
      show_menu: false,
      trendsList: []
    }
  },

  methods: {
    chooseField (field) {
      console.log('field: ', field)

      if (this.field_select.length === 5) {
        this.$message({
          message: 'no more than 5 fields',
          type: 'warning'
        })
      } else if (this.field_select.indexOf(field) !== -1) {
        this.$message({
          message: 'field already exists',
          type: 'warning'
        })
      } else {
        this.field_select.push(field);
        this.addTrend(field.id);
      }
    },

    hideMenu (e) {
      let searchbar = document.querySelector('.search')

      console.log(e.target)

      if (e.target !== searchbar) {
        console.log('hide menu');
        this.show_menu = false;
      }
    },

    deleteTag (tag) {
      this.field_select.splice(this.field_select.indexOf(tag), 1);
      this.deleteTrend(tag.id);
    },

    addTrend (id) {
      getRequest(
        `/api/report/paper/trend/year?baseline=activeness&refinement=${id}`
      ).then(res => {
        const curList = [...this.trendsList]
        curList.push({
          id: id,
          name: name,
          list: res.data
        })
        this.trendsList = curList
      })
    },
    deleteTrend (id) {
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
  height: 35px;
}

.trend .field-tags .tag-item {
  margin-right: 5px;
}

.trend .trend-card {
  margin: 80px 0;
}
</style>
