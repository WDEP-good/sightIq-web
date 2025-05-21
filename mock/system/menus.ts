const baseUrl = '/mock'
function createMenusList() {
  return {
    status: 200,
    message: '获取菜单列表成功',
    data: {
      menus: [
        {
          title: 'RBAC-Admin', // 菜单标题名称
          index: '/', // 对应的 path
          icon: 'logo', // 图标名称
          isPublic: true, //公共的
        },
        {
          title: '仪表盘', // 菜单标题名称
          index: '/dashboard', // 对应的 path
          icon: 'House', // 图标名称
          children: [
            {
              title: '首页',
              index: '/dashboard/home',
              icon: 'House',
            },
            {
              title: '工作台',
              index: '/dashboard/workbench',
              icon: 'House',
            },
          ],
        },
        {
          title: '个人办公', // 菜单标题名称
          index: '/personal', // 对应的 path
          icon: 'House', // 图标名称
          isPublic: true, //公共的
          children: [
            {
              title: '我的任务',
              index: '/personal/task',
              icon: 'House',
            },
            {
              title: '我发起流程',
              index: '/personal/workflow',
              icon: 'House',
            },
            {
              title: '我的抄送',
              index: '/personal/copy',
              icon: 'House',
            },
          ],
        },
        {
          title: '个人申请',
          index: '/personalapply',
          icon: 'User',
          children: [
            {
              title: '请假申请',
              index: '/personalapply/leave',
              icon: 'User',
            },
            {
              title: '出差申请',
              index: '/personalapply/business',
              icon: 'Mouse',
            },
            {
              title: '报销申请',
              index: '/personalapply/reimbursement',
              icon: 'Mouse',
            },
            {
              title: '公文发送',
              index: '/personalapply/document',
              icon: 'Mouse',
            },
            {
              title: '我的申请',
              index: '/personalapply/apply',
              icon: 'Mouse',
            },
          ],
        },
        {
          title: 'OA申请',
          index: '/personal/apply',
          icon: 'User',
          children: [
            {
              title: '工单申请',
              index: '/personal/apply/order',
              icon: 'User',
            },
            {
              title: '我的工单',
              index: '/personal/apply/order',
              icon: 'Mouse',
            },
            {
              title: '工单查询',
              index: '/personal/apply/order',
              icon: 'Mouse',
            },
          ],
        },
        {
          title: '企业管理',
          index: '/company',
          icon: 'User',
          children: [
            {
              title: '人员管理',
              index: '/company/user',
              icon: 'User',
            },
            {
              title: '角色管理',
              index: '/company/role',
              icon: 'Mouse',
            },
            {
              title: '团队管理',
              index: '/company/team',
              icon: 'Mouse',
            },
            {
              title: '部门管理',
              index: '/company/department',
              icon: 'Mouse',
            },
            {
              title: '岗位管理',
              index: '/company/position',
              icon: 'Mouse',
            },
          ],
        },
        {
          title: '消息中心',
          index: '/message',
          icon: 'Files',
          children: [
            // 子菜单列表
            {
              title: '消息模版',
              index: '/message',
              icon: 'Cpu',
            },
            {
              title: '我的消息',
              index: '/message',
              icon: 'Goods',
            },
          ],
        },
        {
          title: '组件&功能',
          index: '/demo',
          icon: 'Files',
          children: [
            // 子菜单列表
            {
              title: '按钮',
              index: '/demo/button',
              icon: 'Cpu',
            },
            {
              title: '消息',
              index: '/demo/message',
              icon: 'Goods',
            },
            {
              title: '表格',
              index: '/demo/table',
              icon: 'Pointer',
            },
            {
              title: '表单',
              index: '/demo/form',
              icon: 'UserFilled',
            },
          ],
        },
      ],
    },
  }
}

// 对外暴露一个数组，数组里面有一个登录接口
export default [
  {
    url: `${baseUrl}/menus`,
    methods: 'get',
    response: () => createMenusList(),
  },
]
