# Better Auth サンプル

これは [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) でブートストラップされた [Next.js](https://nextjs.org) プロジェクトで、認証機能として [Better Auth](https://www.better-auth.com/) を統合しています。

## Better Auth セットアップ

このプロジェクトは、Next.jsアプリケーションでのBetter Authの完全なセットアップを実演しています。詳細なドキュメントについては、以下を参照してください: <https://www.better-auth.com/docs/installation>

### 1. パッケージのインストール

```bash
npm install better-auth
npm install better-sqlite3  # SQLiteデータベース用
npm install --save-dev @types/better-sqlite3  # TypeScript型定義
```

### 2. 環境変数の設定

プロジェクトのルートに `.env` ファイルを作成してください:

```env
BETTER_AUTH_SECRET=your-secret-key-here-replace-with-random-value
BETTER_AUTH_URL=http://localhost:3000
```

シークレットキーを生成:

```bash
openssl rand -hex 32
```

### 3. Better Auth インスタンスの作成

プロジェクトルートに `auth.ts` を作成:

```typescript
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // 必要に応じてソーシャルプロバイダーを追加
  },
});
```

### 4. データベーステーブルの作成

Better Auth CLIを使用して必要なデータベーステーブルを作成:

```bash
npx @better-auth/cli migrate
```

### 5. ハンドラーのマウント

`app/api/auth/[...all]/route.ts` にAPIルートハンドラーを作成:

```typescript
import { auth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

### 6. クライアントインスタンスの作成

`lib/auth-client.ts` にクライアントライブラリを作成:

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000"
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

### 7. 実装された機能

- ✅ メール/パスワード認証
- ✅ ユーザーサインアップ
- ✅ ユーザーサインイン
- ✅ ユーザーサインアウト
- ✅ セッション管理
- ✅ SQLiteデータベース統合

## 使い方

まず、開発サーバーを起動してください:

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて認証デモを確認してください。

以下のことができます:

1. 新しいアカウントでサインアップ（メール + パスワード + 名前）
2. 既存の認証情報でサインイン
3. ログイン時のセッション情報を表示
4. サインアウト

## プロジェクト構造

```text
├── auth.ts                     # Better Auth設定
├── lib/
│   └── auth-client.ts         # クライアントサイド認証ユーティリティ
├── app/
│   ├── api/auth/[...all]/
│   │   └── route.ts           # 認証用APIルート
│   ├── page.tsx               # 認証デモページ
│   └── layout.tsx             # ルートレイアウト
├── .env                       # 環境変数
└── sqlite.db                  # SQLiteデータベース（自動生成）
```

## 詳細情報

- [Better Auth ドキュメント](https://www.better-auth.com/docs)
- [Better Auth インストールガイド](https://www.better-auth.com/docs/installation)
- [Next.js ドキュメント](https://nextjs.org/docs)

## Vercelでのデプロイ

Next.jsアプリをデプロイする最も簡単な方法は、Next.jsの作成者による [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細については、[Next.js デプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) をご確認ください。
