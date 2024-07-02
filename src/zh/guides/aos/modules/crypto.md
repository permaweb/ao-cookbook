# crypto

## Overview

`crypto` 模块提供了一套用纯 Lua 实现的密码原语，例如摘要、加密算法和其他密码算法。它提供了多种功能进行hash、加密和解密数据，简化了安全通信和数据存储的开发。本文档将指导你了解该模块的功能、安装和使用方式。

## 使用方法

```lua
local crypto = require(".crypto");
```

## Primitives

1. 摘要 (sha1, sha2, sha3, keccak, blake2b, etc.)
2. 密码 (AES, ISSAC, Morus, NORX, etc.)
3. 随机数生成器 (ISAAC)
4. MACs (HMAC)
5. KDFs (PBKDF2)
6. 实用工具 (Array, Stream, Queue, etc.)

---

# 摘要

## MD2

计算给定消息的 MD2 摘要（digest）。

- **参数:**

  - `stream` (Stream): 消息流

- **返回值值:** 一个包含获取不同格式摘要函数的表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua
local str = crypto.utils.stream.fromString("ao")

return crypto.digest.md2(str).asHex() -- 0d4e80edd07bee6c7965b21b25a9b1ea
```

## MD4

计算给定消息的 MD4 摘要。

- **参数:**

  - `stream` (Stream): 消息流

- **返回值值:** 一个包含获取不同格式摘要函数的表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua
local str = crypto.utils.stream.fromString("ao")

return crypto.digest.md4(str).asHex() -- e068dfe3d8cb95311b58be566db66954
```

## MD5

计算给定消息的 MD5 摘要。

- **参数:**

  - `stream` (Stream): 消息流

- **返回值值:** 一个包含获取不同格式摘要函数的表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua
local str = crypto.utils.stream.fromString("ao")

return crypto.digest.md5(str).asHex() -- adac5e63f80f8629e9573527b25891d3
```

## SHA1

计算给定消息的 SHA1 摘要。

- **参数:**

  - `stream` (Stream): 消息流

- **返回值值:** 一个包含获取不同格式摘要函数的表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua
local str = crypto.utils.stream.fromString("ao")

return crypto.digest.sha1(str).asHex() -- c29dd6c83b67a1d6d3b28588a1f068b68689aa1d
```

## SHA2_256

计算给定消息的 SHA2_256 摘要。

- **参数:**
  - `stream` (Stream): 消息流
- **返回值值:** 一个包含获取不同格式摘要函数的表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua
local str = crypto.utils.stream.fromString("ao")

return crypto.digest.sha2_256(str).asHex() -- ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
```

## SHA2_512

计算给定消息的 SHA2_512 摘要。

- **参数:**
  - `msg` (string): 要计算摘要的消息
- **返回值值:** 一个包含获取不同格式摘要的函数表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua
local str = "ao"

return crypto.digest.sha2_512(str).asHex() -- 6f36a696b17ce5a71efa700e8a7e47994f3e134a5e5f387b3e7c2c912abe94f94ee823f9b9dcae59af99e2e34c8b4fb0bd592260c6720ee49e5deaac2065c4b1
```

## SHA3

包含以下函数:

1. `sha3_256`
2. `sha3_512`
3. `keccak256`
4. `keccak512`

每个函数用于计算给定消息的相应摘要。

- **参数:**

  - `msg` (string): 要计算摘要的消息

- **返回值值:** 一个包含获取不同格式摘要的函数表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua

local str = "ao"

crypto.digest.sha3_256(str).asHex()  -- 1bbe785577db997a394d5b4555eec9159cb51f235aec07514872d2d436c6e985
crypto.digest.sha3_512(str).asHex()  -- 0c29f053400cb1764ce2ec555f598f497e6fcd1d304ce0125faa03bb724f63f213538f41103072ff62ddee701b52c73e621ed4d2254a3e5e9a803d83435b704d
crypto.digest.keccak256(str).asHex() -- 76da52eec05b749b99d6e62bb52333c1569fe75284e6c82f3de12a4618be00d6
crypto.digest.keccak512(str).asHex() -- 046fbfad009a12cef9ff00c2aac361d004347b2991c1fa80fba5582251b8e0be8def0283f45f020d4b04ff03ead9f6e7c43cc3920810c05b33b4873b99affdea

