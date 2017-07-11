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
      showChart(dataTitle,data) {
        echarts.dispose(document.querySelector("#row1chart1"));
        const chart = echarts.init(document.querySelector("#row1chart1"));
        chart.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "horizontal",
            left: "left",
            textStyle: {
              color: "#52547D"
            },
            data:dataTitle
            // data: [{
            //   name: "常办项",
            //   icon: "circle",
            // }, {
            //   name: "暂停/冻结",
            //   icon: "circle"
            // }, {
            //   name: "取消项",
            //   icon: "circle"
            // }, {
            //   name: "删除项",
            //   icon: "circle"
            // }]
          },
          series: [{
            type: "pie",
            roseType: "radius",
            radius: "60%",
            center: ["50%", "60%"],
            color: ["#618FFD", "#FFD652", "#00FFD9", "#FF5C91"],
            // data: [{
            //     value: 535,
            //     name: "常办项"
            //   },
            //   {
            //     value: 310,
            //     name: "暂停/冻结"
            //   },
            //   {
            //     value: 234,
            //     name: "取消项"
            //   },
            //   {
            //     value: 135,
            //     name: "删除项"
            //   },
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
          url: master + "/analysis/app_projects/status_proportion"
        }).then(
          function(result) {
            if (result.data.head.status == 200) {
              // console.log(result.data)
              let data = result.data.body;
              let dataTitle = [];
              for (let i in data) {
                dataTitle.push({name:data[i].name,icon:"circle"})
              }
              // console.log(dataTitle,data)
              vm.showChart(dataTitle,data);
            } else {
              Notification({
                type: "error",
                title: '按状态占比分析',
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
