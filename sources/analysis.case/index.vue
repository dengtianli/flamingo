<template>
  <div class="analysis-case">
    <div class="row row1">
      <div class="chart1">
        <row1-chart1></row1-chart1>
      </div>
      <div class="chart2">
        <row1-chart2></row1-chart2>
      </div>
      <div class="chart3">
        <row1-chart3></row1-chart3>
      </div>
    </div>
    <div class="row row2">
      <div class="chart1">
        <row2-chart1></row2-chart1>
      </div>
      <div class="chart2">
        <row2-chart2></row2-chart2>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "../common/http.js";
// row1
import Row1Chart1 from "./row1/chart1.vue";
import Row1Chart2 from "./row1/chart2.vue";
import Row1Chart3 from "./row1/chart3.vue";
// row2
import Row2Chart1 from "./row2/chart1.vue";
import Row2Chart2 from "./row2/chart2.vue";

export default {
  components: {
    // row1
    Row1Chart1,
    Row1Chart2,
    Row1Chart3,
    // row2
    Row2Chart1,
    Row2Chart2
  },
  // mounted() {
  // }
}
</script>

<style lang="less" scoped>
.analysis-case {
  display: flex;
  flex-direction: column;
  .row1 {
    width: 100%;
    height: 27.06rem;
    display: flex;
    flex-direction: row;
    .chart1 {
      width: 33.3%;
      >div {
        height: 100%;
      }
    }
    .chart2 {
      width: 33.3%;
      margin-left: 0.63rem;
      >div {
        height: 100%;
      }
    }
    .chart3 {
      width: 33.3%;
      margin-left: 0.63rem;
      >div {
        height: 100%;
      }
    }
  }
  .row2 {
    width: 100%;
    height: 27.06rem;
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
