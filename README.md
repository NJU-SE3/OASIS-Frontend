# OASIS-Frontend

![img](https://camo.githubusercontent.com/9eb24cf62518a6f0be1ee2094b7e80b5ef853995/68747470733a2f2f692e6c6f6c692e6e65742f323032302f30342f30362f47316251434d69707a7658787253712e706e67)

## 项目介绍

本项目为OASIS论文知识图谱平台的前端展示部分。平台主要展示功能如下：

- 学术论文查询

  用户可以使用平台的搜索功能获取符合条件的论文列表。支持不同维度以及符合搜索。

- 学术实体展示

  用户可以通过平台查询不同实体（论文作者、研究机构、会议以及领域）。实体展示的信息包括各个实体评价维度的变化趋势以及实体之间的关系

## 在线版本

https://oasi.top/

## 本地运行

- 根目录下运行

```
npm run dev
```

- 本地端口号为8080

## 技术栈

- VUE全家桶（vue + vue-cli + vue router）
- echarts+v-chart
- axios
- 优化：
  - JPGE
  - 引入CDN
  - 路由懒加载