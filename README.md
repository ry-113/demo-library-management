![トップページ](https://github.com/ry-113/demo-library-management/assets/149135859/7fa95f6b-1799-4a99-963c-c27c984fc14d)

## アプリ概要・使い方
### なんのアプリ？
本の貸出システム（社内システム）  
URL:[https://library-management-demo-7e0b1.web.app/](https://library-management-demo-7e0b1.web.app/)
### コンセプト
貸出システムの導入で、アナログな手続きによる手間を無くし、学習コミュニティをより活性化させる。
### 本アプリ開発の背景
私の通う職業訓練校では本の貸出が可能で、長期休みや放課後の学習において借りた本を活用することができます。しかし、その本の貸出はバインダーに挟まれた紙の表に訓練生が貸出日や返却予定日、本のタイトルを記入して、指導員がハンコを押して承認するという大変アナログなものでした。  

私自身、紙にいちいち記入して貸出を受けるのは億劫であまり利用していなかったのと、指導員の「承認するのが面倒で本当は紙でやりたくはない」というぼやきが開発のきっかけでした。  
### メイン機能
主要な機能一覧です。
1. ユーザー認証
2. 本の登録
3. 検索・閲覧
4. 貸出・返却
5. レビュー

動画で機能とイメージを表現
#### 1. ユーザー認証
#### 2. 本の登録
#### 3. 検索・閲覧
#### 4. 貸出・返却
#### 5. レビュー

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

(Figmaのスクリーンショットを載せる)
### Firestore設計
firestoreの構成をツリーで表す

## 主な使用技術
表形式で技術をまとめる

## 工夫した点
### Firestoreのクエリ回数を制限
### インデックス、バッチ処理、トランザクション処理の使用
### FirebaseやAlgoliaなどの外部サービス連携ロジックを切り離す
### Vueのリアクティブシステムを使ったUI構築

## 苦労した点
### 初めて使う技術が多く、ドキュメントを読みながらの実装となった
### UIライブラリのカスタマイズ
### 修正時の影響範囲がわかりにくく、修正漏れが発生

## 今後の展望
