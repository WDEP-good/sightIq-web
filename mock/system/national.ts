const baseUrl = "/mock";

// 对外暴露一个数组，数组里面有一个登录接口
export default [
  {
    url: `${baseUrl}/national`,
    method: "get",
    response: () => {
      return {
        status: "1",
        message: "success",
        data: [
            {
                name: '广西',
                value: 11
            },
            {
                name: '广东',
                value: 22
            },
            {
                name: '北京',
                value: 33
            },
            {
                name: '山东',
                value: 44
            },
            {
                name: '黑龙江',
                value: 55
            },
            {
                name: '吉林',
                value: 66
            },
            {
                name: '辽宁',
                value: 77
            },
            {
                name: '河北',
                value: 88
            },
            {
                name: '天津',
                value: 99
            },
            {
                name: '内蒙古',
                value: 210
            },
            {
                name: '新疆',
                value: 32
            },
            {
                name: '香港',
                value: 43
            },
            {
                name: '澳门',
                value: 190
            },
            {
                name: '江西',
                value: 230
            },
            {
                name: '江苏',
                value: 400
            },
            {
                name: '浙江',
                value: 100
            },
            {
                name: '安徽',
                value: 200
            },
            {
                name: '福建',
                value: 120
            },
            {
                name: '湖北',
                value: 120
            },
            {
                name: '湖南',
                value: 112
            },
            {
                name: '河南',
                value: 210
            },
            {
                name: '山西',
                value: 232
            },
            {
                name: '陕西',
                value: 20
            },
            {
                name: '甘肃',
                value: 30
            },
            {
                name: '青海',
                value: 200
            },
            {
                name: '宁夏',
                value: 300
            },
            {
                name: '海南',
                value: 200
            },
            {
                name: '四川',
                value: 200
            },
            {
                name: '贵州',
                value: 400
            },
            {
                name: '西藏',
                value: 500
            },
            {
                name: '云南',
                value: 600
            },
            {
                name: '重庆',
                value: 500
            },
            {
                name: '台湾',
                value: 400
            },
            {
                name: '上海',
                value: 500
            }
        ]
      };
    },
  },
];
