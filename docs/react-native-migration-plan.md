# ECサイト React Native 移行計画

## 📋 プロジェクト概要

このドキュメントは、Next.js 14ベースのECサイトをReact Native(Expo)のネイティブモバイルアプリケーションに移行するための包括的な計画書です。

### 現在のプロジェクト構成

- **フレームワーク**: Next.js 14.1.0 (App Router)
- **言語**: TypeScript 5
- **総コード量**: 約2,051行 (46ファイル)
- **主要機能**:
  - OAuth認証 (Google/LINE)
  - 商品閲覧・検索
  - カート機能
  - お気に入り機能
  - Stripe決済
  - MicroCMS連携

---

## 🎯 移行目標

1. **モバイルファースト**: iOS/Androidネイティブアプリとして動作
2. **コードの再利用**: 既存のビジネスロジック・API連携を最大限活用
3. **UXの向上**: ネイティブUIコンポーネントによる滑らかな操作感
4. **技術スタックの継続性**: 可能な限り既存ライブラリを活用

---

## 🔄 技術スタック比較

### 継続利用可能

| カテゴリ | ライブラリ | React Native対応 |
|---------|-----------|-----------------|
| 状態管理 | Jotai 2.6.5 | ✅ 完全対応 |
| データフェッチ | TanStack Query 5.24.1 | ✅ 完全対応 |
| スキーマ管理 | Zod 3.22.4 | ✅ 完全対応 |
| 日付処理 | Day.js 1.11.10 | ✅ 完全対応 |
| 決済 | Stripe | ✅ RN SDK提供 |
| CMS | MicroCMS SDK 2.7.0 | ✅ HTTP通信対応 |
| テスト | Jest + Testing Library | ✅ RN版あり |

### 代替が必要

| カテゴリ | 現在 | React Native代替案 |
|---------|------|------------------|
| フレームワーク | Next.js 14 | **Expo SDK 51+** |
| UIライブラリ | Mantine + shadcn/ui | **React Native Paper** / NativeBase / UI Kitten |
| スタイリング | Tailwind CSS | **NativeWind** / StyleSheet |
| ルーティング | Next.js App Router | **Expo Router** / React Navigation v6 |
| 認証 | NextAuth.js | **expo-auth-session** + OAuth2 |
| ストレージ | LocalStorage | **AsyncStorage** / expo-secure-store |
| 画像 | next/image | **expo-image** / react-native-fast-image |
| アイコン | Lucide React | **@expo/vector-icons** |

---

## 🏗️ アーキテクチャ設計

### アプリケーション構成

