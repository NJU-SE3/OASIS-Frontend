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
</template>

<script>
import SearchWithDropdown from '../components/SearchWithDropdown'
import TrendCard from '../components/FieldsTrendCard'
import TopRankingCard from "../components/TopRankingCard.vue";
import { getRequest } from '../utils/request'

export default {
  name: 'Trend',

  components: {
    'search-with-dropdown': SearchWithDropdown,
    'top-ranking-card': TopRankingCard,
    TrendCard
  },

  data () {
    return {
      field_select: [],
      related_field: [],
      show_menu: false,
      trendsList: [],
      topRankingContent: [
        {
          type: "Authors",
          router_type: "author",
          startIndex: 1,
          items: [],
        },
        {
          type: "Affiliations",
          router_type: "affiliation",
          startIndex: 1,
          items: [],
        },
        {
          type: "Papers",
          startIndex: 1,
          items: [],
        },
      ],
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
        this.addTrend(field.id);
        this.getRelatedField(field.id);
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
      this.deleteRelatedFields(id);
    },

    getRelatedField(id){
      getRequest("/api/graph/field/?id=" + id)
        .then(res=>{
          var data = res.data.nodes;

          this.related_field.push({
            id: data[1].id,
            name: data[1].fieldName,
            related_id: id,

          },
            {
            id: data[2].id,
              name: data[2].fieldName,
              related_id: id,

          },
            {
              id: data[3].id,
              name: data[3].fieldName,
              related_id: id,
            },
          );
        })
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
}

.trend .field-tags {
  margin: 20px auto;
  height: 100px;
}

.trend .field-tags .tag-item {
  margin-right: 5px;
  margin-bottom: 8px;
}

.trend .field-tags .related-tag-item {
  margin-right: 5px;
  margin-bottom: 8px;
  color: darkorange;
}

.related-tag-item:hover {
  cursor: pointer;
}

.trend .trend-card {
  margin: 30px 0;
}
</style>
