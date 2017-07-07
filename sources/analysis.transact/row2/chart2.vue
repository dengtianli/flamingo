<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>满意度分析</span>
      </div>
      <div id="row2chart2">

      </div>
    </el-card>
  </div>
</template>

<script>
import Http from "../../common/http.js";
import { chart } from "../../common/helper.js";
export default {
  mounted() {
    chart("#row2chart2", {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "horizontal",
        left: "center",
        textStyle: {
          color: "#52547D"
        },
        data: ["非常满意", "基本满意", "态度不好", "时间太长", "业务不熟", "有待改进"]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          selectedMode: "single",
          radius: [0, "30%"],

          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ["#618FFD", "#FFD652"],
          data: [
            { value: 335, name: "未评价" },
            { value: 679, name: "已评价" }
          ]
        },
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "55%"],
          color: ["#9012FE", "#FF7B21", "#FF5C91", "#FFD652", "#00FFD9", "#618FFD"],
          data: [
            { value: 335, name: "非常满意" },
            { value: 310, name: "基本满意" },
            { value: 234, name: "态度不好" },
            { value: 135, name: "时间太长" },
            { value: 1048, name: "业务不熟" },
            { value: 251, name: "有待改进" },
          ]
        }
      ]
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../common/base.less";
#row2chart2 {
  .fill;
}
</style>
