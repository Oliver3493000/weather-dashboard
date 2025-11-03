# Weather Dashboard - Vercel 部署指南

本文档将指导您如何将 Weather Dashboard 项目部署到 Vercel。

## 📋 前置准备

在开始部署之前，请确保您已经：

- ✅ 拥有 GitHub 账户
- ✅ 拥有 Vercel 账户（可以使用 GitHub 账户登录）
- ✅ 拥有 OpenWeatherMap API Key（已激活）

## 🚀 部署步骤

### 步骤 1: 上传代码到 GitHub

1. **登录 GitHub**
   - 访问 https://github.com
   - 使用您的账户登录

2. **创建新仓库**
   - 点击右上角的 "+" 按钮
   - 选择 "New repository"
   - 仓库名称：`weather-dashboard`（或您喜欢的名称）
   - 描述：`A modern weather dashboard built with React and TypeScript`
   - 选择 **Public**（公开）或 **Private**（私有）
   - **不要**勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

3. **上传项目文件**
   
   **方法 A：使用 GitHub 网页界面（推荐新手）**
   - 在新创建的仓库页面，点击 "uploading an existing file"
   - 将项目文件夹中的所有文件拖拽到上传区域
   - 等待上传完成
   - 填写 commit 信息：`Initial commit`
   - 点击 "Commit changes"

   **方法 B：使用 Git 命令行**
   ```bash
   cd weather-dashboard
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
   git push -u origin main
   ```
   （将 `YOUR_USERNAME` 替换为您的 GitHub 用户名）

### 步骤 2: 部署到 Vercel

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 点击 "Sign Up" 或 "Log In"
   - 选择 "Continue with GitHub" 使用 GitHub 账户登录
   - 授权 Vercel 访问您的 GitHub 账户

2. **导入项目**
   - 登录后，点击 "Add New..." 按钮
   - 选择 "Project"
   - 在 "Import Git Repository" 页面，找到您刚创建的 `weather-dashboard` 仓库
   - 点击 "Import"

3. **配置项目**
   
   在 "Configure Project" 页面：
   
   - **Project Name**: `weather-dashboard`（可自定义）
   - **Framework Preset**: Vercel 会自动检测为 "Vite"
   - **Root Directory**: `./`（保持默认）
   - **Build Command**: `pnpm build`（保持默认）
   - **Output Directory**: `dist`（保持默认）

4. **配置环境变量**
   
   这是最重要的一步！
   
   - 在 "Environment Variables" 部分
   - 点击展开环境变量配置
   - 添加以下变量：
   
   | Name | Value |
   |------|-------|
   | `VITE_OPENWEATHER_API_KEY` | `9649fe45ab9c742be28c107143042826` |
   
   - 确保选择了所有环境（Production, Preview, Development）
   - 点击 "Add" 添加变量

5. **开始部署**
   - 检查所有配置无误后
   - 点击 "Deploy" 按钮
   - 等待部署完成（通常需要 1-3 分钟）

### 步骤 3: 访问您的网站

部署成功后：

1. Vercel 会显示 "Congratulations!" 页面
2. 您会看到一个类似 `https://weather-dashboard-xxx.vercel.app` 的链接
3. 点击链接访问您的天气仪表盘
4. 测试搜索功能，确保一切正常

## 🔧 后续管理

### 查看部署状态

1. 登录 Vercel Dashboard
2. 选择您的项目
3. 查看部署历史、访问日志等

### 更新环境变量

如果需要更换 API Key：

1. 进入项目设置（Settings）
2. 选择 "Environment Variables"
3. 找到 `VITE_OPENWEATHER_API_KEY`
4. 点击编辑或删除重新添加
5. 重新部署项目（Deployments → Redeploy）

### 自定义域名（可选）

1. 在项目设置中选择 "Domains"
2. 点击 "Add Domain"
3. 输入您的域名
4. 按照提示配置 DNS 记录

### 更新代码

每次推送代码到 GitHub 的 main 分支，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Update features"
git push origin main
```

## 📊 性能优化建议

部署后，您可以：

1. **启用 Analytics**
   - 在 Vercel 项目设置中启用 Analytics
   - 查看访问量、性能指标等

2. **配置缓存**
   - Vercel 默认已优化静态资源缓存
   - 无需额外配置

3. **监控 API 使用**
   - 登录 OpenWeatherMap Dashboard
   - 查看 API 调用次数
   - 免费版限制：1000 次/天

## 🐛 常见问题

### 问题 1: 部署失败

**解决方案：**
- 检查 `package.json` 中的依赖是否完整
- 确保 `pnpm-lock.yaml` 文件已上传
- 查看 Vercel 部署日志中的错误信息

### 问题 2: 网站显示但无法获取天气数据

**解决方案：**
- 检查环境变量 `VITE_OPENWEATHER_API_KEY` 是否正确配置
- 确认 API Key 已激活
- 在浏览器控制台查看具体错误信息

### 问题 3: 401 Unauthorized 错误

**解决方案：**
- API Key 可能未激活或已过期
- 重新生成 API Key
- 在 Vercel 更新环境变量后重新部署

### 问题 4: 构建超时

**解决方案：**
- 检查依赖包大小
- 考虑升级 Vercel 计划（免费版有构建时间限制）

## 📞 获取帮助

- **Vercel 文档**: https://vercel.com/docs
- **OpenWeatherMap 文档**: https://openweathermap.org/api
- **项目 GitHub Issues**: 在您的仓库创建 Issue

## ✅ 部署检查清单

部署完成后，请确认：

- [ ] 网站可以正常访问
- [ ] 搜索功能正常工作
- [ ] 可以查看当前天气
- [ ] 7天预报正常显示
- [ ] 图表正常渲染
- [ ] 收藏城市功能正常
- [ ] 响应式设计在移动端正常
- [ ] 没有控制台错误

## 🎉 恭喜！

您已成功将 Weather Dashboard 部署到 Vercel！现在您可以：

1. 分享您的网站链接
2. 添加到简历或作品集
3. 继续开发新功能
4. 自定义样式和内容

---

**祝您使用愉快！** 🌤️
