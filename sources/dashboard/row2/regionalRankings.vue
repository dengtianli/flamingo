<template>
  <div class="region-chart">
    <el-card class="box-card">
      <div slot="header" class="clearfix region-title">
        <span class="pull-left">地区排名</span>
        <a class="pull-right region-detail" @click="goDetail()">详情&gt;</a>
      </div>
      <div class="clearfix chart">
        <div class="time-position">
          <div class="block">
            <span class="demonstration">统计时间</span>
            <el-date-picker v-model="value" type="month" format="yyyy 年 MM 月" placeholder="选择月份">
            </el-date-picker>
          </div>
        </div>
        <div class="region-chart-content"></div>
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
    data() {
      return {
        value: new Date('2017-01')
      }
    },
    mounted() {
      const vm = this;
      const currentMonth = Moment(vm._data.value).format('MM');
      const beginTime = Moment().year() + "-" + currentMonth + "-01 00:00:00";
      console.log(beginTime);
      vm.regionalRank(beginTime)
    },
    watch: {
      value: function(val, oldVal) {
        console.log(Moment(val).format('YYYY-MM-DD HH:mm:ss'))
        this.regionalRank(Moment(val).format('YYYY-MM-DD HH:mm:ss'))
      }
    },
    methods: {
      goDetail() {
        this.$router.push("/layout/dashboard-detail/地区排名详情");
      },
      showChart(name, value) {
        console.log(name)
        echarts.dispose(document.querySelector(".region-chart-content"));
        const chart = echarts.init(document.querySelector(".region-chart-content"));
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
            // data: ["成都", "绵阳", "雅安", "达州", "攀枝花", "广元"],
            data: name,
            type: 'category',
            name: '城市',
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: '#52547D',
                fontSize: 12
              }
            }
          },
          yAxis: {
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
          series: [{
            name: "受理件数",
            type: "bar",
            barWidth: '50%',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 1,
                    color: '#292742'
                  }, {
                    offset: 0,
                    color: '#FF5C91'
                  }],
                }
              }
            },
            // data: [1180, 580, 820, 600, 420, 740]
            data: value
          }]
        });
      },
      regionalRank(beginTime) {
        const vm = this;
        Http.fetch({
          method: "get",
          // url: master + "/ranking/region_accepts",
          url:  "http://localhost:5001/ranking/region_accepts",
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
                name.push(data[i].OrganNameAccept);
                value.push(data[i].acceptNum);
              }
              vm.showChart(name, value);
            } else {
              Notification({
                type: "error",
                title: '地区排名情况',
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
  .region-chart {
    width: 100%;
    height: 100%;
    .region-title {
      color: @color-font-light;
      font-size: @size-title-small;
      background: @color-backgound-light;
      border-radius: 0.25rem;
    }
    .region-detail {
      text-decoration: underline;
      color: @color-font-deep;
      font-size: @size-text-large;
    }
    .region-detail:hover {
      text-decoration: underline;
      cursor: pointer;
      color: @color-primary;
    }
    .chart {
      color: @color-font-deep;
      font-size: @size-text-large;
      .time-position {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 1.25rem;
        margin-bottom: -1rem;
      }
      .region-chart-content {
        height: 20rem;
        font-size: @size-text-small;
      }
    }
  }
</style>
