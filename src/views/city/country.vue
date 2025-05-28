<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chart"></div>
    </el-row>
    <el-row class="footer-row">
      <Footer />
    </el-row>
  </el-col>
</template>
<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import Footer from "@/views/country/components/Footer.vue";
import * as echarts from "echarts";
import china from "@/assets/china.json";
import { GeoCoordMap } from "@/data/homeBgdata.ts";
import { data, convertData, img2, lineData } from "@/data/homeBgdata.ts";
import { useRouter } from "vue-router";
const router = useRouter();
// @ts-ignore
echarts.registerMap("china", china);
let mapName = "china";
const geoCoordMap = reactive(GeoCoordMap);
// 定义展示数据
let toolTipData = reactive([
  {
    name: "湖南",
    value: 5,
    areas: ["长沙", "株洲", "益阳"],
  },
]);

/*获取地图数据*/
const mapFeatures = echarts.getMap(mapName).geoJson.features;
onMounted(() => {
  let myChart = echarts.init(document.getElementById("chart"));
  myChart.showLoading();

  // 确保地图数据加载完成
  setTimeout(() => {
    myChart.hideLoading();
    myChart.setOption(Mapoption, true);
  }, 1000);

  // 点击事件:鼠标移入
  myChart.on("mouseover", function (params: any) {
    toolTipData[0].name = params.data.name;
    toolTipData[0].value = 60;
  });
  watch(
    toolTipData[0],
    async (_nextsource) => {
      let map = echarts.init(document.getElementById("chart"));
      let Getoption: any = map.getOption(); // 获取option数据
      Getoption.series[1].data = lineData(toolTipData); // 找到data修改数据
      Getoption.series[2].data = scatterData(); // 找到data修改数据
      Getoption.series[3].data = convertData(toolTipData); // 找到data修改数据
      map.setOption(Getoption, true); // 重新渲染
    },
    {
      deep: true,
    }
  );
  myChart.on("click", function (params: any) {
    router.push({
      name: "city",
      params: {
        cityId: params.data.id,
      },
    });
  });
});

mapFeatures.forEach(function (v: any) {
  // 地区名称
  var name = v.properties.name;

  // 地区经纬度
  // @ts-ignore
  geoCoordMap[name] = v.properties.cp;
});
function scatterData() {
  return toolTipData.map((item) => {
    // @ts-ignore
    return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + 2, item];
  });
}
// 处理地图

var Mapoption = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "none",
    formatter: function (params: any) {
      if (typeof params.value[2] == "undefined") {
        var toolTiphtml = "";
        for (var i = 0; i < toolTipData.length; i++) {
          // @ts-ignore
          if (params.name == toolTipData[i].name) {
            // @ts-ignore
            toolTiphtml += toolTipData[i].name + "：" + toolTipData[i].value;
          }
        }
        return toolTiphtml;
      } else {
        var toolTiphtml = "";
        for (var i = 0; i < toolTipData.length; i++) {
          // @ts-ignore
          if (params.name == toolTipData[i].name) {
            // @ts-ignore
            toolTiphtml += toolTipData[i].name + ":" + toolTipData[i].value;
          }
        }
        return toolTiphtml;
      }
    },
    backgroundColor: "#fff",
    borderColor: "#333",
    padding: [5, 10],
    textStyle: {
      color: "#333",
      fontSize: "16",
    },
  },
  // 国家地图边缘
  geo: [
    {
      layoutCenter: ["50%", "50%"], //位置
      layoutSize: "200%", //大小
      show: true,
      map: mapName,
      roam: false,
      zoom: 0.65,
      aspectScale: 1,
      label: {
        normal: {
          show: false,
          textStyle: {
            color: "#fff",
          },
        },
        emphasis: {
          show: true,
          textStyle: {
            color: "#fff",
          },
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
          borderColor: "rgba(192,243,251,0.5)",
          borderWidth: 1,
          shadowColor: "rgba(140,211,239,0.3)",
          shadowOffsetY: 5,
          shadowBlur: 60,
        },
        emphasis: {
          areaColor: "rgba(0,254,233,0.6)",
        },
      },
    },
  ],
  series: [
    {
      type: "map",
      map: mapName,
      geoIndex: 0,
      aspectScale: 1, //长宽比
      zoom: 0.65,
      showLegendSymbol: true,
      roam: true,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: "100%",
          },
        },
        emphasis: {
          // show: false,
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
          borderColor: "rgba(255,255,255,0.3)",
          borderWidth: 0.2,
        },
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "250%",
      animation: false,
      markPoint: {
        symbol: "none",
      },
      data: data,
    },
    //柱状体的主干
    {
      type: "lines",
      zlevel: 5,
      effect: {
        show: false,
        symbolSize: 5, // 图标大小
      },
      lineStyle: {
        width: 6, // 尾迹线条宽度
        color: "rgba(249, 105, 13, 0.6)",
        opacity: 1, // 尾迹线条透明度
        curveness: 0, // 尾迹线条曲直度
      },
      label: {
        show: 0,
        position: "end",
        formatter: "245",
      },
      silent: true,
      data: lineData(toolTipData),
    },
    // 柱状体的顶部
    {
      type: "scatter",
      coordinateSystem: "geo",
      geoIndex: 0,
      zlevel: 5,
      label: {
        normal: {
          show: true,
          formatter: function (params: any) {
            var name = params.data[2].name;
            var value = params.data[2].value;
            var text = `{tline|${name}} : 旅游景区{fline|${value}}个`;
            // var text = `{tline|项目个数} : {fline|${value}}`
            return text;
          },
          color: "#fff",
          rich: {
            fline: {
              // padding: [0, 25],
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
            },
            tline: {
              // padding: [0, 27],
              color: "#ABF8FF",
              fontSize: 12,
            },
          },
        },
        emphasis: {
          show: true,
        },
      },
      itemStyle: {
        color: "#00FFF6",
        opacity: 1,
      },
      symbol: img2,
      symbolSize: [150, 60],
      symbolOffset: [0, -20],
      z: 999,
      data: scatterData(),
    },
    // 底部范围圈
    {
      name: "quan",
      type: "effectScatter",
      coordinateSystem: "geo",
      data: convertData(toolTipData),
      showEffectOn: "render",
      itemStyle: {
        normal: {
          color: "#00FFFF",
        },
      },
      rippleEffect: {
        scale: 5,
        brushType: "stroke",
      },
      label: {
        normal: {
          formatter: "{b}",
          position: "bottom",
          show: false,
          color: "#fff",
          distance: 10,
        },
      },
      symbol: "circle",
      symbolSize: [20, 10],
      zlevel: 4,
      lazyUpdate: true,
    },
  ],
};
</script>

<style scoped>
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
  height: 85vh; /* 限制地图高度 */
}

.footer-row {
  flex-shrink: 0;
  height: 15vh; /* 给 footer 固定高度 */
}

#chart {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
