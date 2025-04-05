# フロントエンド試験

このリポジトリはフロントエンドコーディング試験の課題提出用のリポジトリです。

## 課題

URL：https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d

## 取り組んだ期間と実際の作業時間

2025/3/24(月)〜4/6(日)、約トータル25時間
(至らない点が多々あると思います。テストコードについてはほとんどできておりません。)

## 必要な環境

- Node.js
- npm または yarn

## セットアップ手順

このアプリケーションをローカルで実行するための手順は以下のとおりです。

### 1. リポジトリをクローン

```
git clone https://github.com/Ryotaro-Mabuchi/front_end_test.git
cd front_end_test
```

### 2. 必要なパッケージをインストール

npm または yarn を使用して依存関係をインストールします。

`npm install`
または
`yarn install`

### 3.環境変数の設定

プロジェクトのルートに.envファイルを作成し、API_KEYを設定してください。

```
REACT_APP_API_KEY=api_key
```

api_keyを実際のAPIキーに置き換えてください。

### 4.ローカルでの動作確認

開発サーバーを起動し、アプリケーションをローカル環境で実行できます。

`npm start`
または
`yarn start`
その後、ブラウザで http://localhost:3000 にアクセスして、アプリケーションを確認できます。
