<template>
  <div class="department-chart">
    <el-card class="box-card">
      <div slot="header" class="clearfix department-title">
        <span class="pull-left">部门排名</span>
        <a class="pull-right department-detail" @click="goDetail()">详情&gt;</a>
      </div>
      <div class="clearfix chart">
        <div class="time-position">
          <div class="block">
            <span class="demonstration">统计时间</span>
            <el-date-picker
              v-model="value"
              type="month"
              format="yyyy 年 MM 月"
              placeholder="选择月份">
            </el-date-picker>
          </div>
        </div>
        <div class="department-chart-content"></div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import Http from "../../common/http.js";
  import {
    chart
  } from "../../common/helper.js";
  export default {
    data() {
      return {
        value: '',
      }
    },
    mounted() {
      chart(".department-chart-content", {
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
        textStyle: {
          color: '#52547D',
          fontSize: 12
        },
        xAxis: {
          data: ["交通运输厅", "林业厅", "文化厅", "国土资源厅", "省卫生卫计厅", "省工商局"],
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval:0,
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#52547D',
            }
          },
        },
        series: [{
          name: "部门排名",
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
                    offset: 0, color: '#04E8C9' // 0% 处的颜色
                }, {
                    offset: 1, color: '#292742' // 100% 处的颜色
                }],
              }
            }
          },
          data: [700, 980, 850, 600, 300, 410]
        }]
      });
    },
    methods: {
      goDetail () {
        this.$router.push("/layout/dashboard-detail");
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../common/base.less";
  .department-chart {
    width: 100%;
    height: 100%;
    .department-title {
      color: @color-font-light;
      font-size: @size-title-small;
      background: @color-backgound-light;
      border-radius: 0.25rem;
    }
    .department-detail {
      text-decoration: underline;
      color: @color-font-deep;
      font-size: @size-text-large;
    }
    .department-detail:hover {
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
        justify-content:flex-end ;
        margin-right: 1.25rem;
        margin-bottom: -1rem;
      }
      .department-chart-content {
        height: 20rem;
        font-size: @size-text-small;
      }
    }
  }
</style>
