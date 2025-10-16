# 準備

::: info
**目覚めの始まり:**

この世界には、あなたの手の届かないところにもっと多くのものがあることをずっと知っていました。あなたはそれを探し続けてきましたが、自分が何を探しているのかすら分かりませんでした。それは... `ao` です。

私たちの旅は `aos` クライアントをインストールし、新しいプロセスを開始することから始まります。これにより、ao コンピュータと対話し、チュートリアルの残りを完了することができるようになります。
:::

## ビデオチュートリアル

<iframe width="680" height="350" src="https://www.youtube.com/embed/nhMZup9uVBQ?si=Ex0W_G-PZA1I9rH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## システム要件

aos のローカルクライアントは非常に簡単にインストールできます。次の要件を満たしていることを確認してください：

- [NodeJS](https://nodejs.org) バージョン 20 以上（まだインストールしていない場合は、[このページ](https://nodejs.org/en/download/package-manager)をチェックして、あなたの OS に対する手順を見つけてください）。
- お好きなコードエディタ。

:::info
必須ではありませんが、`aos` との体験を最適化するために、好みのテキストエディタに [ao アドオン](../../references/editor-setup) をインストールすることをお勧めします。
:::

## aos のインストール

マシンに NodeJS がインストールされたら、あとは aos をインストールして実行するだけです：

<!-- # Preparations

::: info
**The Awakening Begins:**

You've always known there's more to this world, just outside of your reach. You've been searching for it, not even knowing what it was you were looking for. It... is `ao`.

We begin our journey by installing the `aos` client and starting a new process. This will allow us to interact with the ao computer and complete the rest of the tutorial.
:::

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/nhMZup9uVBQ?si=Ex0W_G-PZA1I9rH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## System requirements

The local client of aos is very simple to install. Just make sure you have:

- [NodeJS](https://nodejs.org) version 20+. (If you haven't yet installed it, check out [this page](https://nodejs.org/en/download/package-manager) to find instructions for your OS).
- A code editor of your choice.

:::info
Though it's not required, we do recommend installing the [ao addon](../../references/editor-setup) into your text editor of choice to optimize your experience with `aos`.
:::

## Installing aos

Once you have NodeJS on your machine, all you need to do is install aos and run it: -->

```sh
npm i -g https://get_ao.g8way.io
```

インストール後は、そのコマンドを実行するだけで新しい aos プロセスを開始できます！

<!-- After installation, we can simply run the command itself to start a new aos process! -->

```sh
aos
```

## ウサギの穴へようこそ

今始めたユーティリティはローカルクライアントで、aoコンピュータ内の新しいプロセスにメッセージを中継する準備が整っています。

接続が完了すると、次の内容が表示されます：

<!-- ## Welcome to the rabbit hole

The utility you just started is a local client, which is ready to relay messages for you to your new process inside the ao computer.

After it connects, you should see the following: -->

```sh
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

`aos` を実行した後の初期出力を見てみましょう：

![aos print](/aos-print.png)

ターミナルで `aos` を実行すると、次のような情報が表示されます：

- `AOS` の ASCII アート画像
- ウェルカムメッセージ
- 実行中の `aos` のバージョン
- インストラクショナルな終了メッセージ
- あなたのプロセスID

::: info
もしあなたのOSバージョンが最新バージョンと異なる場合、バージョンを更新するかどうかを尋ねるメッセージが表示されます。その場合は、"Ctrl+C" を2回押してプロセスを終了し、`npm i -g https://get_ao.g8way.io` を実行して更新し、再度 `aos` を実行してください。
:::

aoコンピュータの新しいホームへようこそ！今見ているプロンプトは、この分散型マシンのあなた自身の個人サーバーです。

さあ、[メッセージング](messaging)というaoの2つのコアコンセプトの1つを探求し、ウサギの穴をさらに深く進んでいきましょう。

<!--
Let's walk through the initial printout after running `aos`:

![aos print](/aos-print.png)

After running `aos` in your terminal, you should see:

- An ASCII art image of `AOS`.
- A Welcome Message
- The version of `aos` you are running.
- An instructional exit message.
- Your process ID.

::: info
If your OS version is different than the latest version, a message asking if you'd like to update the version will appear. If so, simply exit the process by pressing "Ctrl+C" twice, run `npm i -g https://get_ao.g8way.io` to update, and then run `aos` again.
:::

Welcome to your new home in the ao computer! The prompt you are now looking at is your own personal server in this decentralized machine.

Now, let's journey further down the rabbit hole by exploring one of the two core concept type of ao: [messaging](messaging). -->
