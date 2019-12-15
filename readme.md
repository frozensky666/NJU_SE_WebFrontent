## Readme

### 使用方式

- 在 db.js 的 pool 中配置数据库的用户名、密码和运行端口
- 使用 db.sql 导入数据库
- 下载 package.json 中依赖的包
- node server.js 运行项目

### 代码结构说明

- routes：子路由
  - account.js：与登陆注册相关， 在**后端**对密码进行了**md5加密**
  - index.js：路由到首页
- sql：存放mysql查询语句

- static：存放静态文件，包括 html\css\js\图片\视频
  - 在**前端**也对密码进行了**md5加密**
- db.js：数据库访问入口
- db.sql：导入数据库表
- permission.js：权限验证相关的函数，包含一些自定义的拦截器
- server.js：应用入口
- validCode.js：用于产生验证码图片
