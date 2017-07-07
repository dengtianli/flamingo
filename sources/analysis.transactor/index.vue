<template>
  <div class="analysis-transactor">
    <div class="row row1">
      <div class="chart1">
        <row1-chart1></row1-chart1>
      </div>
      <div class="chart2">
        <row1-chart2></row1-chart2>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "../common/http.js";
// row1
import Row1Chart1 from "./row1/chart1.vue";
import Row1Chart2 from "./row1/chart2.vue";
export default {
  components: {
    // row1
    Row1Chart1,
    Row1Chart2
  },
  // mounted() {
  // }
}
</script>

<style lang="less" scoped>
.analysis-transactor {
  display: flex;
  flex-direction: column;
  .row1 {
    width: 100%;
    height: 50.81rem;
    display: flex;
    flex-direction: row;
    .chart1 {
      width: 50%;
      margin-right: 0.63rem;
      >div {
        height: 100%;
      }
    }
    .chart2 {
      width: 50%;
      >div {
        height: 100%;
      }
    }
  }
}
</style>
