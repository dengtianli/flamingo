<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>满意度分析</span>
      </div>
      <div id="row2chart2">
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
      vm.getSatisfaction(vm.year, vm.organ)
    },
    watch: {
      year: function(year, oldVal) {
        console.log(year)
        this.getSatisfaction(year, this.organ)
      },
      organ: function(organ, oldVal) {
        console.log(organ)
        this.getSatisfaction(this.year, organ)
      }
    },
    methods: {
      showChart(peopleCounting,judgmentCounting) {
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
            data: ["非常满意", "基本满意", "态度不好", "时间太长", "业务不熟", "有待改进"]
          },
          series: [{
              name: "访问来源",
              type: "pie",
              selectedMode: "single",
              radius: [0, "30%"],
              label: {
                normal: {
                  position: "inner"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              color: ["#618FFD", "#FFD652"],
              // data: [{value: 335,name: "未评价"},{value: 1350,name: "已评价"}]
              data: peopleCounting
            },
            {
              name: "访问来源",
              type: "pie",
              radius: ["40%", "55%"],
              color: ["#9012FE", "#FF7B21", "#FF5C91", "#FFD652", "#00FFD9", "#618FFD"],
              // data: [{
              //     value: 335,
              //     name: "非常满意"
              //   },
              //   {
              //     value: 310,
              //     name: "基本满意"
              //   },
              //   {
              //     value: 234,
              //     name: "态度不好"
              //   },
              //   {
              //     value: 135,
              //     name: "时间太长"
              //   },
              //   {
              //     value: 1048,
              //     name: "业务不熟"
              //   },
              //   {
              //     value: 251,
              //     name: "有待改进"
              //   },
              // ]
              data: judgmentCounting
            }
          ]
        });
      },
      getSatisfaction(year, organ) {
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/analysis/projects/projects_appraiseResult",
          params: {
            year: year,
            organ: organ
          }
        }).then(
          function(result) {
            if (result.data.head.status == 200) {
              //  console.log(result.data)
              let data = result.data.body;
              let peopleCounting = [];
              let judgmentCounting = [];
              for (let i in data) {
                if(data[i].name =="未评价" ||data[i].name =="已评价"){
                  peopleCounting.push(data[i]);
                }else{
                  judgmentCounting.push(data[i]);
                }
              }
              vm.showChart(peopleCounting,judgmentCounting);
            } else {
              Notification({
                type: "error",
                title: '满意度分析情况',
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