```

## Blake2b

计算给定消息的 Blake2b 摘要。

- **参数:**

  - `data` (string): 要进行哈希的数据。
  - `outlen` (number): 输出哈希的长度（可选） **默认：64**.
  - `key` (string): 用于哈希的密钥（可选） **默认： ""**.

- **返回值值:** 一个包含获取不同格式摘要的函数表。
  - `asBytes()`: 字节数组形式的摘要。
  - `asHex()`: 十六进制字符串形式的摘要。
  - `asString()`: 字符串形式的摘要。

示例:

```lua
local str = "ao"

crypto.digest.blake2b(str).asHex() -- 576701fd79a126f2c414ef94adf1117c88943700f312679d018c29c378b2c807a3412b4e8d51e191c48fb5f5f54bf1bca29a714dda166797b3baf9ead862ae1d
crypto.digest.blake2b(str, 32).asHex() -- 7050811afc947ba7190bb3c0a7b79b4fba304a0de61d529c8a35bdcbbb5544f4
crypto.digest.blake2b(str, 32, "secret_key").asHex() -- 203c101980fdf6cf24d78879f2e3db86d73d91f7d60960b642022cd6f87408f8
```

---

# 加密算法

## AES

高级加密标准 (AES) 是一种对称分组密码算法，用于加密敏感信息。它有两个函数：加密和解密。

### 加密

使用 AES 算法加密给定消息。

- **参数:**

  - `data` (string): 要加密的数据。
  - `key` (string): 用于加密的密钥。
  - `iv` (string) 可选: 用于加密的初始化向量。 **默认：""**
  - `mode` (string) 可选: 用于加密的操作模式。 **默认："CBC"**。可用模式包含 `CBC`、`ECB`、`CFB`、`OFB`、`CTR`。
  - `keyLength` (number) 可选：用于加密的密钥长度。 **默认：128**。

- **返回值:** 一个包含不同格式加密数据的函数表。
  - `asBytes()`: 字节数组形式的加密数据。
  - `asHex()`:  十六进制字符串形式的加密数据。
  - `asString()`: 字符串形式的加密数据。

## 解密

使用 AES 算法解密给定消息。

- **参数:**

  - `cipher` (string): 十六进制编码的加密数据。
  - `key` (string): 用于解密的密钥。
  - `iv` (string) 可选：用于解密的初始化向量。**默认: ""**
  - `mode` (string) 可选：用于解密的操作模式。**默认值: "CBC"**。可用模式有 `CBC`、`ECB`、`CFB`、`OFB`、`CTR`。
  - `keyLength` (number) 可选：用于解密的密钥长度。**默认值: 128**。

- **返回值:** 一个包含不同格式解密数据的函数表。
  - `asBytes()`: 字节数组形式的解密数据。
  - `asHex()`: 十六进制字符串形式的解密数据。
  - `asString()`: 字符串形式的解密数据。

示例:

```lua
local str = "ao"

local iv = "super_secret_shh"
local key_128 = "super_secret_shh"

local encrypted = crypto.cipher.aes.encrypt("ao", key, iv).asHex() -- A3B9E6E1FBD9D46930E5F76807C84B8E
local decrypted = crypto.cipher.aes.decrypt(encrypted, key, iv).asHex() -- 616F0000000000000000000000000000

crypto.utils.hex.hexToString(decrypted) -- ao

