# Installing ao connect

## Prerequisites

---

In order to install ao connect into your app you must have NodeJS/NPM 18 or higher.
<br>

## Installing

### npm

```sh
npm install --save @permaweb/ao-connect
```

### yarn

```sh
yarn add @permaweb/ao-connect -D
```

<br>

This module can now be used from NodeJS as well as a browser, it can be included as shown below.

#### ESM (Node & Browser) aka type: `module`

```js
import { spawn, message, result } from "@permaweb/ao-connect";
```

#### CJS (Node) type: `commonjs`

```js
const { spawn, message, result } = require("@permaweb/ao-connect");
```
