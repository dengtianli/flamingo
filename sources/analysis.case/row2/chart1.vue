<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header">
        <span>按时限统计</span>
      </div>
      <div id="row2chart1"></div>
    </el-card>
  </div>
</template>

<script>
import Http from "../../common/http.js";
import {chart} from "../../common/helper.js";
export default {
  mounted() {
    chart("#row2chart1", {
      legend: {
        orient: "horizontal",
        left: "center",
        textStyle: {
          color: "#52547D"
        },
        data: [{
          name: "行政审批",
          icon: "circle",
        }, {
          name: "公共服务",
          icon: "circle"
        }, {
          name: "其它服务",
          icon: "circle"
        }]
      },
      series: [
        {
          type: "pie",
          radius: "60%",
          center: ["50%", "60%"],
          color: ["#FFD652","#FF5C91", "#618FFD"],
          data: [
            { value: 435, name: "行政审批" },
            { value: 310, name: "公共服务" },
            { value: 234, name: "其它服务" }
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
#row2chart1 {
  .fill;
}
</style>
