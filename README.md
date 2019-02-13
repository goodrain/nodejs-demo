# NodeJS 示例程序

## 项目介绍

本项目是一个简单的 [NodeJS](http://nodejs.org) 示例，来自官网。目录结构：

```
.
├── router.js
├── requestHandlers.js
├── server.js
├── index.html
├── MySQL.html
├── apiInstance.html
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
  "name": "node-demo",
  "version": "0.0.1",
  "description": "webserver demo from http://nodejs.org/",
  "engines": {
    "node": "8.9.3"
  },
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "body-parser": "^1.18.3",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "mysql": "^2.16.0"
  },
  "license": "MIT"
}

```

### 监听端口

NodeJS 应用需要使用 `PORT` 环境变量的值来确定 web 服务需要监听的端口，示例：

```
app.listen(process.env.PORT || 5000);
```



## 本地测试

1. 执行 `npm install` 安装所需依赖包。
2. 执行 `npm start` 即可启动 web 服务器。
3. 访问 <http://localhost:5000> 预览效果
