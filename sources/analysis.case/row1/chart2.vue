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
  import echarts from "echarts";
  import {
    Notification
  } from 'element-ui';
  import Moment from "moment";
  const master = Http.url.master;
  export default {
    mounted() {
      const vm = this;
      vm.getChartData();
    },
    methods: {
      showChart(dataTitle, data) {
        echarts.dispose(document.querySelector("#row1chart2"));
        const chart = echarts.init(document.querySelector("#row1chart2"));
        chart.setOption({
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
            // data: [{
            //   name: "大项",
            //   icon: "circle",
            // }, {
            //   name: "小项",
            //   icon: "circle"
            // }]
            data:dataTitle
          },
          series: [{
            type: "pie",
            roseType: "radius",
            radius: "60%",
            center: ["50%", "60%"],
            color: ["#FFD652", "#FF5C91"],
            // data: [{
            //     value: 435,
            //     name: "大项"
            //   },
            //   {
            //     value: 310,
            //     name: "小项"
            //   }
            // ],
            data:data,
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
          }]
        })
      },
      getChartData() {
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/analysis/app_projects/property_proportion"
        }).then(
          function(result) {
            if (result.data.head.status == 200) {
              // console.log(result.data)
              let data = result.data.body;
              let dataTitle = [];
              for (let i in data) {
                dataTitle.push({
                  name: data[i].name,
                  icon: "circle"
                })
              }
              // console.log(dataTitle,data)
              vm.showChart(dataTitle, data);
            } else {
              Notification({
                type: "error",
                title: '按属性占比分析',
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
  #row1chart2 {
    .fill;
  }
</style>
