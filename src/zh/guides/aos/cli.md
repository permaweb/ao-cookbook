# CLI

这里有一些命令参数来与 aos 进行交互：

- [name] - 使用你的钱包地址创建或者加载一个进程
- --load [file] - 加载一个文件，可以多次调用
- --cron [interval] - 只在创建进程的时候使用
- --wallet [walletfile] - 使用一个指定的钱包

## 使用 aos 管理多进程

```sh
aos
```

使用默认`default`名称创建或者连接到进程

```sh
aos chatroom
```

使用 `chatroom` 创建或者连接进程

```sh
aos treasureRoom
```

使用 `treasureRoom` 创建或者连接进程

## load 标志

```sh
aos treasureRoom --load greeting.lua --load treasure.lua --load puzzle.lua
```

可以使用 `load` 标志来加载一个或者多个代码文件到我的进程

## CRON 标志

如果你想让进程创建定时响应函数，需要在创建进程是调用 `cron` 标志

```sh
aos chatroom --cron 2-minutes
```

## Tag 标志

使用 tag 标志，你可以为进程创建用户标识。（例如将它们用作静态环境变量）:

```sh
aos chatroom --tag-name Chat-Theme --tag-value Dark --tag-name Chat-Name --tag-value Mychat
```

上面的命令会在你创建进程的时候添加用户定义标识

```ts
// process data item tags
[
  ...
  { name: "Chat-Theme", value: "Dark" },
  { name: "Chat-Name", value: "Mychat" }
  ...
]
```
