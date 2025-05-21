const baseUrl = '/mock'

function createUserList() {
  return {
    data: {
      students: [
        {
          _id: '640ec59a9f6e3402f8edd4ec',
          name: '张三',
          menus: [
            '/home',
            '/user',
            '/role',
            '/school',
            '/majors',
            '/student',
            '/class',
          ],
          create_time: 1678689690752,
          __v: 0,
        },
        {
          _id: '640ec59a9f6e341218edd122',
          name: '李四',
          menus: [
            '/home',
            '/user',
            '/role',
            '/school',
            '/majors',
            '/student',
            '/class',
          ],
          create_time: 1678689690752,
          __v: 0,
        },
      ],
    },
  }
}

// 对外暴露一个数组，数组里面有一个登录接口
export default [
  {
    url: `${baseUrl}/manage/student/date`,
    method: 'get',
    response: () => createUserList(),
  },
]