```
┌─────────────────────────────────────┐
│   React Native (Expo)               │
│   ┌─────────────────────────────┐   │
│   │  UI Layer                   │   │
│   │  - Expo Router              │   │
│   │  - React Native Paper       │   │
│   │  - NativeWind               │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │  State Management           │   │
│   │  - Jotai (グローバル状態)     │   │
│   │  - TanStack Query (サーバー)  │   │
│   │  - AsyncStorage (永続化)     │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │  Business Logic             │   │
│   │  - カートロジック             │   │
│   │  - お気に入りロジック          │   │
│   │  - 商品フィルタリング          │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
              ↕ HTTP/REST
┌─────────────────────────────────────┐
│   Backend Services (継続利用)         │
│   ┌─────────────────────────────┐   │
│   │  Next.js API Routes         │   │
│   │  - /api/auth/[...nextauth]  │   │
│   │  - /api/user                │   │
│   │  - /api/favorites           │   │
│   │  - /api/[id]/checkout       │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │  External APIs              │   │
│   │  - MicroCMS (商品データ)      │   │
│   │  - Stripe (決済)             │   │
│   │  - Google/LINE OAuth        │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │  Database                   │   │
│   │  - PostgreSQL + Prisma      │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### ディレクトリ構成（React Nativeアプリ）

```
mobile-app/
├── app/                        # Expo Router (ファイルベース)
│   ├── (auth)/
│   │   ├── signin.tsx          # サインイン画面
│   │   └── signup.tsx          # サインアップ画面
│   ├── (tabs)/                 # タブナビゲーション
│   │   ├── index.tsx           # ホーム（商品一覧）
│   │   ├── cart.tsx            # カート
│   │   ├── favorites.tsx       # お気に入り
│   │   └── profile.tsx         # プロフィール
│   ├── products/
│   │   └── [id].tsx            # 商品詳細
│   ├── checkout.tsx            # チェックアウト
│   └── _layout.tsx             # ルートレイアウト
├── components/
│   ├── ui/                     # UIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Toast.tsx
│   ├── products/               # 商品関連
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   └── ProductFilter.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   └── layouts/
│       ├── Header.tsx
│       └── TabBar.tsx
├── services/                   # API通信
│   ├── api/
│   │   ├── products.ts         # MicroCMS
│   │   ├── auth.ts             # 認証
│   │   ├── favorites.ts        # お気に入り
│   │   └── checkout.ts         # 決済
│   └── storage/
│       ├── cart.ts             # AsyncStorage
│       └── favorites.ts
├── store/                      # Jotai atoms
│   ├── userAtom.ts
│   ├── cartAtom.ts
│   └── favoritesAtom.ts
├── hooks/                      # カスタムフック
│   ├── useProducts.ts          # TanStack Query
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useFavorites.ts
├── types/                      # 型定義
│   ├── product.ts
│   ├── user.ts
│   └── order.ts
├── utils/                      # ユーティリティ
│   ├── validation.ts           # Zod
│   └── format.ts
├── constants/
│   └── config.ts               # API URL等
├── app.json                    # Expo設定
├── package.json
└── tsconfig.json
```

---

## 📝 移行プロセス（フェーズ別）

### Phase 0: 環境構築

#### 0-1. Expoプロジェクト初期化

```bash
# Expo CLIのインストール（グローバル）
npm install -g expo-cli

# プロジェクト作成
npx create-expo-app mobile-app --template expo-template-blank-typescript

# ディレクトリ移動
cd mobile-app
```

#### 0-2. Expo Routerセットアップ

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

**package.json更新:**
```json
{
  "main": "expo-router/entry"
}
```

#### 0-3. 必須ライブラリインストール

```bash
# UIライブラリ
npx expo install react-native-paper react-native-vector-icons
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# 状態管理・データフェッチ（既存継続）
npm install jotai@2.6.5
npm install @tanstack/react-query@5.24.1

# ストレージ
npx expo install @react-native-async-storage/async-storage
npx expo install expo-secure-store

# 認証
npx expo install expo-auth-session expo-web-browser

# 画像
npx expo install expo-image

# その他
npm install zod@3.22.4
npm install dayjs@1.11.10
npm install axios
```

#### 0-4. 開発環境設定

```bash
# .env設定
cp .env.example .env

# ESLint/Prettier
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier

# テスト環境
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```

---

### Phase 1: 基盤実装

#### 1-1. ルーティングセットアップ

**実装ファイル:**
- `app/_layout.tsx` - ルートレイアウト、プロバイダー設定
- `app/(tabs)/_layout.tsx` - タブナビゲーション
- `app/(auth)/_layout.tsx` - 認証フロー

**タスク:**
- Expo Routerのファイルベースルーティング設定
- ナビゲーションスタック構築（タブ/スタック併用）
- ディープリンク設定（商品詳細等）

#### 1-2. UIライブラリセットアップ

**実装ファイル:**
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/Badge.tsx`
- `theme/index.ts` - React Native Paperテーマ

**タスク:**
- React Native Paper のカスタムテーマ作成
- NativeWindのTailwind設定
- 共通UIコンポーネント実装
- ダークモード対応

#### 1-3. 状態管理セットアップ

**実装ファイル:**
- `store/userAtom.ts`
- `store/cartAtom.ts`
- `store/favoritesAtom.ts`
- `providers/index.tsx`

**タスク:**
- Jotai atoms定義（既存から移行）
- AsyncStorage永続化設定
- TanStack Query設定（QueryClient）
- プロバイダーラッパー実装

#### 1-4. API通信基盤

**実装ファイル:**
- `services/api/client.ts` - Axiosクライアント
- `constants/config.ts` - API URL管理
- `types/api.ts` - レスポンス型定義

**タスク:**
- Axiosインスタンス作成（ベースURL、ヘッダー設定）
- エラーハンドリング実装
- リトライロジック
- 環境変数管理（.env）

