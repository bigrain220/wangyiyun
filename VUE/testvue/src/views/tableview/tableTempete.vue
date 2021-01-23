<template>
  <div>
    <table-self :data="data" :option="option"></table-self>
  </div>
</template>

<script>
export default {
  components: {
    tableSelf: () => import("@/components/tableSelf")
  },
  data() {
    return {
      data: [
        {
          name: '张三',
          sex: '男',
          date: '1994-02-23 00:00:00'
        }, {
          name: '李四',
          sex: '女',
          date: '1994-02-23 00:00:00'
        }, {
          name: '王五',
          sex: '女',
          date: '1994-02-23 00:00:00'
        }, {
          name: '赵六',
          sex: '男',
          date: '1994-02-23 00:00:00'
        }
      ],
      option: {
        align: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '性别',
            prop: 'sex'
          }, {
            label: "日期",
            prop: "date",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          }
        ]
      },
    }
  },
  methods: {

  }
}
</script>

<style>
</style>