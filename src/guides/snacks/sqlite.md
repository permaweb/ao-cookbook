---
prev:
  text: "Guides"
  link: "/guides/index"

next: false
---

# Getting started with SQLite

SQLite is a relational database engine. In this guide, we will show how you can spawn a process with SQLite and work with data using a relational database.

## Setup

> NOTE: make sure you have aos installed, if not checkout [Welcome & Quick Start](/welcome/)

spawn a new process `mydb` with a `--sqlite` flag, this instructs ao to use the latest sqlite module.

```sh
aos mydb --sqlite
```

## Install AO Package Manager

installing apm, the ao package manager we can add helper modules to make it easier to work with sqlite.

```lua
.load-blueprint apm
```

## Install dbAdmin package

DbAdmin is a module that connects to a sqlite database and provides functions to work with sqlite.

https://apm_betteridea.g8way.io/pkg?id=@rakis/DbAdmin

```lua
apm.install('@rakis/dbAdmin')
```

## Create sqlite Database

```lua
local sqlite = require('lsqlite3')
Db = sqlite.open_memory()
dbAdmin = require('@rakis/DbAdmin').new(Db)
```

## Create Table

Create a table called Comments

```lua
dbAdmin:exec([[
  CREATE TABLE IF NOT EXISTS Comments (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Asset TEXT,
    User TEXT,
    Body TEXT
  );
]])
```

## Insert data

```lua
local SQL = "INSERT INTO Comments (Asset, User, Body) VALUES (?,?,?);"
dbAdmin:apply(SQL, {"dog.jpg", "Anon", "Nice Picture"})
```

## List data

```lua
local SQL = "SELECT * FROM Comments;"
dbAdmin:exec(SQL)
```

## Congrats!

You are using sqlite on AO 🎉