```

## ISSAC 密码

ISAAC 是一种密码安全的伪随机数生成器 (CSPRNG) 和流密码。它具有以下功能:

1. `seedIsaac`: 使用给定的种子为 ISAAC 加密算法设置种子。
2. `getRandomChar`: 使用 ISAAC 密码生成随机字符。
3. `random`: 使用 ISAAC 密码生成给定范围内的随机数。
4. `getRandom`: 使用 ISAAC 密码生成随机数。
5. `encrypt`: 使用 ISAAC 密码加密给定消息。
6. `decrypt`: 使用 ISAAC 密码解密给定消息。

### 加密

使用 ISAAC 加密给定消息。

- **参数:**
  - `msg` (string): 要加密的消息。
  - `key` (string): 用于加密的密钥。
- **返回值:** 一个包含获取不同格式加密数据函数的表。
  - `asBytes()`: 字节数组形式的加密数据。
  - `asHex()`:  十六进制字符串形式的加密数据。
  - `asString()`: 字符串形式的加密数据。

### 解密

使用 ISAAC 解密给定消息。

- **参数:**
  - `cipher` (string): 十六进制编码的加密数据。
  - `key` (string): 用于解密的密钥。
- **返回值:** 一个包含获取不同格式解密数据函数的表。
  - `asBytes()`: 字节数组形式的解密数据。
  - `asHex()`: 十六进制字符串形式的解密数据。
  - `asString()`: 字符串形式的解密数据。

示例:

```lua
local message = "ao";
local key = "secret_key";

local encrypted = crypto.cipher.issac.encrypt(message, key)
local decrypted = crypto.cipher.issac.decrypt(encrypted.asString(), key) -- ao


encrypted.asHex() -- 7851
```

### 随机数

使用 ISAAC 密码生成随机数。

- **参数:**
  - `min` (number) 可选: 随机数的最小值。 **默认： 0**.
  - `max` (number) 可选: 随机数的最大值。 **默认：2^31 - 1**.
  - `seed` (string) 用于生成随机数的种子。 **默认: math.random(0,2^32 - 1)**.
- **返回值:** 给定范围内的随机数。

示例:

```lua
crypto.cipher.issac.random(0, 100) -- 42
```

## Morus 密码

MORUS 是一种高性能的身份验证加密算法，已提交给 CAESAR 竞赛，最近被选为决赛入围者。

### 加密

使用 MORUS 密码加密给定消息。

- **参数:**
  - `key` (string): 加密密钥（16 或 32 字节字符串）。
  - `iv` (string): 随机数或初始化向量（16 字节字符串）。
  - `msg` (string): 要加密的消息（可变长度字符串）。
  - `ad` (string) 可选: 附加数据（可变长度字符串）。**默认为 ""**。
- **返回值:** 一个包含获取不同格式加密数据函数的表。
  - `asBytes()`: 字节数组形式的加密数据。
  - `asHex()`: 十六进制字符串形式的加密数据。
  - `asString()`: 符串形式的加密数据。

### 解密

使用 MORUS 密码解密给定消息。

- **参数:**
  - `key` (string): 加密密钥（16 或 32 字节字符串）。
  - `iv` (string): 随机数或初始化向量（16 字节字符串）。
  - `cipher` (string): 加密后的消息（可变长度字符串）。
  - `adLen` (number) 可选: 附加数据的长度（可变长度字符串）。**默认为 0**。
- **返回值:** 一个包含获取不同格式解密数据函数的表。
  - `asBytes()`: 字节数组形式的解密数据。
  - `asHex()`: 十六进制字符串形式的解密数据。
  - `asString()`: 字符串形式的解密数据。

示例:

```lua
local m = "ao"
local k = "super_secret_shh"
local iv = "0000000000000000"
local ad= ""

