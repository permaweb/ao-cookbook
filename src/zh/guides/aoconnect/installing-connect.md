# 安装 ao connect

## 先决条件

---

为了在你的应用程序中安装 **ao connect**，你必须安装 NodeJS/NPM 18 或更高版本。
<br>

## 安装方法

### 使用 npm 安装

```sh
npm install --save @permaweb/aoconnect
```

### 使用 yarn 安装

```sh
yarn add @permaweb/aoconnect -D
```

<br>

安装完成后，你可以在 NodeJS 或 浏览器中使用 **aoconnect**。根据你的项目类型（模块系统），可以按照下面的方式引入 **aoconnect**

#### ESM（Node & 浏览器）即 type: module

```js
import {
  result,
  results,
  message,
  spawn,
  monitor,
  unmonitor,
  dryrun,
} from "@permaweb/aoconnect";
```

#### CJS（Node）即 type: `commonjs`

```js
const {
  result,
  results,
  message,
  spawn,
  monitor,
  unmonitor,
  dryrun,
} = require("@permaweb/aoconnect");
```
