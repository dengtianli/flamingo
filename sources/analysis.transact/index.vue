<template>
  <div class="analysis-transact">
    <!--<div class="row">
                <span>统计时间</span>
                <el-select placeholder="2016年2月">
                  <el-option></el-option>
                </el-select>
              </div>-->
    <div class="row row1">
      <div class="chart1">
        <row1-chart1></row1-chart1>
      </div>
      <div class="chart2">
        <row1-chart2></row1-chart2>
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
    <div class="row row3">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>效能分析</span>
        </div>
        <div class="instruments">
          <div class="instrument">
            <row3-chart title="承诺提速" rate="47" flag="row3chart1"></row3-chart>
          </div>
          <div class="instrument">
            <row3-chart title="办理提速" rate="71.68" flag="row3chart2"></row3-chart>
          </div>
          <div class="instrument">
            <row3-chart title="当日受理办结率" rate="30.99" flag="row3chart3"></row3-chart>
          </div>
          <div class="instrument">
            <row3-chart title="提前办结率" rate="98.45" flag="row3chart4"></row3-chart>
          </div>
          <div class="instrument">
            <row3-chart title="按时办结率" rate="100" flag="row3chart5"></row3-chart>
          </div>
          <div class="instrument">
            <row3-chart title="现场办结率" rate="100" flag="row3chart6"></row3-chart>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Http from "../common/http.js";
// row1
import Row1Chart1 from "./row1/chart1.vue";
import Row1Chart2 from "./row1/chart2.vue";
// row2
import Row2Chart1 from "./row2/chart1.vue";
import Row2Chart2 from "./row2/chart2.vue";
// row3
import Row3Chart from "./row3/chart.vue";
export default {
  components: {
    // row1
    Row1Chart1,
    Row1Chart2,
    // row2
    Row2Chart1,
    Row2Chart2,
    // row3
    Row3Chart,
  },
  // mounted() {
  // }
}
</script>

<style lang="less" scoped>
@import "../common/base.less";
.analysis-transact {
  display: flex;
  flex-direction: column;
  .row1 {
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
  .row3 {
    width: 100%;
    height: 19.5rem;
    .instruments {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .instrument {
        min-width: 12rem;
        height: 13.14rem;
        // background: red;
      }
    }
  }
}
</style>
