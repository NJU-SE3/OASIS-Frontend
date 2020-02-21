<template>
  <div class="side-bar">
    <div class="search-within">
      <search></search>
    </div>
    <div class="date-pick">
      <el-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
    </div>
    <div class="category-select">

    </div>
  </div>
</template>

<script>
  import search from "./search"
    export default {
      name: "side-bar",
      components: {
         'search': search,
      }
    }
</script>

<style scoped>
  .search-within {
    margin: 0 3% 3% 3%;
}
  .date-pick{
    margin: 0 3% 3% 3%;
  }
</style>
