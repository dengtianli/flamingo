<template>
  <div class="dashboard">
    <div class="row row1">
      <!-- card -->
      <div class="left">
        <sichuan-map></sichuan-map>
      </div>
      <div class="right">
        <div class="top">
          <total></total>
        </div>
        <div class="bottom">
          <latest-date></latest-date>
        </div>
      </div>
      <!-- card -->
    </div>
    <div class="row row2">
      <div class="left">
        <!-- card -->
        <department-of-ranking></department-of-ranking>
        <!-- card -->
      </div>
      <div class="right">
        <!-- card -->
        <regional-rankings></regional-rankings>
        <!-- card -->
      </div>
    </div>
    <div class="row row3">
      <hot-items></hot-items>
    </div>
  </div>
</template>

<script>
import Http from "../common/http.js";
import departmentOfRanking from "./row2/departmentOfRanking.vue";
import regionalRankings from "./row2/regionalRankings.vue";
import hotItems from "./row3/hotItems.vue";
import sichuanMap from "./row1/sichuanMap.vue";
import total from "./row1/total.vue";
import latestDate from "./row1/latestDate.vue";
const master = Http.url.master;
export default {
  components: {
    sichuanMap,
    total,
    latestDate,
    departmentOfRanking,
    regionalRankings,
    hotItems
  },
  mounted() {
    Http.fetch({
      method: "GET",
      url: master + "/sys/logs"
    })
      .then(function (result) {
        console.log(result.data.head);
      })
  }
};
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  .row1 {
    width: 100%;
    height: 37.38rem;
    display: flex;
    flex-direction: row;
    .left {
      width: 60%;
      margin-right: 0.63rem;
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 40%;
      .top {
        height: 18.44rem;
        margin-bottom: 0.63rem;
      }
      .bottom {
        height: 18.31rem;
      }
    }
  }
  .row2 {
    width: 100%;
    height: 27.06rem;
    display: flex;
    flex-direction: row;
    .left {
      width: 50%;
      margin-right: 0.63rem;
    }
    .right {
      width: 50%;
    }
  }
  .row3 {
    width: 100%;
    height: 49.06rem;
  }
}
</style>
