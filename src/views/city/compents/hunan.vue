<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartHuNan"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import hunanjson from "@/assets/hunan.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("湖南", hunanjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartHuNan"));
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
    if (index >= 14) {
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
      if (index >= 14) {
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

var mapHuNanData = [
  {
    name: "长沙市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [112.982279, 28.19409],
  },
  {
    name: "株洲市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [113.151737, 27.835806],
  },
  {
    name: "湘潭市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [112.944052, 27.82973],
  },
  {
    name: "衡阳市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [112.607693, 26.900358],
  },
  {
    name: "邵阳市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [111.46923, 27.237842],
  },
  {
    name: "岳阳市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [113.132855, 29.37029],
  },
  {
    name: "常德市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [111.691347, 29.040225],
  },
  {
    name: "张家界市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [110.479921, 29.127401],
  },
  {
    name: "益阳市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [112.355042, 28.570066],
  },
  {
    name: "郴州市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [113.032067, 25.793589],
  },
  {
    name: "永州市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [111.608019, 26.434516],
  },
  {
    name: "怀化市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [109.97824, 27.550082],
  },
  {
    name: "娄底市",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [112.008497, 27.728136],
  },
  {
    name: "湘西土家族苗族自治州",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [109.739735, 28.314296],
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
      map: "湖南",
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
      name: "湖南数据",
      type: "map",
      map: "湖南",
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
      data: mapHuNanData,
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

#chartHuNan {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 