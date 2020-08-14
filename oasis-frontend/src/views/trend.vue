<template>
<div class="container">
  <el-header style="padding:0 0">
    <MyHeader></MyHeader>
  </el-header>
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
      <div class="related-fields">
        <el-tag
          v-for="tag in related_field"
          :key="tag.id"
          class="related-tag-item"
          @click="chooseField(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>
    <TrendCard class="trend-card" :trendsList="trendsList" />
  </div>
</div>
</template>

<script>
import SearchWithDropdown from '../components/SearchWithDropdown'
import TrendCard from '../components/FieldsTrendCard'
import { getRequest } from '../utils/request'
import MyHeader from "../components/Header.vue"

export default {
  name: 'Trend',

  components: {
    'search-with-dropdown': SearchWithDropdown,
    MyHeader,
    TrendCard
  },

  data () {
    return {
      field_select: [],
      related_field: [],
      show_menu: false,
      trendsList: [],
    }
  },

  methods: {
    chooseField (field) {
      if (this.field_select.length === 5) {
        this.$message({
          message: 'no more than 5 fields',
          type: 'warning'
        })
      } else if (this.field_select.some((val, idx, arr) => {
        return val.id === field.id;
      })) {
        this.$message({
          message: 'field already exists',
          type: 'warning'
        })
      } else {
        this.field_select.push(field);
        this.addTrend(field.id, field.name);
      }
    },

    hideMenu (e) {
      let searchbar = document.querySelector('.search')

      if (e.target !== searchbar) {
        this.show_menu = false;
      }
    },

    deleteTag (tag) {
      this.field_select.splice(this.field_select.indexOf(tag), 1);
      this.deleteTrend(tag.id);
    },

    addTrend (id, name) {
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
      this.deleteRelatedFields(id);
    },

    deleteRelatedFields(id) {
      const curList = this.related_field.filter(trend => trend.related_id !== id)
      this.related_field = curList
    },
  }
}
</script>

<style scoped>
.trend {
  padding: 10px 4%;
  margin-top: 20px;
}

.trend .field-tags {
  margin: 20px auto 10px;
  height: 35px;
}

.trend .field-tags .tag-item {
  margin-right: 5px;
}

.trend .trend-card {
  margin: 20px 0;
}
</style>
