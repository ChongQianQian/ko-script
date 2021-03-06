## ko-script v2.2.8

[![npm version](https://img.shields.io/npm/v/ts-loader.svg)](https://www.npmjs.com/package/ko-script)
[![Linux Build Status](https://travis-ci.org/TypeStrong/ts-loader.svg?branch=master)](https://npmjs.org/package/ko-script)
[![Downloads](http://img.shields.io/npm/dm/ts-loader.svg)](https://npmjs.org/package/ko-script)
[![node version](https://img.shields.io/node/v/ts-loader.svg)](https://www.npmjs.com/package/ko-script)

```text
支持 react，vue, react-ts快速打包，让你不再纠结 webpack，vue，ts配置
```
## Installation
```text
$ yarn add ko-script  -g 

$ yarn add ko-script --dev
```

## Getting Started

### Use basics
```text
1. ko init  初始项目模版文件 效果如:[create-react-app]

2. ko dll   生成动态连接库

3. ko dev   启动本地开发环境

4. ko build 编译项目到生产环境

5. ko preview 预览编译后项目静态文件

6. ko move  默认移动文件(可配置)

7. ko swagger 生成swagger接口文件(可选js/ts),用户自定义请放在restful.js

8. ko [xx] -h 查看相关命令参数使用
```

### Use advanced
> 自定义配置，遵循commjs语法，在项目根目录创建 ko.config.js 结构如下：
```js
module.exports = (context) => {
  const { webpack } = context;
  return {
      dll:[], //自定义dll打包modules，默认dependencies中的模块包
      server: { //本地服务配置
        "host": "127.0.0.1",
        "port": 3002
      },
      proxy: [{ //接口代理配置,解决跨域问题
        "context": ["/auth", "/api"],
        "target": "http://localhost:3000"
      }],
      move: {
        "from"://移动目录或文件
        "to": //目标地址
      },
      webpack:{ //自定义webpack配置
        entry:{},
        output:{},
        modules:{}
        ...
      }
  }
}
```

> @babel/polyfill 垫片使用
```text
1.import "@babel/polyfill" //当使用es6新实例，需引入此垫片
```

> Global Configuration

```text
1.在项目public目录下新建config目录，并新建文件conf.dev.js/conf.prod.js

2.conf.dev.js/conf.prod.js 示例如下：

    var FRONT_CONF = {
      LOGO: '/img/logo.png', // 项目logo
      COPY_RIGHT: (new Date()).getFullYear() + ' 杭州玳数科技有限公司 浙ICP备15044486号-1',
    }

```


### Project directory
```
  project
  ├── public                 // 公共资源文件(第三方资源库，项目模板文件，全局配置文件config)
  ├── src
  │     ├── components       // 公共组件
  │     ├── layouts          // 通用布局
  │     ├── pages            // 页面
  │     └── index.js/index.tsx         // 默认入口文件，可手动配置
  ├── dll                  // 构建后的动态链接库文件
  ├── dist                  // 构建后的前端静态资源
  │     ├── index.html
  │     ├── css
  │     └── js
  ├── ko.config.js          // 自定义配置文件
  ├── package.json           // package.json
  └── README.md              // 项目说明
```

### Tips
> react支持ts，并且ts，tsx和js，jsx可以共存，但是如果使用es6新语法，诸如 await，箭头函数，const等，需要将文件改为ts或者tsx

> 文件路径别名问题，如果使用tsx，webpack中别名配置将会报错，需要在tsconfig中配置path别名




