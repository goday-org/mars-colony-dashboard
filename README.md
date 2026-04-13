# 🔴 Mars Colony Mission Control | 火星移民任务控制中心

基于真实火星探索数据的交互式进度监控面板。

## 🚀 技术栈

- **Vue 3** + Vite + Vue Router
- **ECharts 5** 交互式图表
- **Tailwind CSS** 深空科幻主题

## 📊 功能模块

| 模块 | 说明 |
|------|------|
| 📊 总览 | KPI 卡片 + 子系统仪表盘 + 里程碑 + 风险预警 |
| 🔧 子系统进度 | 6 大子系统（推进/生命保障/居住舱/通信/能源/着陆）+ 雷达图 |
| 🏁 里程碑追踪 | 时间线图表 + 机构筛选 + 历史与未来里程碑 |
| ⚠️ 风险评估 | 风险矩阵散点图 + 等级筛选 + 风险清单 + 缓解措施 |
| 💰 预算与资源 | 预算饼图 + 成本柱状图 + 机构表格 + 资源储备仪表 |

## 🛠️ 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📁 数据更新

所有数据位于 `src/data/` 目录下的 JSON 文件中：

- `subsystems.json` — 子系统进度数据
- `milestones.json` — 里程碑时间线
- `risks.json` — 风险评估数据
- `budget.json` — 预算与资源数据

直接编辑 JSON 文件即可更新数据，开发服务器会自动热更新。

## 📄 数据来源

基于 NASA、SpaceX、ESA、CNSA 等机构的公开数据。

## 📜 License

MIT