---

### Phase 2: 認証機能実装

#### 2-1. OAuth認証フロー

**実装ファイル:**
- `services/auth/google.ts`
- `services/auth/line.ts`
- `hooks/useAuth.ts`
- `app/(auth)/signin.tsx`

**タスク:**
- expo-auth-session でGoogle OAuth実装
- LINE OAuth実装
- 認証トークン管理（expo-secure-store）
- セッション状態管理（Jotai）

**実装例:**
```typescript
// hooks/useAuth.ts
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['profile', 'email'],
      redirectUri: makeRedirectUri({ scheme: 'myapp' }),
    },
    discovery
  );

  return { request, response, promptAsync };
};
```

#### 2-2. セッション管理

**実装ファイル:**
- `store/authAtom.ts`
- `services/storage/auth.ts`
- `utils/jwt.ts`

**タスク:**
- JWTトークン保存（SecureStore）
- 自動リフレッシュロジック
- ログアウト処理
- 認証状態の永続化

#### 2-3. ユーザープロフィール

**実装ファイル:**
- `app/(tabs)/profile.tsx`
- `components/profile/UserInfo.tsx`
- `hooks/useUser.ts`

**タスク:**
- ユーザー情報取得API連携（`/api/user`）
- プロフィール画面UI
- TanStack Queryでキャッシング

---

### Phase 3: 商品機能実装

#### 3-1. MicroCMS連携

**実装ファイル:**
- `services/api/products.ts`
- `hooks/useProducts.ts`
- `types/product.ts`

**タスク:**
- MicroCMS SDK統合（既存ロジック移植）
- 商品リスト取得
- 商品詳細取得
- ページネーション対応

**実装例:**
```typescript
// services/api/products.ts
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: process.env.EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.EXPO_PUBLIC_MICROCMS_API_KEY!,
});

export const fetchProducts = async (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  return await client.get({
    endpoint: 'products',
    queries: { offset, limit },
  });
};
```

#### 3-2. 商品一覧画面

**実装ファイル:**
- `app/(tabs)/index.tsx`
- `components/products/ProductList.tsx`
- `components/products/ProductCard.tsx`

**タスク:**
- FlatListで商品リスト表示
- 画像の遅延ロード（expo-image）
- Pull-to-refresh
- 無限スクロール対応

#### 3-3. 商品詳細画面

**実装ファイル:**
- `app/products/[id].tsx`
- `components/products/ProductDetail.tsx`
- `components/products/ProductGallery.tsx`

**タスク:**
- 動的ルーティング実装
- 商品画像ギャラリー（カルーセル）
- カート追加ボタン
- お気に入り追加ボタン

---

### Phase 4: カート機能実装

#### 4-1. カート状態管理

**実装ファイル:**
- `store/cartAtom.ts`
- `services/storage/cart.ts`
- `hooks/useCart.ts`

**タスク:**
- Jotaiでカート状態管理
- AsyncStorageで永続化
- カート追加/削除/更新ロジック
- 合計金額計算

**実装例:**
```typescript
// store/cartAtom.ts
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = createJSONStorage(() => AsyncStorage);

export const cartAtom = atomWithStorage<string[]>('cart', [], storage);

export const cartCountAtom = atom((get) => get(cartAtom).length);
```

#### 4-2. カート画面UI

**実装ファイル:**
- `app/(tabs)/cart.tsx`
- `components/cart/CartItem.tsx`
- `components/cart/CartSummary.tsx`

**タスク:**
- カート商品リスト表示（FlatList）
- 数量変更UI
- 削除機能
- 合計金額表示

---

### Phase 5: お気に入り機能実装

#### 5-1. お気に入り状態管理

**実装ファイル:**
- `store/favoritesAtom.ts`
- `services/storage/favorites.ts`
- `services/api/favorites.ts`
- `hooks/useFavorites.ts`

**タスク:**
- Jotaiでお気に入り状態管理
- AsyncStorage永続化
- APIとの同期（`/api/favorites`）
- 追加/削除ロジック

#### 5-2. お気に入り画面UI

**実装ファイル:**
- `app/(tabs)/favorites.tsx`
- `components/favorites/FavoriteItem.tsx`

