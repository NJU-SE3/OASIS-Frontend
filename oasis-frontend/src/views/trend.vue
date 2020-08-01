<template>
  <div class="trend">
    <search> </search>
    <div class="test-group">
      <button @click="addTrend(1)">1</button>
      <button @click="addTrend(2)">2</button>
      <button @click="addTrend(3)">3</button>
      <button @click="addTrend(4)">4</button>
      <button @click="addTrend(5)">5</button>
    </div>
    <TrendCard />
  </div>
</template>

<script>
import Search from '../components/Search'
import TrendCard from '../components/FieldsTrendCard'
import { getRequest } from '../utils/request'

export default {
  name: 'Trend',

  components: {
    Search,
    TrendCard
  },

  data () {
    return {
      testIdList: [
        '5e8331c0982a43f4fd446ca8',
        '5e8331df982a43f4fd446fba',
        '5e8331d2982a43f4fd446f25',
        '5e83326f982a43f4fd44735b',
        '5e83327f982a43f4fd447392'
      ],
      trendsList: []
    }
  },

  methods: {
    addTrend (id) {
      getRequest('/api/report/paper/trend/year?id=' + this.testIdList[id - 1]).then(
        res => {
          console.log(res)
        }
      )
    }
  }
}
</script>

<style scoped>
.trend {
  padding: 10px 4%;
}
</style>
