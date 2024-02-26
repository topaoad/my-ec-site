# 当リポジトリについて

最新のモダンスキルを使った EC サイトのフルスタックアプリケーションを作成するものです

## 実装内容

- Next.js + Supabase で認証機能、データベースとの CRUD を実装する
- Prisma を使った ORM、データベースのマイグレーション、シーディングを実装する
- スキーマ定義から型を生成することで、スキーマ駆動開発を実装する

## 技術選定

- Next.js 14
- TypeScript
- Tailwind CSS
- Auth.js／CLerk（認証機能・Google などのソーシャル認証を予定）
- Prizma（ORM）
- Jotai(状態管理)
- TanStackQuery（データフェッチ）
- Stripe（決済機能）
- MicroCMS（商品管理）
- SendGrid（お問い合わせや決済用の案内メール）
- jest/Cyperess（テスト）
- Algolia（検索機能）
- Mantine（UI コンポーネント）

## サイトイメージ

- 会員登録して商品を購入するサイト
- 購入履歴やカート機能を実装
- 管理者は Micro CMS 上から商品の登録、編集、削除ができる
- サブスクではなくワンショット型の商品を販売する

## 考慮しないこと

- 決済後の商品の配送、返品処理対応など（返金は Stripe で対応）

## 開発にあたっての目標

- 状態管理の Jotai を使った状態管理
- TanStackQuery を使ったデータフェッチ、状態管理の削減
- Stripe を使った決済
- お問い合わせなどの案内メールの実装
- UX/UI の向上
- テストの実装

## Prisma による ORM の管理メモ

- マイグレーションファイルを作成する（--name の後ろにファイル名）
  npx prisma migrate dev --name
- マイグレーションファイルを適用（本番環境適用時、他の人が作成したマイグレーションファイル適用）
  npx prisma migrate deploy
- seed.ts のレコードをテーブルに適用する
  npx prisma db seed
- マイグレーションファイルの作成なしにデータベースのテーブルを変更する（開発用。使用しなくても良い）
  npx prisma db push
- Prisma クライアントを生成する（型定義を生成する）※スキーマが更新されたタイミング
  npx prisma generate

## 参考サイト

### 全般

- [【個人開発】最新の Next.js+NextAuth.js+prisma+microCMS で EC サイト作ってみた【フルスタックアプリケーション】](https://qiita.com/mamimami0709/items/7ce5e26afea1fded0747)

### フォーム・バリデーション

- [React Hook Form と Zod の基本的な使い方](https://qiita.com/y-suzu/items/952d417f0853341a97df)
- [React Hook Form の基本を理解してフォームを作成してみよう](https://reffect.co.jp/react/react-hook-form#FormProvider)

### 認証

- [Clerk で"ラクラーク"に認証・認可周りを実装する](https://zenn.dev/msy/articles/a1ab4acef4c811#%E5%88%9D%E6%9C%9F%E8%A8%AD%E5%AE%9A)
- [Auth.js を完全に理解する (Next.js App Router 実装編) #2](https://qiita.com/kage1020/items/8224efd0f3557256c541#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

### 状態管理

- [jotai 公式](https://jotai.org/)
- [【Jotai】React の状態管理はコレで決まり！！](https://qiita.com/al_tarte/items/bfaefc34e9b0be91c72a)

### TanStackQuery

- [【Jotai】React の状態管理はコレで決まり！！](https://qiita.com/al_tarte/items/bfaefc34e9b0be91c72a)

### Prisma

- [TypeScript ORM「Prisma」のはじめかた](https://www.memory-lovers.blog/entry/2021/10/13/113000)

##