**タスク:**
- お気に入り商品リスト表示
- グリッドレイアウト
- 削除機能
- カートへの追加

---

### Phase 6: 決済機能実装

#### 6-1. Stripe連携

**実装ファイル:**
- `services/api/checkout.ts`
- `hooks/useCheckout.ts`
- `app/checkout.tsx`

**タスク:**
- Stripe React Native SDK統合
- チェックアウトセッション作成（`/api/[id]/checkout`）
- 支払いシート表示
- 決済完了処理

**実装例:**
```typescript
// services/api/checkout.ts
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

export const useCheckout = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const checkout = async (productId: string) => {
    // バックエンドからClientSecretを取得
    const { clientSecret } = await fetch(`/api/${productId}/checkout`, {
      method: 'POST',
    }).then(res => res.json());

    // PaymentSheet初期化
    await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'My EC Site',
    });

    // PaymentSheet表示
    const { error } = await presentPaymentSheet();

    if (error) {
      throw error;
    }
  };

  return { checkout };
};
```

#### 6-2. チェックアウト画面

**実装ファイル:**
- `app/checkout.tsx`
- `components/checkout/OrderSummary.tsx`
- `components/checkout/PaymentMethod.tsx`

**タスク:**
- 注文概要表示
- 配送先入力フォーム（React Hook Form + Zod）
- 支払い方法選択
- 注文確定処理

---

### Phase 7: UI/UX最適化

#### 7-1. レスポンシブデザイン

**実装ファイル:**
- `utils/responsive.ts`
- `theme/breakpoints.ts`

**タスク:**
- タブレット対応（Dimensions API）
- 横画面対応
- SafeArea対応

#### 7-2. アニメーション実装

**実装ファイル:**
- `components/animations/FadeIn.tsx`
- `components/animations/SlideUp.tsx`

**タスク:**
- React Native Reanimated 導入
- 画面遷移アニメーション
- カード表示アニメーション
- ボタンフィードバック

#### 7-3. トースト・通知

**実装ファイル:**
- `components/ui/Toast.tsx`
- `hooks/useToast.ts`

**タスク:**
- react-native-toast-message 統合
- 成功/エラー通知
- カート追加通知
- お気に入り追加通知

#### 7-4. ローディング状態

**実装ファイル:**
- `components/ui/Loading.tsx`
- `components/ui/Skeleton.tsx`

**タスク:**
- スケルトンスクリーン実装
- Pull-to-refreshインジケーター
- ボタンローディング状態

---

### Phase 8: テスト実装

#### 8-1. ユニットテスト

**実装ファイル:**
- `__tests__/hooks/useCart.test.ts`
- `__tests__/utils/validation.test.ts`
- `__tests__/services/products.test.ts`

**タスク:**
- カスタムフックテスト
- ユーティリティ関数テスト
- APIクライアントテスト（モック）

#### 8-2. コンポーネントテスト

**実装ファイル:**
- `__tests__/components/ProductCard.test.tsx`
- `__tests__/components/CartItem.test.tsx`

**タスク:**
- React Native Testing Library使用
- スナップショットテスト
- インタラクションテスト

#### 8-3. E2Eテスト（オプション）

**ツール:** Detox or Maestro

**タスク:**
- ログインフロー
- 商品購入フロー
- カート操作フロー

---

### Phase 9: 本番リリース準備

#### 9-1. アプリ設定

**実装ファイル:**
- `app.json`
- `eas.json`

**タスク:**
- アプリアイコン作成
- スプラッシュスクリーン設定
- アプリ名・バンドルID設定
- パーミッション設定

#### 9-2. ビルド設定

```bash
# EAS CLI インストール
npm install -g eas-cli

# EAS設定
eas login
eas build:configure
```

**タスク:**
- Expo Application Services (EAS) セットアップ
- iOS/Androidビルド設定
- 証明書・プロビジョニング管理
- 環境変数設定（EAS Secrets）

#### 9-3. パフォーマンス最適化

**タスク:**
- 画像最適化（WebP変換）
- バンドルサイズ削減
- コード分割
- キャッシング戦略最適化
- メモリリーク対策

#### 9-4. セキュリティ対策

