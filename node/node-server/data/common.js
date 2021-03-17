const res = {
    '/getTest1': {
      methods: 'get',
      data: new Array(10).fill({
        name: 'xiaoming',
        value: "11"
      })
    },
    '/getTest2': {
      methods: 'post',
      data: new Array(10).fill({
        name: 'xiaoming',
        value: "222"
      })
    },
  }
  
  module.exports = res