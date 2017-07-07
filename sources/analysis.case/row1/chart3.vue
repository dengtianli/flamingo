<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header">
        <span>按时限统计</span>
      </div>
      <div id="row1chart3"></div>
    </el-card>
  </div>
</template>

<script>
import Http from "../../common/http.js";
import {chart} from "../../common/helper.js";
export default {
  mounted() {
    chart("#row1chart3", {
      legend: {
        orient: "horizontal",
        left: "left",
        textStyle: {
          color: "#52547D"
        },
        data: [{
          name: "承诺件",
          icon: "circle",
        }, {
          name: "既办件",
          icon: "circle"
        }]
      },
      series: [
        {
          type: "pie",
          radius: "60%",
          center: ["50%", "60%"],
          color: ["#00FFD9", "#618FFD"],
          data: [
            { value: 435, name: "承诺件" },
            { value: 330, name: "既办件" }
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
#row1chart3 {
  .fill;
}
</style>
