# NodeJS 示例程序

## 项目介绍

本项目是一个简单的 [NodeJS](http://nodejs.org) 示例，来自官网。目录结构：

```
.
├── Procfile
├── README.md
├── app.js
└── package.json
```

## 项目要求

### 包管理器

NodeJS 程序需要使用 [npm](https://www.npmjs.org) 管理依赖，且必须存在 `package.json` 文件，如果不存在请使用 `npm init` 命令创建并配置需要的依赖和其它信息，否则应用将无法部署。`package.json`的具体配置项请参考 [npm 文档](https://www.npmjs.org/doc/json.html)。

`package.json` 文件示例：

```
{
  "name": "default-nodejs-app",
  "version": "0.0.1",
  "author": "Your Name",
  "dependencies": {
    "express": "3.4.8",
    "consolidate": "0.10.0",
    "express": "3.4.8",
    "swig": "1.3.2",
  },
  "engines": {
    "node": "0.10.x",
    "npm": "1.3.x"
  }
}
```

### 监听端口

NodeJS 应用需要使用 `PORT` 环境变量的值来确定 web 服务需要监听的端口，示例：

```
app.listen(process.env.PORT || 5000;
```

### 启动命令

需要在 `Procfile` 文件里指定应用的启动命令，示例：

```
web: node app.js
```



## 本地测试

1. 执行 `npm install` 安装所需依赖包。
2. 执行 `node app.js` 即可启动 web 服务器。
3. 访问 <http://localhost:5000> 预览效果