**タスク:**
- API Key暗号化（expo-secure-store）
- SSL Pinning（オプション）
- リバースエンジニアリング対策
- 個人情報保護対応

---

## 🔧 ライブラリマッピング詳細

### UIコンポーネント変換表

| Web (現在) | React Native (移行後) | 代替案 |
|-----------|---------------------|--------|
| **Mantine Card** | `react-native-paper` Card | `react-native-elements` Card |
| **Mantine Button** | `react-native-paper` Button | TouchableOpacity + カスタム |
| **Mantine Badge** | `react-native-paper` Badge | `react-native-elements` Badge |
| **Mantine TextInput** | `react-native-paper` TextInput | React Native TextInput |
| **Mantine Modal** | `react-native-paper` Modal | React Native Modal |
| **Mantine Image** | `expo-image` | `react-native-fast-image` |
| **Lucide Icons** | `@expo/vector-icons` | `react-native-vector-icons` |
| **Tailwind CSS** | `nativewind` | StyleSheet + テーマ |
| **Toast** | `react-native-toast-message` | カスタム実装 |
| **Carousel** | `react-native-reanimated-carousel` | `react-native-snap-carousel` |

### スタイリング変換例

**Before (Web - Tailwind):**
```tsx
<div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold">商品名</h2>
  <p className="text-gray-600">説明文</p>
</div>
```

**After (React Native - NativeWind):**
```tsx
<View className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
  <Text className="text-2xl font-bold">商品名</Text>
  <Text className="text-gray-600">説明文</Text>
</View>
```

**After (React Native - StyleSheet):**
```tsx
<View style={styles.container}>
  <Text style={styles.title}>商品名</Text>
  <Text style={styles.description}>説明文</Text>
</View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
  },
});
```

---

## ⚠️ リスクと対策

### 技術的リスク

| リスク | 影響度 | 対策 |
|-------|-------|------|
| **UIライブラリの学習コスト** | 高 | 早期プロトタイプ作成、段階的移行 |
| **ネイティブモジュールのビルドエラー** | 中 | Expo管理下パッケージ優先、EAS Build活用 |
| **パフォーマンス問題** | 中 | React DevTools Profiler、Flipper活用 |
| **認証フローの複雑化** | 高 | OAuth実装の早期検証、フォールバック設計 |
| **Stripe決済の互換性** | 中 | 公式RN SDKドキュメント準拠、テスト環境構築 |

### ビジネスリスク

| リスク | 影響度 | 対策 |
|-------|-------|------|
| **開発スコープの拡大** | 高 | MVPの明確化、フェーズ分割実装 |
| **既存Web版との機能差異** | 中 | 機能優先度マトリクス作成 |
| **ストア審査の遅延** | 中 | 事前ガイドライン確認、余裕あるスケジュール |
| **バックエンドAPIの負荷増** | 低 | キャッシング強化、レート制限実装 |

---

## 📊 成果物一覧

### Phase 1-3 (基盤・認証・商品)
- [ ] Expoプロジェクト初期化完了
- [ ] Expo Router設定完了
- [ ] React Native Paper テーマ実装
- [ ] Google/LINE OAuth認証動作
- [ ] 商品一覧画面表示
- [ ] 商品詳細画面表示
- [ ] MicroCMS連携確認

### Phase 4-6 (カート・お気に入り・決済)
- [ ] カート追加/削除機能
- [ ] AsyncStorageでカート永続化
- [ ] お気に入り追加/削除機能
- [ ] Stripe決済フロー動作
- [ ] 注文履歴表示

### Phase 7-9 (最適化・テスト・リリース)
- [ ] アニメーション実装
- [ ] ユニットテスト カバレッジ70%以上
- [ ] E2Eテスト 主要フロー網羅
- [ ] iOS/Android ビルド成功
- [ ] App Store/Google Play 申請

---

## 🎯 MVP (Minimum Viable Product) 定義

最初のリリースで実装すべき最小機能セット:

### 必須機能
1. ✅ ユーザー認証（Google OAuth）
2. ✅ 商品一覧表示（ページネーション）
3. ✅ 商品詳細表示
4. ✅ カート追加/削除
5. ✅ Stripe決済
6. ✅ 注文履歴表示

