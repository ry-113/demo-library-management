⚠️**最初に必ず読んでください**
- 使用するGoogleアカウントには重要なものは使用しないでください。
- こちらはデモ版であり、ヘッダーのボタンからユーザロールを変更できます。（studentとinstructorのみ）

![トップページ](https://github.com/ry-113/demo-library-management/assets/149135859/7fa95f6b-1799-4a99-963c-c27c984fc14d)

## アプリ概要・使い方
### なんのアプリ？
**本の貸出システム（社内システム）**    
URL: [https://library-management-demo-7e0b1.web.app/](https://library-management-demo-7e0b1.web.app/)
### コンセプト
貸出システムの導入で、アナログな手続きによる手間を無くし、学習コミュニティをより活性化させる。
### 本アプリ開発の背景
私の通う職業訓練校では本の貸出が可能で、長期休みや放課後の学習において借りた本を活用することができます。しかし、その本の貸出はバインダーに挟まれた紙の表に訓練生が貸出日や返却予定日、本のタイトルを記入して、指導員がハンコを押して承認するという大変アナログなものでした。  

私自身、紙にいちいち記入して貸出を受けるのは億劫であまり利用していなかったのと、指導員の「承認するのが面倒で本当は紙でやりたくはない」というぼやきが開発のきっかけでした。  
### メイン機能
主要な機能一覧です。
1. ユーザー管理
2. 本の登録
3. 検索・閲覧
4. 貸出・返却
5. レビュー

#### 1. ユーザー管理
認証機能（共通）  

https://github.com/ry-113/demo-library-management/assets/149135859/619869fc-338f-4e1b-a49d-d9f3a1cddd9a  


ユーザー管理（管理者）  

https://github.com/ry-113/demo-library-management/assets/149135859/f2ca63c0-2778-41a1-ba4c-7afe87a77986
#### 2. 本の登録
本の追加・削除（指導員、管理者）

https://github.com/ry-113/demo-library-management/assets/149135859/062b1f0d-0387-4514-91b4-a9c2b7aa0ef7  

本の編集①（指導員、管理者）

https://github.com/ry-113/demo-library-management/assets/149135859/add8085c-8780-4e3a-9964-647f9e42a6b0  

本の編集②（指導員、管理者）

https://github.com/ry-113/demo-library-management/assets/149135859/dd2db3e3-3dd7-4bcd-bd16-7d481aff14d6  
#### 3. 検索・閲覧
検索から本の詳細ページへ（共通）  

https://github.com/ry-113/demo-library-management/assets/149135859/9e272aeb-7379-422d-9122-91aa34f098b1  

絞り込みやソート、ラベル検索など（共通）

https://github.com/ry-113/demo-library-management/assets/149135859/794542e4-a705-4da8-a310-bbdd55ffe76b

#### 4. 貸出・返却
貸出リクエスト（学生）  

https://github.com/ry-113/demo-library-management/assets/149135859/03bee1be-b0ad-496a-a5d5-aff0fe6e9e94  

貸出リクエスト承認（指導員）

https://github.com/ry-113/demo-library-management/assets/149135859/daf986f4-6bf9-45c1-afef-6ffe484de498  

返却リクエスト（学生）

https://github.com/ry-113/demo-library-management/assets/149135859/724e277d-fc4f-4cd5-b809-f70d55f01db0  

返却リクエスト承認（指導員）  

https://github.com/ry-113/demo-library-management/assets/149135859/89ba26a0-5927-4f13-aceb-69a0a42f2359
#### 5. レビュー
レビュー投稿・閲覧（共通） 

https://github.com/ry-113/demo-library-management/assets/149135859/5ab3ea97-56fa-49a8-97fc-395d125a14e2  

レビュー編集（共通）

https://github.com/ry-113/demo-library-management/assets/149135859/9c6ffe84-24d5-471c-8bfb-43ffde1f1bdc


## 設計・デザイン
### ページ設計
```  
├── pages/
│   ├── index.vue
│   ├── firstsettings/
│   │   ├── index.vue
│   │   └── welcome.vue
│   ├── mypage/
│   │   ├── [uid].vue
│   │   └── [uid]-review.vue
│   ├── books/
│   │   ├── search.vue
│   │   ├── index.vue
│   │   ├── [genre].vue
│   │   └── [bookid]-detail.vue
│   ├── student/
│   │   └── transaction-[uid].vue
│   ├── instructor/
│   │   ├── database.vue
│   │   └── transaction.vue
│   ├── admin/
│   │   └── user-management.vue
```

### プロトタイプ制作
Figmaでプロトタイプを制作しました。  
ここでアプリのページデザインやレイアウト、ページ遷移のイメージを固めました。

![figmaデザイン](https://github.com/ry-113/demo-library-management/assets/149135859/00af442b-64c7-4455-b15e-9ce3c37f9990)
### Firestore設計
今回データベースはFirestoreを採用しています。コレクションとドキュメントという単位で構成されているNoSQLのデータベースです。  
以下にデータベースの概要を書きます。

1. **users**
   - ユーザー情報が格納されるコレクションです。
     - ドキュメント: 各ユーザーの一意のIDがドキュメント名となります。
       - `name`: 表示名
       - `email`: メールアドレス
       - `photo`: プロフィール画像
       - `role`: タイプ（student | instructor | admin）
       - `uid`: ドキュメント名と同じくユーザーのID

2. **books**
   - 登録された本が格納されるコレクションです。
     - ドキュメント: 各本の一意のIDがドキュメント名となります。
       - `bookid`: ドキュメント名と同じく本のID
       - `ISBN`: 本のISBN
       - `title`: 本のタイトル
       - `author`: 本の著者
       - `genre`: 本のジャンル
       - `year`: 出版年
       - `stock`: 本の在庫数
       - `imageURL`: cloud storageに保存した本の表紙画像のURL
       - `rating`: 口コミ評価
       - `description`: 本の概要説明文
       - `labels`: 本の登録時に設定されたラベル

3. **transactions**
   - 貸出・返却のリクエストや承認などの取引が格納されるコレクションです。
     - ドキュメント: 各トランザクションの一意のIDがドキュメント名となります。
       - `transactionid`: ドキュメント名と同じくトランザクションのID
       - `bookid`: 取引対象の本のID
       - `bookTitle`: 取引対象の本のタイトル
       - `uid`: 取引を開始したユーザーのID
       - `userName`: 取引を開始したユーザーの表示名
       - `userPhoto`: 取引を開始したユーザーのプロフィール画像
       - `nowdate`: 取引が作成、更新された時間
       - `duedate`: 本の返却期限  

4. **reviews**
   - アプリ上の全てのレビューが格納されるコレクションです。
     - ドキュメント: 各レビューの一意のIDがドキュメント名となります。
       - `reviewid`: ドキュメント名と同じくレビューのID
       - `bookid`: レビュー対象の本のID
       - `timestamp`: レビューの投稿時間
       - `uid`: レビューを投稿したユーザーのID
       - `username`: レビューを投稿したユーザーの表示名
       - `photo`: レビューを投稿したユーザーのプロフィール画像
       - `rating`: 評価点数
       - `title`: レビュータイトル
       - `description`: レビュー本文  

5. **genres**
   - 指導員が追加した本のジャンルを格納するコレクションです。
     - ドキュメント: 各ジャンルの一意のIDがドキュメント名となります。
       - `genreid`: ドキュメント名と同じくジャンルのID
       - `name`: ジャンルの名前  

6. **labels**
   - 指導員が追加した本のラベルを格納するコレクションです。
     - ドキュメント: 各ラベルの一意のIDがドキュメント名となります。
       - `labelid`: ドキュメント名と同じくラベルのID
       - `name`: ラベルの名前
       - `color`: ラベルの背景色
       - `isChecked`: ラベルが選択されたかどうかを判定するフラグ


## 主な使用技術
表形式で技術をまとめる

| カテゴリ        | 技術                    | 概要                                                                     |
|-----------------|-------------------------|--------------------------------------------------------------------------|
| フロントエンド  | Vue3                    | UI構築のためのJavaScriptフレームワーク。Composition APIのscript setup記法。 |
|                 | Nuxt3                   | Vue3がベースのフレームワーク。ルーティングやストアなどを簡単に使用できる |
|                 | TypeScript              | JavaScriptに静的型付け機能が付いた言語。 |
| UIデザイン      | Tailwind CSS            | ユーティリティクラスを付与してスタイリングするcssフレームワーク |
|                 | daisyUI                 | Tailwind CSSがベースのUIライブラリ。tailwindと同じくクラス名を付与してスタイリング |
|                 | Vue Datepicker          | Vue3で使える日付選択カレンダーを設置できるライブラリ。 |
|                 | vue3-carousel           | Vue3で使えるカルーセルを設置できるライブラリ。|
| データベース    | Firestore               | Firebaseが提供するデータベース機能。NoSQLのドキュメント指向型DB |
| 認証            | Firebase Authentication | Firebaseが提供する認証機能。メールアドレス、各種プロバイダで利用可能 |
| ストレージ      | Cloud Storage           | Firebaseが提供するストレージ機能。画像などのデータをクラウドストレージに保存できる|
| ホスティング    | Firebase Hosting        | Firebaseが提供するホスティング機能。Firebaseの各種機能を統合してすぐにホスティングできる |
| 全文検索        | Algolia                 | 高度な検索エンジンをwebアプリケーションに簡単に統合できる全文検索サービス |
| ビルドツール    | Vite                    | 従来のビルドツールの課題や問題点を改善し、モダンな開発環境に対応した新しいビルドツール |
| バージョン管理  | Git, Github             | 開発ソースのバージョン管理ツール |



## 工夫した点
#### Firestoreのクエリ回数を制限
Firestoreのクエリ回数を制限して、無料枠での運用を目指しました。本来はCloud Functionsなどでキャッシュを利用するのがよいですが、今回は簡易的に実装するためセッションストレージ、ローカルストレージを利用しました。  

Firestoreからデータを取得するコードはページがマウントされた時に走りますが、不用意に何度もページを往来するとすぐに無料枠を超えてしまうため、ローカルストレージを使って10分に1回取得、30分に1回取得などのようにデータ取得に制限をかけました。
#### インデックス、バッチ処理、トランザクション処理の使用
Firestoreのインデックス機能を使って、データを新しい順に取得したり、20件まで取得して追加フェッチするなどユースケースに合わせて適切な実装をすることを心掛けました。
また、一度に複数のドキュメントを削除する際はバッチ処理、一連の流れでエラー時にロールバックしたいときはトランザクション処理を使うなど、データベースに矛盾が生じないように気をつけました。
#### FirebaseやAlgoliaなどの外部サービス連携ロジックを切り離す
FirestoreやCloud Storage、Algolia等の外部サービスに接続するビジネスロジックはNuxt3のcomposableディレクトリにまとめて、アプリ全体で呼び出すことで再利用性、可読性が高くなりました。
#### Vueのリアクティブシステムを使ったUI構築
Vueのリアクティブシステムのrefやcomputed等を使ってユーザーのアクションに対して対話的なUIを作ることが出来ました。例えば、本の登録、レビュー投稿などのCRUD操作のほとんどがアクション後に即座に画面に反映されます。また、本のラベルを登録するときには、ラベル名と色を選ぶとプレビューが表示されるなど、ユーザーが使いやすいUIにこだわりました。

## 苦労した点
#### 初めて使う技術が多く、ドキュメントを読みながらの実装となった
今回、FirebaseやAlgoliaなど初めて使う技術が多く、ドキュメントを読んで勉強しながらの実装となりました。結果的に、一貫性のない実装になってしまったところやパフォーマンスが悪い実装の仕方をしているところもあるかと思います。今回学んだことをさらに飛躍させて技術力を高めていきたいと思います。
#### UIライブラリのカスタマイズ
ライブラリで設置したカレンダーやカルーセルの機能とデザインをカスタムしたいときに思うようにスタイルがオーバーライドされなかったり、ドキュメントから欲しい機能を探してくるのが時間がかかってしまいました。カスタム性が高く、簡単にできるUIライブラリを選定することも重要だと学びました。
#### 修正時の影響範囲がわかりにくく、修正漏れが発生
今回の反省点として、コンポーネントの粒度が高く再利用性が低くなってしまったことがあります。似たコードが重複したり、複雑に絡み修正漏れが発生することがしばしばありました。修正時の影響範囲がどこまでなのか明確なコードにしつつ、その範囲を狭めていけるようなコードを意識したいです。

## 今後の展望
- PHP、Laravelなどのバックエンド技術、SQLを使ったDB操作を学ぶ
- Reactなどの他のフロントエンドフレームワークを学ぶ
- 基本情報技術者試験の合格を目指す
