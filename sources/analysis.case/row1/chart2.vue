<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header">
        <span>按属性占比分析</span>
      </div>
      <div id="row1chart2"></div>
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
        orient: "horizontal",
        left: "center",
        textStyle: {
          color: "#52547D"
        },
        data: [{
          name: "大项",
          icon: "circle",
        }, {
          name: "小项",
          icon: "circle"
        }]
      },
      series: [
        {
          type: "pie",
          roseType : "radius",
          radius: "60%",
          center: ["50%", "60%"],
          color: ["#FFD652", "#FF5C91"],
          data: [
            { value: 435, name: "大项" },
            { value: 310, name: "小项" }
          ],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
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
