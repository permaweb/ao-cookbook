<!-- # Get started in 5 minutes -->

# 5分で始める

<!-- In less than 5 mins, we'll walk you through the process of taking your first peek into the rabbit hole. 🕳️🐇 -->

5分以内で、私たちはあなたを不思議な世界へとご案内します。🕳️🐇

<!-- ## System requirements -->

## システム要件

<!-- The local client of aos is super simple to install. Just make sure you have: -->

aosのローカルクライアントのインストールは非常にシンプルです。次の要件を満たしていれば準備完了です。

- [NodeJS](https://nodejs.org) version 20+. (まだインストールしていない場合は、 [このページ](https://nodejs.org/en/download/package-manager) からOSごとのインストール方法を確認してください。).
- 好きなコードエディタ

## Installing aos

<!-- Once you have NodeJS on your machine, all you need to do is install aos and run it: -->

NodeJSがマシンにインストールされていれば、あとはaosをインストールして実行するだけです。

```sh
npm i -g https://get_ao.g8way.io
```

<!-- After installation, we can simply run the command itself to start a new aos process! -->

インストールが完了したら、コマンドを実行するだけで新しいaosプロセスを開始できます！

```sh
aos
```

<!-- You authenticate yourself to your aos process using a keyfile. If you have an Arweave wallet you can specify it by adding a `--wallet [location]` flag. If you don't, a new keyfile will be generated and stored locally for you at `~/.aos.json`. -->

aosプロセスへの認証は、キーファイルを使用して行います。もしArweaveウォレットを持っている場合は、--wallet [location] フラグを追加して指定できます。ウォレットを持っていない場合は、新しいキー・ファイルが生成され、~/.aos.json にローカルで保存されます。

<!-- ## Welcome to the rabbit hole -->

## うさぎの穴へようこそ

<!-- The utility you just started is a local client, which is ready to relay messages for you to your new process inside the ao computer. -->

今起動したユーティリティはローカルクライアントであり、aoコンピュータ内の新しいプロセスにメッセージを中継する準備ができています。

<!-- After it connects, you should see the following: -->

接続が完了すると、次のような表示が見えるはずです：

```lua
          _____                   _______                   _____
         /\    \                 /::\    \                 /\    \
        /::\    \               /::::\    \               /::\    \
       /::::\    \             /::::::\    \             /::::\    \
      /::::::\    \           /::::::::\    \           /::::::\    \
     /:::/\:::\    \         /:::/~~\:::\    \         /:::/\:::\    \
    /:::/__\:::\    \       /:::/    \:::\    \       /:::/__\:::\    \
   /::::\   \:::\    \     /:::/    / \:::\    \      \:::\   \:::\    \
  /::::::\   \:::\    \   /:::/____/   \:::\____\   ___\:::\   \:::\    \
 /:::/\:::\   \:::\    \ |:::|    |     |:::|    | /\   \:::\   \:::\    \
/:::/  \:::\   \:::\____\|:::|____|     |:::|    |/::\   \:::\   \:::\____\
\::/    \:::\  /:::/    / \:::\    \   /:::/    / \:::\   \:::\   \::/    /
 \/____/ \:::\/:::/    /   \:::\    \ /:::/    /   \:::\   \:::\   \/____/
          \::::::/    /     \:::\    /:::/    /     \:::\   \:::\    \
           \::::/    /       \:::\__/:::/    /       \:::\   \:::\____\
           /:::/    /         \::::::::/    /         \:::\  /:::/    /
          /:::/    /           \::::::/    /           \:::\/:::/    /
         /:::/    /             \::::/    /             \::::::/    /
        /:::/    /               \::/____/               \::::/    /
        \::/    /                 ~~                      \::/    /
         \/____/                                           \/____/

Welcome to AOS: Your operating system for AO, the decentralized open
access supercomputer.

Type ".load-blueprint chat" to join the community chat and ask questions!

AOS Client Version: 2.0.9
Type "Ctrl-C" twice to exit

Your AOS process:  QFt5SR6UwJSCnmgnROq62-W8KGY9z96k1oExgn4uAzk

default@aos-0.2.2[Inbox:1]>
```

<!-- Welcome to your new home in the ao computer! The prompt you are now looking at is your own personal server in this decentralized machine. We will be using it to play with and explore ao in the rest of this tutorial. -->

aoコンピュータ内の新しいホームへようこそ！現在表示されているプロンプトは、この分散型マシン内に存在するあなた専用のサーバーです。このチュートリアルの残りの部分では、このサーバーを使ってaoを探索し、操作していきます。

<!-- ## Sending your first command -->

## 最初のコマンドを送信する

<!-- Your new personal aos process is a server that lives inside the computer, waiting to receive and execute your commands. -->

新しいパーソナルaosプロセスは、コンピュータ内に存在するサーバーであり、あなたのコマンドを受信して実行する準備が整っています。

<!-- aos loves to make things simple, so it wants to hear commands from you in the Lua programming language. Don't know Lua? Don't panic! It is a super straightforward, friendly, and fun language. We will learn it as we progress through this series. -->

aosはシンプルさを重視しているため、Luaプログラミング言語でのコマンド入力を求めています。Luaを知らない？心配無用です！とてもシンプルで親しみやすく、楽しい言語です。このシリーズを通して一緒に学んでいきましょう。

<!-- Let's break the ice and type: -->

まずは簡単に始めましょう。次のコマンドを入力してください：

```lua
aos> "Hello, ao!"
```

<!-- Then hit the "[Enter]" key. You should see your shell sign and post the message, request the result, then print the result as follows: -->

その後、「[Enter]」キーを押してください。シェルサインが表示され、メッセージが送信され、結果がリクエストされ、次のように結果が表示されるはずです：

```lua
"Hello, ao!"
```

<!-- ## Eh. What's the big deal? -->

## それで？何がすごいの？

<!-- Sent it a message to your process, permanently etched it into Arweave, then asked a distributed compute network to calculate its result. -->

あなたのプロセスにメッセージを送り、それがArweaveに永久に刻まれた後、分散計算ネットワークにその結果を計算させました。

<!-- While the result might not _look_ revolutionary, in reality you have done something quite extraordinary. Your process is a _decentralized_ server that doesn't exist in any one particular place on Earth. It exists as data, replicated on Arweave between many different machines, distributed all over the world. If you wanted to, you could now attach a new compute unit to this process and recreate the state from its log of inputs (just your single command, for now) -- at any time in the future. -->

結果自体は*革命的*に見えないかもしれませんが、実際には非常に特別なことを成し遂げました。あなたのプロセスは、地球上のどこか特定の場所に存在するわけではなく、*分散型*サーバーです。データとして存在し、Arweave上で多くの異なるマシンに複製され、世界中に分散されています。もし望むなら、このプロセスに新しい計算ユニットを接続し、入力ログ（現時点ではあなたの一つのコマンドだけですが）から状態を再現することが、将来いつでも可能です。

<!-- This makes your new shell process... -->

これにより、新しいシェルプロセスは次のような性質を持っています…

<!-- - **Resilient**: There is no single place on Earth where your server actually resides. It is everywhere and nowhere -- immune from physical destruction or tampering of any kind.
- **Permanent**: Your process will never dissappear. It will always exist in its [✨holographic state✨ ](/concepts/holographic-state) on Arweave, allowing you to recall it and continue playing with it. A contribution has been made to Arweave's storage endowment, so that you never have to think about upkeep or maintainance payments again.
- **Permissionless**: You did not have to register in order to start this server. Your right to use it is guaranteed by its underlying protocol (Arweave), no matter what Google, Amazon, or any other BigTech company says.
- **Trustless**: The state of your server is _mathematically guaranteed_. This means that you -- and everyone else -- can trust it with certainty, without even having to trust the underlying hardware it runs on. This property lets you build trustless _services_ on top: Code that runs without any priveliged owner or controller, ruled purely by math.

There is so much more to it, but these are the basics. Welcome to the ao computer, newbie! We are grateful to have you. 🫡 -->

- **強靭性**: サーバーが実際に存在する場所は地球上のどこにもありません。それはあらゆる場所に存在し、どこにも存在しません――物理的な破壊や改ざんから完全に免れています。
- **永続性**: あなたのプロセスは決して消えることがありません。Arweave上で常に✨ホログラフィック状態✨として存在し、いつでも呼び出して再び操作を続けることができます。Arweaveのストレージ基金に対する貢献がなされているため、保守や維持費用を心配する必要もありません。
- **許可不要**: このサーバーを開始するために登録は不要です。あなたの利用権は、GoogleやAmazon、その他の大手IT企業が何を言おうとも、基盤となるプロトコル（Arweave）によって保証されています。
- **信頼不要**: サーバーの状態は*数学的に保証*されています。これにより、あなたや他の誰もが、そのサーバーを確実に信頼することができます。基盤となるハードウェアを信頼する必要さえありません。この特性により、信頼不要な*サービス*を構築することが可能になります。特定の所有者や管理者が存在せず、純粋に数学によって支配されるコードが実行されます。

まだまだたくさんありますが、これが基本です。aoコンピュータへようこそ、新人さん！お迎えできて嬉しいです。🫡

<!-- ## Next Steps -->

## 次のステップ

<!-- In the tutorials that follow, we will explore ao and build everything from chatrooms to autonomous, decentralized bots. Let's go! -->

今後のチュートリアルでは、aoを探索し、チャットルームから自律的かつ分散型のボットまで、さまざまなものを構築していきます。さあ、始めましょう！
