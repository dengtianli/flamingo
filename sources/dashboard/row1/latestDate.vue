<template>
  <div class="total-chart">
    <el-card class="box-card">
      <div class="body">
        <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
          <el-tab-pane label="昨天" name="yesterday">
            <div class="date-container">
              <div class="acceptance">
                <div>受理数(件)</div>
                <div class="num">{{total.acceptNum}}</div>
              </div>
              <div class="transaction">
                <div>办结数(件)</div>
                <div class="num">{{total.agreedNum}}</div>
              </div>
              <div class="visitors">
                <div>人流量(人次)</div>
                <div class="num">{{total.peopleFlowNum}}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="最近一周" name="lastWeek">
            <div class="date-container">
              <div class="acceptance">
                <div>受理数(件)</div>
                <div class="num">{{total.acceptNum}}</div>
              </div>
              <div class="transaction">
                <div>办结数(件)</div>
                <div class="num">{{total.agreedNum}}</div>
              </div>
              <div class="visitors">
                <div>人流量(人次)</div>
                <div class="num">{{total.peopleFlowNum}}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="最近一月" name="lastMonth">
            <div class="date-container">
              <div class="acceptance">
                <div>受理数(件)</div>
                <div class="num">{{total.acceptNum}}</div>
              </div>
              <div class="transaction">
                <div>办结数(件)</div>
                <div class="num">{{total.agreedNum}}</div>
              </div>
              <div class="visitors">
                <div>人流量(人次)</div>
                <div class="num">{{total.peopleFlowNum}}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
  import Http from "../../common/http.js";
  import {
    chart
  } from "../../common/helper.js";
  import {
    Notification
  } from 'element-ui';
  import Moment from "moment";
  const master = Http.url.master;
  export default {
    data() {
      return {
        activeName: 'yesterday',
        total: {
          acceptNum: 0,
          agreedNum: 0,
          peopleFlowNum: 0,
        }
      }
    },
    mounted() {
      const vm = this;
      //默认显示昨天的数据
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 );
      console.log(Moment(start).format('YYYY-MM-DD HH:mm:ss'), Moment(end).format('YYYY-MM-DD HH:mm:ss'));
      Http.fetch({
        method: "get",
        url: master + "/approval/projects",
        params: {
          beginTime: Moment(start).format('YYYY-MM-DD HH:mm:ss'),
          endTime: Moment(end).format('YYYY-MM-DD HH:mm:ss')
        }
      }).then(function(result) {
        console.log(result.data)
        if (result.data.head.status == 200) {
          vm._data.total = result.data.body[0];
        } else {
          Notification({
            type:"error",
            title: '昨天行政审批办件情况汇总',
            message: result.data.head.message
          });
        }
      })
    },
    methods: {
      handleClick(activeName) {
        console.log(activeName)
        const vm = this;
        var params = {};
        var datetime ='昨天';
        if (activeName == 'yesterday') {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24);
          // console.log(Moment(start).format('YYYY-MM-DD HH:mm:ss'), Moment(end).format('YYYY-MM-DD HH:mm:ss'));
          params = {
            beginTime: Moment(start).format('YYYY-MM-DD HH:mm:ss'),
            endTime: Moment(end).format('YYYY-MM-DD HH:mm:ss')
          }
        } else if (activeName == 'lastWeek') {
          datetime ='最近一周';
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          // console.log(Moment(start).format('YYYY-MM-DD HH:mm:ss'), Moment(end).format('YYYY-MM-DD HH:mm:ss'));
          params = {
            beginTime: Moment(start).format('YYYY-MM-DD HH:mm:ss'),
            endTime: Moment(end).format('YYYY-MM-DD HH:mm:ss')
          }
        } else if (activeName == 'lastMonth') {
          datetime ='最近一月';
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          // console.log(Moment(start).format('YYYY-MM-DD HH:mm:ss'), Moment(end).format('YYYY-MM-DD HH:mm:ss'));
          params = {
            beginTime: Moment(start).format('YYYY-MM-DD HH:mm:ss'),
            endTime: Moment(end).format('YYYY-MM-DD HH:mm:ss')
          }
        }
        Http.fetch({
          method: "get",
          url: master + "/approval/projects",
          params:params
        }).then(function(result) {
          // console.log(result.data)
          if (result.data.head.status == 200) {
            vm._data.total = result.data.body[0];
          } else {
            Notification({
              type:"error",
              title: datetime+'行政审批办件情况汇总',
              message: result.data.head.message
            });
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/base.less";
  .total-chart {
    width: 100%;
    height: 100%;
    .date-container {
      display: flex; //  margin: 0 1.81rem;
      >div {
        color: @color-font-deep;
        font-size: @size-text-large;
        width: 8rem;
        margin: 2.5rem 1.5rem;
        flex-flow: row nowrap;
        align-content: flex-start;
        justify-content: space-around;
        text-align: center;
        .num {
          margin: 1.25rem 0;
          color: @color-font-light;
          font-size: @size-title-large;
          line-height: 1.25rem;
          letter-spacing: 0.5px;
          text-align: center;
        }
      }
      .acceptance {
        border-bottom: 0.13rem solid #FF5C91;
      }
      .transaction {
        border-bottom: 0.13rem solid #FFD652;
      }
      .visitors {
        border-bottom: 0.13rem solid #00FFD9;
      }
    }
  }
</style>
