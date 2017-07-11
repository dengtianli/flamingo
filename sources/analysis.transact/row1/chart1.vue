<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>行政许可事项申报情况</span>
      </div>
      <div id="row1chart1">
      </div>
    </el-card>
  </div>
</template>

<script>
  import Http from "../../common/http.js";
  import echarts from "echarts";
  import {
    Notification
  } from 'element-ui';
  import Moment from "moment";
  import $ from "jquery";
  const master = Http.url.master;
  export default {
    props: {
      year: {
        type: String,
        default: "2016",
        required: true,
      },
      organ: {
        type: Number,
        default: 78,
        required: true,
      }
    },
    mounted() {
      const vm = this;
      vm.declareItems(vm.year, vm.organ)
    },
    watch: {
      year: function(year, oldVal) {
        console.log(year)
        this.declareItems(year, this.organ)
      },
      organ: function(organ, oldVal) {
        console.log(organ)
        this.declareItems(this.year, organ)
      }
    },
    methods: {
      showChart(instantCount, promiseCount, totalCount) {
        echarts.dispose(document.querySelector("#row1chart1"));
        const chart = echarts.init(document.querySelector("#row1chart1"));
        chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
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
                    offset: 0,
                    color: "#FF5C91" // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: "#322945" // 100% 处的颜色
                  }],
                }
              }
            },
            // data: [200, 900, 1000, 300]
            data: instantCount
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
                    offset: 0,
                    color: "#FFD652 " // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: "#514845" // 100% 处的颜色
                  }],
                }
              }
            },
            // data: [100, 200, 700, 300]
            data: promiseCount
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
            // data: [433, 1200, 1700, 600]
            data: totalCount
          }]
        });
      },
      declareItems(year, organ) {
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/analysis/projects/projects_apply",
          params: {
            year: year,
            organ: organ
          }
        }).then(
          function(result) {
            if (result.data.head.status == 200) {
              //  console.log(result.data)
              let data = result.data.body;
              let instantCount = [];
              let promiseCount = [];
              let totalCount = [];
              for (let i in data) {
                instantCount.push(data[i].instantCount);
                promiseCount.push(data[i].promiseCount);
                totalCount.push(data[i].totalCount);
              }
              vm.showChart(instantCount, promiseCount, totalCount);
            } else {
              Notification({
                type: "error",
                title: '行政许可事项申报情况',
                message: result.data.head.message,
              });
            }
          });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../common/base.less";
  #row1chart1 {
    .fill;
  }
</style>