local e = crypto.cipher.morus.encrypt(k, iv, m, ad)
local d = crypto.cipher.morus.decrypt(k, iv, e.asString(), #ad) -- ao

e.asHex() -- 514ed31473d8fb0b76c6cbb17af35ed01d0a
```

## NORX 密码

NORX 是一种经过身份验证的关联数据加密方案，与其他 14 种原语一起被选中进入正在进行的 CAESAR 竞赛的第三阶段。它基于海绵结构，并依赖于允许高效和通用实现的简单排列。

### 加密

使用 NORX 密码加密给定消息。

- **参数:**
  - `key` (string): 加密密钥（32 字节字符串）。
  - `nonce` (string): 随机数或初始化向量（32 字节字符串）。
  - `plain` (string): 要加密的消息（可变长度字符串）。
  - `header` (string) 可选: 附加数据（可变长度字符串）。**默认为 ""**。
  - `trailer` (string) 可选: 附加数据（可变长度字符串）。**默认为 ""**。
- **返回值:** 一个包含获取不同格式加密数据函数的表。
  - `asBytes()`: 字节数组形式的加密数据。
  - `asHex()`: 十六进制字符串形式的加密数据。
  - `asString()`: 符串形式的加密数据。

### 解密

使用 NORX 密码解密给定消息。

- **参数:**
  - `key` (string): 加密密钥（32 字节字符串）。
  - `nonce` (string): 随机数或初始化向量（32 字节字符串）。
  - `crypted` (string): 加密后的消息（可变长度字符串）。
  - `header` (string) 可选: 附加数据（可变长度字符串）。**默认为 ""**。
  - `trailer` (string) 可选: 附加数据（可变长度字符串）。**默认为 ""**。
- **返回值:** 一个包含获取不同格式解密数据函数的表。
  - `asBytes()`: 字节数组形式的解密数据。
  - `asHex()`: 十六进制字符串形式的解密数据。
  - `asString()`: 字符串形式的解密数据。

示例:

```lua
local key = "super_duper_secret_password_shhh"
local nonce = "00000000000000000000000000000000"

local data = "ao"

-- Header and trailer are optional
local header, trailer = data, data

local encrypted = crypto.cipher.norx.encrypt(key, nonce, data, header, trailer).asString()
local decrypted = crypto.cipher.norx.decrypt(key, nonce, encrypted, header, trailer) -- ao

local authTag = encrypted:sub(#encrypted-32+1)

crypto.utils.hex.stringToHex(encrypted) -- 0bb35a06938e6541eccd4440adb7b46118535f60b09b4adf378807a53df19fc4ea28
crypto.utils.hex.stringToHex(authTag) -- 5a06938e6541eccd4440adb7b46118535f60b09b4adf378807a53df19fc4ea28
```

---

# 随机数生成器

该模块包含一个使用 ISAAC 的随机数生成器，它是一个密码安全的伪随机数生成器 (CSPRNG) 和流密码。

- **参数:**
  - `min` (number) 可选: 随机数的最小值。 **默认为 0**.
  - `max` (number) 可选: 随机数的最大值。**默认为 2^31 - 1**。
  - `seed` (string) 可选: 用于生成随机数的种子。**默认为 math.random(0,2^32 - 1)**。
- **返回值:** 给定范围内的随机数。

示例:

```lua
crypto.random.(0, 100, "seed") -- 42
```

---

# MACs

## HMAC

基于哈希的消息认证码 (HMAC) 是一种使用密码哈希函数进行消息认证的机制。HMAC 可以与任何迭代密码哈希函数（例如 MD5、SHA-1）结合使用，并使用共享密钥。

模块公开了一个名为 `createHmac` 的函数，用于创建 HMAC 实例。

- **参数:**
  - `data` (Stream): 要进行哈希的数据。
  - `key` (Array): 用于哈希的密钥。
  - `algorithm` (string) 可选: 用于哈希的算法。**默认为 "sha256"**。可用的算法有 "sha1"、"sha256"。**默认为 "sha1"**。
- **返回值:** 一个包含获取不同格式 HMAC 函数的表。
  - `asBytes()`: 字节数组形式的 HMAC。
  - `asHex()`: 十六进制字符串形式的 HMAC。
  - `asString()`: 字符串形式的 HMAC。

示例:

```lua
local data = crypto.utils.stream.fromString("ao")
local key = crypto.utils.array.fromString("super_secret_key")

crypto.mac.createHmac(data, key).asHex() -- 3966f45acb53f7a1a493bae15afecb1a204fa32d
crypto.mac.createHmac(data, key, "sha256").asHex() -- 542da02a324155d688c7689669ff94c6a5f906892aa8eccd7284f210ac66e2a7
```

---

# KDFs

## PBKDF2

基于密码的密钥派生函数 2 (PBKDF2) 将伪随机函数（例如基于哈希的消息认证码 (HMAC)）应用于输入密码或密码短语以及盐值，并多次重复该过程以生成派生密钥，然后可以在后续操作中将其用作加密密钥。

- **参数:**
  - `password` (Array): 用于派生密钥的密码。
  - `salt` (Array): 要使用的盐值。
  - `iterations` (number):  要执行的迭代次数。
  - `keyLen` (number): 要派生的密钥长度。
  - `digest` (string) 可选: 要使用的摘要算法。**默认为 "sha1"**。可用的算法有 "sha1"、"sha256"。
- **返回值:** 一个包含获取不同格式派生密钥函数的表。
  - `asBytes()`: 字节数组形式的派生密钥。
  - `asHex()`: 十六进制字符串形式的派生密钥。
  - `asString()`: 字符串形式的派生密钥。

示例:

```lua
local salt = crypto.utils.array.fromString("salt")
local password = crypto.utils.array.fromString("password")
local iterations = 4
local keyLen = 16

local res = crypto.kdf.pbkdf2(password, salt, iterations, keyLen).asHex() -- C4C21BF2BBF61541408EC2A49C89B9C6
```

---

# Utilities

## Array

Example Usage:

```lua

local arr = crypto.utils.array

arr.fromString("ao") -- Array
arr.toString(arr.fromString("ao")) -- ao

arr.fromHex("616f") -- Array
arr.toHex(arr.fromHex("616f")) -- 616f

arr.concat(arr.fromString("a"), arr.fromString("o")) -- Array
arr.truncate(arr.fromString("ao"), 1) -- Array

arr.XOR(arr.fromString("a"), arr.fromString("o")) -- Array

arr.substitute(arr.fromString("a"), arr.fromString("o")) -- Array
arr.permute(arr.fromString("a"), arr.fromString("o")) -- Array

arr.copy(arr.fromString("ao")) -- Array
arr.slice(arr.fromString("ao"), 0, 1) -- Array
```

### `size`

返回数组的大小。

- **参数:**
  - `arr` (Array): 需要获取大小的数组。
- **返回值:** 数组的大小。

### `fromString`

从字符串创建数组。

- **参数:**
  - `str` (string): 用于创建数组的字符串。
- **返回值:** 从字符串创建的数组。

### `toString`

将数组转换为字符串。

- **参数:**
  - `arr` (Array): 要转换为字符串的数组。
- **返回值:** 字符串形式的数组。

### `fromStream`

从流创建数组。

- **参数:**
  - `stream` (Stream): 用于创建数组的流。
- **返回值:** 从流创建的数组。

### `readFromQueue`

从队列读取数据并将其存储在数组中。

- **参数:**
  - `queue` (Queue): 要从中读取数据的队列。
  - `size` (number): 要读取的数据大小。
- **返回值:** 包含从队列读取数据的数组。

### `writeToQueue`

将数据从数组写入队列。

- **参数:**
  - `queue` (Queue): 要将数据写入的队列。
  - `array` (Array): 要从中写入数据的数组。
- **返回值:** None

### `toStream`

将数组转换为流。

- **参数:**
  - `arr` (Array):  要转换为流的数组。
- **返回值:** (Stream) 流形式的数组。

### `fromHex`

从十六进制字符串创建数组。

- **参数:**
  - `hex` (string): 用于创建数组的十六进制字符串。
- **返回值:** 从十六进制字符串创建的数组。

### `toHex`

将数组转换为十六进制字符串。

- **参数:**
  - `arr` (Array): 要转换为十六进制字符串的数组。
- **返回值:** 十六进制字符串形式的数组。

### `concat`

连接两个数组。

- **参数:**
  - `a` (Array): 要连接的数组。
  - `b` (Array): 要连接的数组。
- **返回值:** 连接后的数组。

### `truncate`

将数组截断为给定长度。

- **参数:**
  - `a` (Array): 要截断的数组。
  - `newSize` (number): 数组的新大小。
- **返回值:** 截断后的数组。

### `XOR`

对两个数组执行按位异或运算。

- **参数:**
  - `a` (Array): 第一个数组。
  - `b` (Array): 第二个数组。
- **返回值:** 异或运算的结果。

### `substitute`

创建一个新数组，其中包含第一个数组的键和第二个数组的值

- **参数:**
  - `input` (Array): 要替换的数组。
  - `sbox` (Array): 用于替换的数组。
- **返回值:** 替换后的数组。

### `permute`

创建一个新数组，其中包含第二个数组的键和第一个数组的值。

- **参数:**
  - `input` (Array): 要排列的数组。
  - `pbox` (Array): 用于排列的数组。
- **返回值:** 排列后的数组。

### `copy`

创建数组的副本。

- **参数:**
  - `input` (Array): 要复制的数组。
- **返回值:** 复制后的数组。

### `slice`

创建数组的切片。

- **参数:**
  - `input` (Array): 要切片的数组。
  - `start` (number): 切片的起始索引。
  - `stop` (number): 切片的结束索引。
- **返回值:** 切片后的数组。

---

## Stream

流是一种表示字节序列的数据结构。它用于以流方式存储和操作数据。

示例用法:

```lua
local stream = crypto.utils.stream

local str = "ao"
local arr = {97, 111}

stream.fromString(str) -- Stream
stream.toString(stream.fromString(str)) -- ao

stream.fromArray(arr) -- Stream
stream.toArray(stream.fromArray(arr)) -- {97, 111}

stream.fromHex("616f") -- Stream
stream.toHex(stream.fromHex("616f")) -- 616f
```

### `fromString`

从字符串创建流。

- **参数:**
  - `str` (string): 用于创建流的字符串。
- **返回值:** 用于创建流的字符串。

### `toString`

将流转换为字符串。

- **参数:**
  - `stream` (Stream): 要转换为字符串的流。
- **返回值:** 字符串形式的流。

### `fromArray`

从数组创建流。

- **参数:**
  - `arr` (Array): 用于创建流的数组。
- **返回值:** 从数组创建的流。

### `toArray`

将流转换为数组。

- **参数:**
  - `stream` (Stream): 要转换为数组的流。
- **返回值:** 数组形式的流。

### `fromHex`

从十六进制字符串创建流。

- **参数:**
  - `hex` (string): 用于创建流的十六进制字符串。
- **返回值:** 从十六进制字符串创建的流。

### `toHex`

将流转换为十六进制字符串。

- **参数:**
  - `stream` (Stream): 要转换为十六进制字符串的流。
- **返回值:** 十六进制字符串形式的流。

---

## 十六进制

示例用法:

```lua
local hex = crypto.utils.hex

hex.hexToString("616f") -- ao
hex.stringToHex("ao") -- 616f
```

### `hexToString`

将十六进制字符串转换为字符串。

- **参数:**
  - `hex` (string): 要转换为字符串的十六进制字符串。
- **返回值:** 字符串形式的十六进制字符串。

### `stringToHex`

将字符串转换为十六进制字符串。

- **参数:**
  - `str` (string): 要转换为十六进制字符串的字符串。
- **返回值:** 十六进制字符串形式的字符串。

---

## 队列

队列是一种表示元素序列的数据结构。它用于以先进先出 (FIFO) 的方式存储和操作数据。

示例用法:

```lua
local q = crypto.utils.queue()

q.push(1)
q.push(2)
q.pop() -- 1
q.size() -- 1
q.getHead() -- 2
q.getTail() -- 2
q.reset()
```

### `push`

将元素推入队列。

- **参数:**
  - `queue` (Queue): 要将元素推入的队列。
  - `element` (any): 要推入队列的元素。
- **返回值:** 无

### `pop`

从队列中弹出一个元素。

- **参数:**
  - `queue` (Queue): 要从中弹出元素的队列。
  - `element` (any): 要从队列中弹出的元素。
- **返回值:** 弹出的元素。

### `size`

返回队列的大小。

- **参数:** 无
- **返回值:** 队列的大小。

### `getHead`

返回队列的头部元素。

- **参数:** 无
- **返回值:** 队列的头部元素。

### `getTail`

返回队列的尾部元素。

- **参数:** 无
- **返回值:** 队列的尾部元素。

### `reset`

重置队列。

- **参数:** 无

---
