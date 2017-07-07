<template>
  <div class="total-chart">
    <el-card class="box-card">
      <div class="body">
        <div class="total-title">
          <span class="center">行政审批办件情况</span>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="累计汇总" name="first">
            <div class="total-container">
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
  import Encrypt from "../../common/encrypt.js";
  import {
    chart
  } from "../../common/helper.js";
  import {
    Notification
  } from 'element-ui';
  const master = Http.url.master;
  export default {
    data() {
      return {
        activeName: 'first',
        total: {
          acceptNum: 0,
          agreedNum: 0,
          peopleFlowNum: 0,
        }
      }
    },
    beforeMount() {
      const vm = this;
      Http.fetch({
          method: "get",
          url: master + "/approval/projects",
          // params: {
          //   beginTime: '2017-04-12 12:12:00',
          //   endTime: '2017-04-19 12:12:00'
          // }
        }).then(function(result) {
          console.log(result.data)
          if (result.data.head.status == 200) {
             vm._data.total=result.data.body[0];
          } else {
            Notification({
              type: 'warning',
              title: '行政审批办件情况的累计汇总',
              message: result.data.head.message
              // offset:100
            });
          }
        })
    },
    methods: {
     
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/base.less";
  .total-chart {
    width: 100%;
    height: 100%;
    .total-title {
      color: @color-font-light;
      font-size: @size-title-small;
      display: flex;
      flex-direction: row;
      justify-content: center;
      span {
        display: inline-block;
        padding-bottom: 1rem;
        line-height: 1.38rem;
      }
    }
    .total-container {
      display: flex;
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
