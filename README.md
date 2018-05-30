# 上海交通大学 自动评教工具
## 使用方法
1. 安装node.js
2. 安装包管理工具yarn
```bash
npm install yarn -g
```
3. 安装依赖包
```bash
yarn install
```
4. 配置个人cookie：在`config.js`中填写自己的cookie
5. 运行脚本
```bash
node index.js
```

## 注意事项
1. `config`中的`sleep`为每次取到问卷到提交回答需要等待的时间，单位是ms。
2. 目前**仅支持15级软件工程专业**的问卷，因为对于其他年级和专业我不知道api的格式，欢迎补充。