### 次期バージョン機能
- LINE認証
- 商品検索・フィルタリング
- レビュー機能
- プッシュ通知
- クーポン機能
- 配送状況トラッキング

---

## 🔄 既存バックエンドとの連携

### API エンドポイント（変更なし）

React Nativeアプリは既存のNext.js APIルートをそのまま利用:

```typescript
// constants/config.ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // 認証
  AUTH_SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  AUTH_CALLBACK: `${API_BASE_URL}/api/auth/callback/google`,

  // ユーザー
  USER_INFO: `${API_BASE_URL}/api/user`,

  // お気に入り
  FAVORITES: `${API_BASE_URL}/api/favorites`,

  // 決済
  CHECKOUT: (productId: string) => `${API_BASE_URL}/api/${productId}/checkout`,
};
```

### Prismaデータベース（共有）

- React Nativeアプリはデータベースに直接接続せず、APIを経由
- Next.js APIルートがPrisma Clientを利用（既存実装継続）
- データベーススキーマ変更なし

---

## 📚 参考リソース

### 公式ドキュメント
- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/docs/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [NativeWind](https://www.nativewind.dev/)
- [TanStack Query - React Native](https://tanstack.com/query/latest/docs/react/overview)
- [Stripe React Native SDK](https://stripe.com/docs/payments/accept-a-payment?platform=react-native)

### 移行ガイド
- [Next.js to React Native Migration Guide](https://dev.to/...)
- [Expo + TypeScript Best Practices](https://docs.expo.dev/guides/typescript/)
- [React Navigation vs Expo Router](https://docs.expo.dev/router/introduction/)

### コミュニティ
- [Expo Discord](https://chat.expo.dev/)
- [React Native Community](https://github.com/react-native-community)

---

## ✅ チェックリスト

### 開発開始前
- [ ] Expoアカウント作成
- [ ] EAS CLI セットアップ
- [ ] Apple Developer アカウント（iOS）
- [ ] Google Play Developer アカウント（Android）
- [ ] 環境変数の確認（.env）
- [ ] バックエンドAPIのCORS設定確認

### 開発中
- [ ] 各フェーズのテスト実施
- [ ] コードレビュー実施
- [ ] パフォーマンス測定
- [ ] セキュリティ監査

### リリース前
- [ ] App Store ガイドライン確認
- [ ] Google Play ガイドライン確認
- [ ] プライバシーポリシー作成
- [ ] 利用規約作成
- [ ] ストアスクリーンショット準備
- [ ] アプリ説明文作成

---

## 🚀 次のアクション

1. **Phase 0: 環境構築**を開始
   ```bash
   npx create-expo-app mobile-app --template expo-template-blank-typescript
   cd mobile-app
   npm install
   ```

2. **プロトタイプ作成**（1-2週目標）
   - Expo Router + React Native Paper
   - 商品一覧画面のモックアップ
   - ナビゲーション動作確認

3. **技術検証**
   - Google OAuth認証フロー
   - MicroCMS API連携
   - Stripe決済テスト

4. **本実装開始**
   - Phase 1から順次実装
   - 各フェーズ完了後にテスト

---

## 📝 メモ

### パッケージバージョン管理

既存Next.jsプロジェクトとの整合性を保つため、以下のバージョンを維持:

- **Jotai**: 2.6.5
- **TanStack Query**: 5.24.1
- **Zod**: 3.22.4
- **Day.js**: 1.11.10

### バックエンド改修（必要に応じて）

React Nativeアプリからのアクセスに対応するため、以下の対応が必要な場合があります:

1. **CORS設定追加** (`next.config.mjs`)
   ```javascript
   async headers() {
     return [
       {
         source: '/api/:path*',
         headers: [
           { key: 'Access-Control-Allow-Origin', value: '*' },
           { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
         ],
       },
     ];
   }
   ```

2. **OAuth Redirect URI追加**
   - Google Console: `myapp://` スキーム追加
   - LINE Developers: モバイルアプリURL追加

3. **API Rate Limiting**
   - モバイルアプリからの大量リクエスト対策
   - next-rate-limit 導入検討

---

**作成日**: 2026-01-20
**バージョン**: 1.0
**対象プロジェクト**: my-ec-site (Next.js 14)
**移行先**: React Native (Expo SDK 51+)
