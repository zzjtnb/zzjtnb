---
title: node使用 log4js
category: Node.js
tags:
  - Node.js
cover: https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1333&q=80
---

```js
const log4js = require("log4js");
// log4js的输出级别6个: trace, debug, info, warn, error, fatal

const config = {
  "appenders": {
    //设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
    "consoleout": { "type": "console" },
    "access": {
      "type": "dateFile", //输出到格式化的文件（log/access/access-yyyy-MM-dd.log）
      "filename": "logs/http/access.log",
      "pattern": "-yyyy-MM-dd", //生成文件的规则
      "category": "http"
    },
    "accessError": { "type": "file", "filename": "logs/http/error.log" },
    "dbFile": { "type": "file", "filename": "logs/db/info.log" },
    "appFile": { "type": "dateFile", "filename": "logs/app/app.log", "pattern": "-yyyy-MM-dd", },
  },
  //不同等级的日志追加到不同的输出位置：appenders: ['consoleout', 'access']  categories 作为getLogger方法的键名对应
  //appenders:采用的appender,取上面appenders项,level:设置级别
  "categories": {
    "default": { "appenders": ["consoleout"], "level": "INFO" },
    "http": { "appenders": ["access"], "level": "INFO" },
    "httpError": { "appenders": ["accessError"], "level": "error" },
    "dbInfo": { "appenders": ["dbFile"], "level": "INFO" },
    "app": { "appenders": ["appFile", "consoleout"], "level": "INFO" },
  }
}
log4js.configure(config);
const logger = log4js.getLogger('dbInfo');
//重新写了info方法
exports.info = function (message) {
  logger.info(message)
}
exports.httpLogger = log4js.connectLogger(log4js.getLogger("http"), { level: 'INFO' })//记录所有访问级别的日志
exports.httpErrorLogger = log4js.getLogger("httpError")
exports.consoleout = log4js.getLogger("consoleout")
exports.appLog = log4js.getLogger("app.js");

```

app.js

```js
const { httpLogger, httpErrorLogger, appLog } = require('./middleware/log4');
app.use(httpLogger)
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    httpErrorLogger.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.json({ err_code: err.status || 500, message: err.message })
  });
} else {
  // production error handler-生产错误处理程序
  // no stacktraces leaked to user-没有堆栈跟踪泄露给用户
  app.use((err, req, res, next) => {
    httpErrorLogger.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.json({ err_code: err.status || 500, message: err.message })
  });
}
app.listen(port, host, () =>
  // console.log('\033[42;30m DONE \033[40;32m  app runing on http://%s:%s \033[0m', host, port)
  appLog.info(`Server listening on http://${host}:${port}`)
)

```

db.js

```js
const sequelize = new Sequelize(dbcfg.zzjtnb);
const { consoleout } = require('../middleware/log4');
//测试连接
sequelize.authenticate()
  .then(() => {
    consoleout.info('MySql Connection has been established successfully.');
    sequelize.sync();
    consoleout.info("所有模型均已成功同步.");
  })
  .catch(err => {
    consoleout.error('Unable to connect to the database:', err);
  });

```
