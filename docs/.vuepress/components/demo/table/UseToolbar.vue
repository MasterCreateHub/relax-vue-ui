<template>
    <re-table :data="data" :columns="columns" />
  </template>
  <script>
  export default {
    name: "UseToolbar",
    data() {
      return {
        data: [
          {
            id: 1,
            name: "张三",
            age: 18,
            email: "zhangsan@163.com",
            phone: "12345678901",
          },
          {
            id: 2,
            name: "李四",
            age: 19,
            email: "lisi@163.com",
            phone: "12345678902",
          },
          {
            id: 3,
            name: "王五",
            age: 20,
            email: "wangwu@163.com",
            phone: "12345678903",
          },
          {
            id: 4,
            name: "赵六",
            age: 21,
            email: "zhaoliu@163.com",
            phone: "12345678904",
          },
          {
            id: 5,
            name: "钱七",
            age: 22,
            email: "qianqiu@163.com",
            phone: "12345678905",
          },
          {
            id: 6,
            name: "孙八",
            age: 23,
            email: "sunba@163.com",
            phone: "12345678906",
          },
          {
            id: 7,
            name: "周八",
            age: 24,
            email: "zhouba@163.com",
            phone: "12345678907",
          },
          {
            id: 8,
            name: "吴九",
            age: 25,
            email: "wujiu@163.com",
            phone: "12345678908",
          },
          {
            id: 9,
            name: "郑十",
            age: 26,
            email: "zhengshi@163.com",
            phone: "12345678909",
          },
          {
            id: 10,
            name: "王十",
            age: 27,
            email: "wangshi@163.com",
            phone: "12345678910",
          },
          {
            id: 11,
            name: "钱十一",
            age: 28,
            email: "qianyi@163.com",
            phone: "12345678911",
          },
        ],
        columns: [
          { label: "会员ID", prop: "id" },
          { label: "姓名", prop: "name" },
          { label: "年龄", prop: "age" },
          { label: "邮箱", prop: "email" },
          { label: "电话", prop: "phone" },
        ],
      };
    },
  };
  </script>