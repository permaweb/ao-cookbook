# 获取游戏状态

现在你可以直接在终端中看到游戏公告，你可以更好地掌握游戏动态。 然而，这些展示仅限于游戏中发生的特定动作。

按需访问全面的游戏数据（例如所有玩家的位置、生命值和武力值）不是更有用吗？ 这些信息可以显着改善你的战略规划，帮助你更有效地评估威胁、机遇和时机。

如果你考虑往[上一篇指南](announcements)中创建的机器人添加另一个 handler，那就对了！

## 编写代码

返回到 `bot.lua` 文件并更新现有handler，如下所示：

```lua
Handlers.add(
  "HandleAnnouncements",
  Handlers.utils.hasMatchingTag("Action", "Announcement"),
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

对 handler 的调整包括：

- 重命名为 `"HandleAnnouncements"` 以反映其更广泛的作用。
- 添加额外操作来请求游戏更新状态。 该游戏旨在响应 `GetGameState` 动作标签。

当你收到公告打印件后，你可以在 `收件箱` 中查看最新消息，如下所示：

```lua
Inbox[#Inbox]
```

该消息的 `Data` 字段包含游戏的最新状态，其中包括：

- `GameMode` ：游戏是否处于 `Waiting` 或 `Playing` 状态。
- `TimeRemaining`：游戏开始或结束的剩余时间。
- `Players`：包含每个球员的统计数据（如位置、生命值和武力值）的表格。

但这可以更进一步，这样你不仅可以阅读，还可以将最新状态的信息用于其他自动化。

让我们定义一个存储最新状态的变量，如下所示：

```lua
LatestGameState = LatestGameState or nil
```

当你在终端中反复加载 `bot.lua` 文件时，该语法会保留变量的现有值，而不是覆盖它。 如果没有预先存在的值，则将 `nil` 值分配给该变量。

然后实现另一个 handler，如下所示：

```lua
-- 接收游戏状态信息后更新游戏状态的handler。
Handlers.add(
  "UpdateGameState",
  Handlers.utils.hasMatchingTag("Action", "GameState"),
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
    print("Game state updated. Print \'LatestGameState\' for detailed view.")
  end
)
```

来自前一个 handler 的游戏进程的响应有一个值为 `GameState` 的动作标签，可以帮助我们触发第二个handler。 触发后，handle 函数会加载内置的 `json` 包，该包将数据解析为 json 并将其存储在 `LatestGameState` 变量中。

该handler还会向你的进程发送一条消息，指示状态何时更新。 该功能的意义将在下一节中解释。

你可以在下面的下拉展开块中参考 `bot.lua` 的最新代码：

<details>
  <summary><strong>更新后的 bot.lua 文件</strong></summary>

```lua
LatestGameState = LatestGameState or nil

Handlers.add(
  "HandleAnnouncements",
  Handlers.utils.hasMatchingTag("Action", "Announcement"),
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)

Handlers.add(
  "UpdateGameState",
  Handlers.utils.hasMatchingTag("Action", "GameState"),
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
    print("Game state updated. Print \'LatestGameState\' for detailed view.")
  end
)
```

</details>

## 加载和测试

像往常一样，要测试这个新功能，请在 aos 玩家终端中加载文件，如下所示：

```lua
.load bot.lua
```

然后检查 `LatestStateVariable`，通过简单地传递其名称来查看它是否已正确更新，如下所示：

```lua
LatestGameState
```

通过实时访问游戏的最新状态，你的机器人可以做出明智的决定来决定你的下一步行动。 接下来，让我们尝试借助这些数据来自动化操作🚶
