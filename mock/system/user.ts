const baseUrl = '/mock'

interface User {
  token: string;
  _id: string;
  username: string;
  password: string;
  name?: string;
  phone?: string;
  role_id?: string;
  create_time: number;
  __v: number;
  role: {
    _id?: string;
    name?: string;
    menus: string[];
    create_time?: number;
    __v?: number;
    auth_time?: number;
    auth_name?: string;
  };
  auth_time?: number;
  auth_name?: string;
}

function createUserList(): { data: User[] } {
  return {
    data: [
      {
        token: 'Admin Token',
        _id: '641280fdc5ff3cb994002003',
        username: 'test1',
        name: '测试用户1',
        password: '1234',
        phone: '13112345678',
        role_id: '640ec59a9f6e3402f8edd4ec',
        create_time: 1678934269969,
        __v: 0,
        role: {
          _id: '640ec59a9f6e3402f8edd4ec',
          name: '管理员',
          menus: ['/home', '/user', '/role', '/school', '/majors', '/student', '/class'],
          create_time: 1678689690752,
          __v: 0,
          auth_time: 1678952409061,
          auth_name: 'test1',
        },
      },
      {
        token: '@string("upper", 10)',
        _id: '@string("lower", 24)',
        username: 'admin',
        password: '1234',
        create_time: 1678347462193,
        __v: 0,
        role: {
          menus: [],
        },
        auth_time: 1678952409061,
        auth_name: 'admin',
      },
    ],
  }
}

export default [
  {
    url: `${baseUrl}/login`,
    methods: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createUserList().data.find(
        (item) => item.username === username && item.password === password,
      )
      if (!checkUser) {
        return { status: 1, msg: '用户名或密码错误' }
      }
      const { token } = checkUser
      return { status: 0, data: { token } }
    },
  },
  {
    url: `${baseUrl}/menus`,
    methods: 'get',
    response: (req: any) => {
      const token = (req.headers as { token?: string }).token
      if (!token) {
        return { status: 1, msg: { message: 'token不存在' } }
      }
      const checkUser = createUserList().data.find((item) => item.token === token)
      if (!checkUser) {
        return { status: 1, msg: { message: '获取用户信息失败' } }
      }
      return {
        status: 0,
        data: {
          ...checkUser,
          menus: checkUser.role.menus,
        },
      }
    },
  },
  {
    url: `${baseUrl}/user/info`,
    methods: 'get',
    response: (req: any) => {
      const token = (req.headers as { token?: string }).token
      const checkUser = createUserList().data.find((item:any) => item.token === token)
      if (!checkUser) {
        return { status: 1, msg: { message: '获取用户信息失败' } }
      }
      return { status: 0, data: { ...checkUser } }
    },
  },
]
