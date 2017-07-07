<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>行政许可事项受理情况</span>
      </div>
      <div id="row1chart2">

      </div>
    </el-card>
  </div>
</template>

<script>
import Http from "../../common/http.js";
import {chart} from "../../common/helper.js";
export default {
  mounted() {
    chart("#row1chart2", {
      legend: {
        right: 10,
        textStyle: {
          color: "#52547D",
          fontSize: 12
        },
        data: ["即办件", "承诺件", "总"]
      },
      xAxis: [{
          type: "category",
          data: ["第一季度", "第二季度", "第三季度", "第四季度"],
          axisPointer: {
            type: "shadow"
          }
      }],
      yAxis: [{
        type: "value",
        min: 0,
        max: 2500,
        interval: 500,
        splitLine: {
          show: true,
          lineStyle: {
            color: "#52547D",
          }
        },
      }],
      textStyle: {
        color: "#52547D",
        fontSize: 12
      },
      series: [{
          name: "即办件",
          type: "bar",
          stack: "广告",
          barWidth: 40,
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: "#FF5C91" // 0% 处的颜色
                }, {
                  offset: 1, color: "#322945" // 100% 处的颜色
                }],
              }
            }
          },
          data: [200, 300, 1000, 300]
        }, {
          name: "承诺件",
          type: "bar",
          stack: "广告",
          barWidth: 40,
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: "#FFD652 " // 0% 处的颜色
                }, {
                  offset: 1, color: "#514845" // 100% 处的颜色
                }],
              }
            }
          },
          data: [100, 200, 300, 300]
        }, {
          name: "总",
          type: "line",
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: "#4880FD" // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#473CB4" // 100% 处的颜色
                }],
              }
            }
          },
          data: [433, 1900, 700, 600]
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
