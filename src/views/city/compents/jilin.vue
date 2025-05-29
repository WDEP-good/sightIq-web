<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartJiLin"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import jilinjson from "@/assets/jilin.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

// 在组件初始化时就注册地图数据
echarts.registerMap("吉林", jilinjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartJiLin"));
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
    if (index >= 9) {
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
      if (index >= 9) {
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

var mapJiLinData = [
  {
    name: "全省",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [125.3245, 43.886841],
  },
  {
    name: "长春市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [125.3245, 43.886841],
  },
  {
    name: "吉林市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [126.55302, 43.843577],
  },
  {
    name: "四平市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [124.370785, 43.170344],
  },
  {
    name: "辽源市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [125.145349, 42.902692],
  },
  {
    name: "通化市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [125.936501, 41.721177],
  },
  {
    name: "白山市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [126.427839, 41.942505],
  },
  {
    name: "松原市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [124.823608, 45.118243],
  },
  {
    name: "白城市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [122.841114, 45.619026],
  },
  {
    name: "延边朝鲜族自治州",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [129.513228, 42.904823],
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
      map: "吉林",
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
      name: "吉林省数据",
      type: "map",
      map: "吉林",
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
      data: mapJiLinData,
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

#chartJiLin {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
