<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartHeNan"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import henanjson from "@/assets/henan.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("河南", henanjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartHeNan"));
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
    if (index >= 17) {
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
      if (index >= 17) {
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

var mapHeNanData = [
  {
    name: "郑州市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [113.665412, 34.757975],
  },
  {
    name: "开封市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [114.341447, 34.797049],
  },
  {
    name: "洛阳市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [112.434468, 34.663041],
  },
  {
    name: "平顶山市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [113.307718, 33.735241],
  },
  {
    name: "安阳市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [114.352482, 36.103442],
  },
  {
    name: "鹤壁市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [114.295444, 35.748236],
  },
  {
    name: "新乡市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [113.883991, 35.302616],
  },
  {
    name: "焦作市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [113.238266, 35.23904],
  },
  {
    name: "濮阳市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [115.041299, 35.768234],
  },
  {
    name: "许昌市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [113.826063, 34.022956],
  },
  {
    name: "漯河市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [114.026405, 33.575855],
  },
  {
    name: "三门峡市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [111.194099, 34.777338],
  },
  {
    name: "南阳市",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [112.540918, 32.999082],
  },
  {
    name: "商丘市",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [115.650497, 34.437054],
  },
  {
    name: "信阳市",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [114.075031, 32.123274],
  },
  {
    name: "周口市",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [114.649653, 33.620357],
  },
  {
    name: "驻马店市",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [114.024736, 32.980169],
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
      map: "河南",
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
      name: "河南数据",
      type: "map",
      map: "河南",
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
      data: mapHeNanData,
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

#chartHeNan {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 