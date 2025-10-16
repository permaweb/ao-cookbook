<!-- # A whistle stop tour of Lua.

Before we can explore ao in greater depth, let's take a moment to learn the basics of Lua: your companion for commanding aos processes.

Lua is a simple language with few surprises. If you know Javascript, it will feel like a simplified, purer version. If you are learning from-scratch, it will seem like a tiny language that focuses on the important stuff: Clean computation with sane syntax.

In this section we will cover the basics of Lua in just a few minutes. If you already know Lua, jump right through to the [next chapter]()

## Jumping back into your aos process.

For the purpose of this tutorial, we will be assuming that you have already completed the [Welcome & Quick Start](/welcome/) guide. If not, complete that first.

If you logged out of your process, you can always re-open it by running `aos` on your commandline, optionally specifying your key file with `--wallet [location]`.

## Basic Lua expressions.

In the remainder of this primer we will quickly run through Lua's core features and syntax.

Try out on the examples on your aos process as you go, or skip them if they are intuitive to you.

- **Basic arithmetic**: Try some basic arithmetic, like `5 + 3`. After processing, you will see the result `8`. `+`, `-`, `*`, `/`, and `^` all work as you might expect. `%` is the symbol that Lua uses for modulus.
- **Setting variables**: Type `a = 10` and press enter. This sets the variable `a` to 10. By convention (not enforced by the language), global variables start with a capital letter in Lua (for example `Handlers`).

- **Using variables**: Now type `a * 2`. You will see `20`returned on the command line.
- **String concatenation**: Say hello to yourself by executing `"Hello, " .. ao.id`.

## Experimenting with conditional statements. -->

# Luaの短期ツアー

aoをより深く探索する前に、Luaの基本を学びましょう。Luaは、aosプロセスを制御するためのコンパニオンです。

Luaはシンプルな言語で、驚くことは少ないです。もしJavascriptを知っているなら、Luaは簡潔で純粋なバージョンに感じるでしょう。もしゼロから学ぶ場合でも、Luaは重要な部分に焦点を当てた小さな言語であり、シンプルで分かりやすい構文で計算を行います。

このセクションでは、わずか数分でLuaの基本を紹介します。すでにLuaを知っている場合は[次の章]()に進んでください。

## aosプロセスに戻る

このチュートリアルでは、すでに[ようこそとクイックスタート](/welcome/)ガイドを完了していることを前提とします。まだ完了していない場合は、最初にそれを完了してください。

プロセスからログアウトしている場合は、コマンドラインで`aos`を実行することで再度開くことができます。必要に応じて、`--wallet [location]`を指定してキー ファイルを指定できます。

## Luaの基本式

この基本レクチャーの残りでは、Luaのコア機能と構文を簡単に紹介します。

例を実際にaosプロセスで試してみてください。直感的に理解できる場合は、スキップしてもかまいません。

- **基本的な算術**: `5 + 3`などの基本的な算術を試してください。処理後、結果は`8`と表示されます。`+`、`-`、`*`、`/`、`^`は期待通りに動作します。`%`はLuaでモジュラス（剰余）を表す記号です。
- **変数の設定**: `a = 10`と入力してEnterを押します。これで変数`a`に10が設定されます。慣習的に（言語で強制されているわけではありませんが）、Luaではグローバル変数は大文字で始まります（例：`Handlers`）。

- **変数の使用**: 次に`a * 2`と入力すると、コマンドラインに`20`が表示されます。
- **文字列の連結**: 自分に挨拶をしてみましょう。`"Hello, " .. ao.id`を実行します。

## 条件文の実験

- **If-Else**: ほとんどのプログラミング言語と同様に、Luaではif-elseブロックを使用して条件付きでコードを実行します。

  aosプロセスで`.editor`と入力してEnterキーを押します。これにより、コマンドラインインターフェイス内にインラインテキストエディタが開きます。

  ```lua
  aos_coolness = 9001
  if aos_coolness > 9000 then
      return "aos is coolness is over 9000!"
  else
      return "Oh. 🤷"
  end
  ```

  ターミナルでの編集が完了したら、新しい行に`.done`と入力してEnterを押します。これで編集モードが終了し、式がプロセスに送信されて評価されます。

  その結果、aosのクールさが9,000を超えていることがわかります。知っておいてよかったですね。

  Luaの`if`文には追加の`elseif [条件] then`ブロックを追加することもでき、条件付き実行の階層をより簡単に構築できます。

## Luaでのループ

Luaでは、コード内でループを作成するいくつかの方法があります。ここでは私たちのお気に入りの方法を紹介します。

- **While loops**:

  Start by initalizing your counter to zero by typing `n = 0` and pressing enter.

  Then open the inline editor again with `.editor` .

  ```lua
  while n < 5 do
    n = n + 1
  end
  ```

  新しい行に`.done`と入力してwhileループを実行します。ループの結果は、`n`と入力するだけで確認できます。

