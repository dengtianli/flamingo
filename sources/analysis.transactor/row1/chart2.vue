<template>
  <div>
    <el-card class="box-card">
      <div id="row1chart2"></div>
    </el-card>
  </div>
</template>

<script>
import Http from "../../common/http.js";
import { chart } from "../../common/helper.js";
export default {
  mounted() {
    chart("#row1chart2", {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        top: "1%",
        left: "2%",
        bottom: "1%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        position: "top",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: "#52547D",
            fontSize: 12
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#52547D",
            fontSize: 12
          }
        },
      },
      yAxis: {
        type: "category",
        axisLabel: {
          textStyle: {
            color: "#52547D",
            fontSize: 12
          }
        },
        data: ["成都市","绵阳市","乐山市","雅安市","自贡市","攀枝花市","达州市","巴中市","遂宁市","资阳市","眉山市","德阳市","泸州市","南充市","内江市","广安市","内江市","凉山州","宜宾市","甘孜州","阿坝州"]
      },
      series: [{
        name: "事项件数",
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 1, color: "#FFD652"
              }, {
                offset: 0, color: "#292742"
              }]
            }
          }
        },
        data: [240, 140, 80, 140, 180, 220, 125, 205,240, 140, 80, 140, 180, 220, 125, 205, 80, 140, 180, 220, 125]
      }]
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../common/base.less";
#row1chart2 {
  .fill;
}
</style>
