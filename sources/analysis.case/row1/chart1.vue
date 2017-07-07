<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header">
        <span>按状态占比分析</span>
      </div>
      <div id="row1chart1"></div>
    </el-card>
  </div>
</template>

<script>
import Http from "../../common/http.js";
import {chart} from "../../common/helper.js";
export default {
  mounted() {
    chart("#row1chart1", {
      legend: {
        orient: "horizontal",
        left: "left",
        textStyle: {
          color: "#52547D"
        },
        data: [{
          name: "常办项",
          icon: "circle",
        }, {
          name: "暂停/冻结",
          icon: "circle"
        }, {
          name: "取消项",
          icon: "circle"
        }, {
          name: "删除项",
          icon: "circle"
        }]
      },
      series: [
        {
          type: "pie",
          roseType : "radius",
          radius: "60%",
          center: ["50%", "60%"],
          color: ["#618FFD", "#FFD652", "#00FFD9", "#FF5C91"],
          data: [
            { value: 535, name: "常办项" },
            { value: 310, name: "暂停/冻结" },
            { value: 234, name: "取消项" },
            { value: 135, name: "删除项" },
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
#row1chart1 {
  .fill;
}
</style>
