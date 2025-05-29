<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartQingHai"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import qinghaijson from "@/assets/qinghai.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

// 在组件初始化时就注册地图数据
echarts.registerMap("青海", qinghaijson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartQingHai"));
  myChart.showLoading();

  setTimeout(() => {
    if (myChart) {
      myChart.hideLoading();
      myChart.setOption(option, true);

      window.addEventListener("resize", handleResize);
    }
  }, 1000);

  // 鼠标交互事件
  myChart.on("mouseover", function (params) {
    console.log(params);
    clearInterval(showTip);
    myChart?.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    });
  });

  var showTip = setInterval(function () {
    myChart?.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    index++;
    if (index >= 8) {
      index = 0;
    }
  }, 2000);

  myChart.on("mouseout", function (_params) {
    showTip && clearInterval(showTip);
    showTip = setInterval(function () {
      myChart?.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index >= 8) {
        index = 0;
      }
    }, 2000);
  });
});

const handleResize = () => {
  if (myChart) {
    myChart.resize();
  }
};

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
  window.removeEventListener("resize", handleResize);
});

var mapQingHaiData = [
  {
    name: "全省",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [101.778916, 36.623178],
  },
  {
    name: "西宁市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [101.778916, 36.623178],
  },
  {
    name: "海东市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [102.10327, 36.502916],
  },
  {
    name: "海北藏族自治州",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [100.901059, 36.959435],
  },
  {
    name: "黄南藏族自治州",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [102.019988, 35.517744],
  },
  {
    name: "海南藏族自治州",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [100.619542, 36.280353],
  },
  {
    name: "果洛藏族自治州",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [100.242143, 34.473598],
  },
  {
    name: "玉树藏族自治州",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [97.008522, 33.004049],
  },
  {
    name: "海西蒙古族藏族自治州",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [97.370785, 37.374663],
  },
];

let option = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    position: function (
      point: any,
      _params: any,
      _dom: any,
      _rect: any,
      size: any
    ) {
      var x = 0;
      var y = 0;
      var pointX = point[0];
      var pointY = point[1];
      var boxWidth = size.contentSize[0];
      var boxHeight = size.contentSize[1];

      if (boxWidth > pointX) {
        x = pointX + 10;
      } else {
        x = pointX - boxWidth - 10;
      }

      if (boxHeight > pointY) {
        y = 5;
      } else {
        y = pointY - boxHeight;
      }
      return [x, y];
    },
    show: true,
    enterable: true,
    textStyle: {
      fontSize: 13,
      color: "#fff",
    },
    backgroundColor: "rgba(0,2,89,0.8)",
    formatter: function (params: any) {
      var tipHtml = `
        <div class="ui-map-img">
            <div class='ui-maptxt'>${params.name}</div>
            <div class='ui-mapNum'>标段数:${params.data.tradeBidsectionCount}</div>
            <div class='ui-mapNum'>项目数:${params.data.tradeProjectCount}</div>
        </div>
      `;
      return tipHtml;
    },
  },
  geo: [
    {
      map: "青海",
      aspectScale: 0.75,
      zoom: 1.1,
      layoutCenter: ["50%", "50%"],
      layoutSize: "95%",
      show: true,
      roam: false,
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          borderColor: "#c0f3fb",
          borderWidth: 1,
          shadowColor: "rgba(58,149,253,0.8)",
          shadowOffsetY: 5,
          shadowBlur: 15,
          areaColor: "transparent",
        },
      },
    },
  ],
  series: [
    {
      name: "青海数据",
      type: "map",
      map: "青海",
      aspectScale: 0.75,
      zoom: 1.1,
      showLegendSymbol: true,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: "120%",
          },
        },
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: {
            type: "linear",
            x: 1200,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgba(3,27,78,0.75)",
              },
              {
                offset: 1,
                color: "rgba(58,149,253,0.75)",
              },
            ],
            global: true,
          },
          borderColor: "#fff",
          borderWidth: 0.2,
        },
        emphasis: {
          show: false,
          color: "#fff",
          areaColor: "rgba(0,254,233,0.6)",
        },
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "95%",
      markPoint: {
        symbol: "none",
      },
      data: mapQingHaiData,
    },
  ],
};
</script>

<style scoped lang="less">
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-row {
  flex: 1;
  position: relative;
  min-height: 0;
  height: 100vh;
}

#chartQingHai {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 