- **For loops**:

  Luaは、Pythonスタイルの`for`ループも実行できます。例えば、`.editor`を使用して次のコードブロックを入力します：

  ```lua
  for m = 1, 100 do
          n = n + m
  end
  ```

  `n`を再度実行して、変数の新しい値を確認します。

## Getting functional.

- **Define a function**:

  再び`.editor`を使用して、次の行を入力して送信します：

  ```lua
  function greeting(name)
      return "Hello, " .. name
  end
  ```

  送信すると、aosは`undefined`を返します。Luaでは、関数（および変数）の定義は値を返さないためです。

  Luaには「無名関数」や「高階関数」もあります。これにより、関数自体を通常のデータのように扱い、他の関数への引数として渡すことができます。次の例は無名関数を定義しており、上記の例と同等です：

  ```lua
  greeting =
  		function(name)
      	return "Hello, " .. name
  		end
  ```

- **Calling the function**: Call the function with `greeting("Earthling")`. aos will return `"Hello, Earthling"`.

<!--
## Defining deep objects with tables.

Tables are Lua's only compound data structure. They map `keys` to `values`, but can also be used like traditional arrays.

- **Create a simple table**: Type `ao_is = {"hyper", "parallel", "compute"}`to create a simple table.
- **Accessing the table's elements**: Access an element with `ao_is[2]`. aos will return `parallel`. Note: Indices in Lua start from 1!
- **Count a table's elements**: The size of a table in Lua is found with the operator `#`. For example, running `#ao_is` will return `3`.
- **Set a named element**: Type `ao_is["cool"] = true` to add a new named key to the table. Named elements can also be accessed with the `.` operator, for example `ao_is.cool`. -->

## テーブルを使って深いオブジェクトを定義

テーブルは、Luaにおける唯一の複合データ構造です。`keys`を`values`にマッピングしますが、従来の配列のようにも使用できます。

- **シンプルなテーブルを作成**: `ao_is = {"hyper", "parallel", "compute"}`と入力して、シンプルなテーブルを作成します。
- **テーブルの要素にアクセス**: `ao_is[2]`で要素にアクセスします。aosは`parallel`を返します。注意：Luaのインデックスは1から始まります！
- **テーブルの要素数をカウント**: Luaでテーブルのサイズを取得するには、演算子`#`を使用します。例えば、`#ao_is`を実行すると`3`が返されます。
- **名前付き要素を設定**: `ao_is["cool"] = true`と入力して、テーブルに新しい名前付きキーを追加します。名前付き要素は`.`演算子でもアクセスできます。例えば、`ao_is.cool`です。

<!-- ## Defining deep objects with tables.

Tables are Lua's only compound data structure. They map `keys` to `values`, but can also be used like traditional arrays.

- **Create a simple table**: Type `ao_is = {"hyper", "parallel", "compute"}`to create a simple table.
- **Accessing the table's elements**: Access an element with `ao_is[2]`. aos will return `parallel`. Note: Indices in Lua start from 1!
- **Count a table's elements**: The size of a table in Lua is found with the operator `#`. For example, running `#ao_is` will return `3`.
- **Set a named element**: Type `ao_is["cool"] = true` to add a new named key to the table. Named elements can also be accessed with the `.` operator, for example `ao_is.cool`. -->

## LuaのWats

aosは、シンプルでクリーンな言語であるためLuaを採用しています。経験豊富なプログラマーなら非常に短期間で習得でき、Robloxのようなビデオゲームで使用されていることから、初学者向けのプログラミング言語としても人気が高まっています。

それでもなお、Luaを初めて使う開発者がつまづきやすい点がいくつかあります。好みは人それぞれですが、以下にLuaの[wat](https://www.destroyallsoftware.com/talks/wat)を紹介します。

- **覚えておくべきこと**: テーブルのインデックスは0ではなく1から始まります！
- **覚えておくべきこと**: 「等しくない」は`!=`ではなく`~=`で表現されます。
- **覚えておくべきこと**: Luaではオブジェクトは「テーブル」と呼ばれ、一般的な名前とは異なります。

## さあ、始めましょう！

これで、Luaを使って素晴らしい分散プロセスを構築するために必要な知識はすべて手に入れました！次の章では、Luaとaosを使って並列プロセスの構築を始めます。

<!--
## Lua Wats.

aos uses Lua because it is a simple, clean language that most experienced programmers can learn very quickly, and is an increasingly popular first programming language, too, thanks to its use in video games like Roblox.

Nonetheless, there are a few things about the language that are prone to trip up rookie Lua builders. Tastes may vary, but here is our exhaustive list of Lua [wat](https://www.destroyallsoftware.com/talks/wat)s:

- **Remember:** Table indexing starts from 1 not 0!
- **Remember:** 'Not equals' is expressed with `~=`, rather than `!=` or similar.
- **Remember:** Objects in Lua are called 'tables', rather than their more common names.

## Let's go!

With this in mind, you now know everything you need in order to build awesome decentralized processes with Lua! In the next chapter we will begin to build parallel processes with Lua and aos. -->
