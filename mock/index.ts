import Mock from 'mockjs'

import account from './modules/account'
import baseTable from './modules/baseTable'
import user from './modules/user'

// 延时数据返回,模拟loading效果

export default [
  {
      url: "/api/login",
      method: "post",
      response: account.login
  },
  {
      url: "/api/accountInfo",
      method: "get",
      response: account.getAccountInfo
  },
  {
      url: "/api/baseTable",
      method: "get",
      response: baseTable.getBaseTable
  },
  {
      url: "/api/user/list",
      method: "post",
      response: user.getList
  },
  {
      url: "/api/user/detail",
      method: "post",
      response: user.getDetail
  },
  {
      url: "/api/user/update",
      method: "post",
      response: user.update
  },
  {
      url: "/api/user/delete",
      method: "post",
      response: user.remove
  },
  {
      url: "/api/getUsers",
      method: "get",
      response: () => {
          return {
              code: 0,
              message: "ok",
              data: {
                  'rows|10': [{
                      id: '@guid',
                      name: '@cname',
                      'age|20-30': 23,
                      'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
                    }]
              },
          }
      }
  }
]

