<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartShanXi"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import shanxijson from "@/assets/shanxi.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("山西", shanxijson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartShanXi"));
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
    if (index >= 11) {
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
      if (index >= 11) {
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

var mapShanXiData = [
  {
    name: "太原市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [112.549248, 37.857014],
  },
  {
    name: "大同市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [113.295259, 40.09031],
  },
  {
    name: "阳泉市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [113.583285, 37.861188],
  },
  {
    name: "长治市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [113.113556, 36.191112],
  },
  {
    name: "晋城市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [112.851274, 35.497553],
  },
  {
    name: "朔州市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [112.433387, 39.331261],
  },
  {
    name: "晋中市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [112.736465, 37.696495],
  },
  {
    name: "运城市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [111.003957, 35.022778],
  },
  {
    name: "忻州市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [112.733538, 38.41769],
  },
  {
    name: "临汾市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [111.517973, 36.08415],
  },
  {
    name: "吕梁市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [111.134335, 37.524366],
  }
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
      map: "山西",
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
      name: "山西数据",
      type: "map",
      map: "山西",
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
      data: mapShanXiData,
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

#chartShanXi {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 