<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header">
        <span>按行政权力主体占比统计</span>
      </div>
      <div id="row2chart2"></div>
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
        echarts.dispose(document.querySelector("#row2chart2"));
        const chart = echarts.init(document.querySelector("#row2chart2"));
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
        //   name: "交通运输厅",
        //   icon: "circle",
        // }, {
        //   name: "林业厅",
        //   icon: "circle"
        // }, {
        //   name: "文化厅",
        //   icon: "circle"
        // }, {
        //   name: "人力资源社会保障厅",
        //   icon: "circle"
        // }, {
        //   name: "省新闻出版广电局",
        //   icon: "circle"
        // }, {
        //   name: "国土资源厅",
        //   icon: "circle"
        // }, {
        //   name: "省卫生计生委",
        //   icon: "circle"
        // }, {
        //   name: "其他",
        //   icon: "circle"
        // }]
        data:dataTitle
      },
      series: [
        {
          type: "pie",
          radius: "60%",
          center: ["50%", "60%"],
          color: ["#77E254", "#FF5C91", "#FFD652", "#00FFD9", "#9012FE", "#FF5452", "#FF7B21", "#618FFD"],
          // data: [
          //   { value: 435, name: "交通运输厅" },
          //   { value: 310, name: "林业厅" },
          //   { value: 234, name: "文化厅" },
          //   { value: 135, name: "人力资源社会保障厅" },
          //   { value: 135, name: "省新闻出版广电局" },
          //   { value: 135, name: "国土资源厅" },
          //   { value: 135, name: "省卫生计生委" },
          //   { value: 135, name: "其他" }
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
        }
      ]
        })
      },
      getChartData() {
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/analysis/app_projects/power_proportion"
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
                title: '按行政权力主体占比统计',
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
#row2chart2 {
  .fill;
}
</style>
