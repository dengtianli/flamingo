<template>
  <div class="hot-chart">
    <!--<el-card class="box-card">-->
    <div class="body">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="热点办理事项" name="management-chart-content">
          <div class=" chart">
            <div class="time-position">
              <div class="block">
                <span class="demonstration">统计时间</span>
                <el-date-picker v-model="value" type="month" format="yyyy 年 MM 月" placeholder="选择月份">
                </el-date-picker>
              </div>
            </div>
            <div class="management-chart-content"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="热点关注事项" name="attention-chart-content">
          <div class=" chart">
            <div class="time-position">
              <div class="block">
                <span class="demonstration">统计时间</span>
                <el-date-picker v-model="value" type="month" format="yyyy 年 MM 月" placeholder="选择月份">
                </el-date-picker>
              </div>
            </div>
            <div class="attention-chart-content"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--</el-card>-->
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
    data() {
      return {
        activeName: 'management-chart-content',
        value: new Date('2016-01')
      }
    },
    watch: {
      value: function(val, oldVal) {
        // console.log(Moment(val).format('YYYY-MM-DD HH:mm:ss'))
        this.hortProjectsRank(Moment(val).format('YYYY-MM-DD HH:mm:ss'))
      }
    },
    mounted() {
      const vm = this;
      const currentMonth = Moment(vm._data.value).format('MM');
      const beginTime = Moment().year() + "-" + currentMonth + "-01 00:00:00";
      // console.log(beginTime,vm._data.activeName);
      vm.hortProjectsRank(beginTime,vm._data.activeName)
    },
    methods: {
      handleClick(activeName) {
        const vm = this;
        const currentMonth = Moment(vm.value).format('MM');
        const beginTime = Moment().year() + "-" + currentMonth + "-01 00:00:00";
        // console.log(beginTime,activeName);
        vm.hortProjectsRank(beginTime,activeName)
      },
      showChart(name, value,activeName) {
        // console.log(activeName)
        echarts.dispose(document.querySelector("."+activeName));
        const chart = echarts.init(document.querySelector("."+activeName));
        chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            position: 'top',
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: '#52547D',
                fontSize: 12
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#52547D',
                fontSize: 12
              }
            },
          },
          yAxis: {
            type: 'category',
            axisLabel: {
              textStyle: {
                color: '#52547D',
                fontSize: 12
              }
            },
            // data: ['移动是压力容器 气瓶充装许可', '固定资产投资项目（新建、扩建）节能评估和审查', '特种设备生产许可', '工业产品生产许可证核发（总局发证）', '放射性同为素转让审批', '分公司变更登记', '营业性涉外和涉港澳台演出审批', '公路、水运建设安全生产管理人员资格认定']
            data: name
          },
          series: [{
            name: '事项件数',
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 1,
                    color: '#FFD652'
                  }, {
                    offset: 0,
                    color: '#292742'
                  }]
                }
              }
            },
            // data: [240, 140, 80, 140, 180, 220, 125, 205]
            data: value
          }]
        });
      },
      hortProjectsRank(beginTime,activeName) {
        const vm = this;
        Http.fetch({
          method: "get",
          url: master + "/ranking/hort_projects",
          params: {
            top: 6,
            beginTime: beginTime,
            endTime: ''
          }
        }).then(
          function(result) {
            if (result.data.head.status == 200) {
              //  console.log(result.data)
              let data = result.data.body;
              let name = [];
              let value = [];
              for (let i in data) {
                name.push(data[i].projectName);
                value.push(data[i].count);
              }
              vm.showChart(name, value,activeName);
            } else {
              Notification({
                type: "error",
                title: '热点办理事项排名情况',
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
  .hot-chart {
    width: 100%;
    height: 100%;
    .body {
      box-sizing: border-box;
      border: none !important;
      color: @color-font-light;
      background-color: transparent !important;
      display: flex;
      flex-direction: column;
    }
    .chart {
      color: @color-font-deep;
      font-size: @size-text-large;
      padding: 1.25rem;
      .time-position {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      .management-chart-content {
        height: 42rem;
        font-size: @size-text-small;
      }
      .attention-chart-content {
         height: 42rem;
        font-size: @size-text-small;
      }
    }
  }
</style>