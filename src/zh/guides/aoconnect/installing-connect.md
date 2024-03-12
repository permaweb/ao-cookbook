# Installing ao connect

## Prerequisites

---

In order to install ao connect into your app you must have NodeJS/NPM 18 or higher.
<br>

## Installing

### npm

```sh
npm install --save @permaweb/aoconnect
```

### yarn

```sh
yarn add @permaweb/aoconnect -D
```

<br>

This module can now be used from NodeJS as well as a browser, it can be included as shown below.

#### ESM (Node & Browser) aka type: `module`

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

#### CJS (Node) type: `commonjs`

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
