// import { defineMock } from 'vite-plugin-mock-dev-server';

// export default defineMock({
//   method: "GET",
//   url: '/api/test',
//   "data|100": {
//     name: "@cname",
//     ename: "@name",
//     "id|+1": 1, 
//   }
// })

import mockJS from "mockjs";

// const userList = mockJS.mock({
//   "data|100" : [{
//     name: " @cname",
//     ename: " @ename ",
//     "id|+1": 1,
//   }]
// })

module.exports = [
  {
    url: '/api/test',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        // data: [1,2,3]
        data: {
          'rows|10': [{
            'id|+1': 1,
            name: '@cname',
            'age|20-30': 23,
            'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
          }]
        },
      }
    }
  },
  {
    pattern: '/api/hello2',
    method: 'GET',
    handle: (req, res) => {
      res.end('hello2:' + req.url)
    }
  },
  {
    pattern: '/api/hello3',
    method: 'GET',
    handle: (req, res) => {
      res.end('hello2:' + req.url)
    }
  }
]