# 実装計画書: IBM Bob FAQ サイト v2（ロゴ・リンク・テーマカラー・ダークテーマ追加）

## 基本情報

* 仕様書: 20261029-faq-site-spec.md
* 作成日時: 2026-10-29T14:49:34+09:00
* 更新日時: 2026-10-29T14:51:22+09:00
* 作成者:
* ステータス: Approved

## 変更ファイル一覧

| ファイル     | 変更種別 | 変更概要 |
| ------------ | -------- | -------- |
| `index.html` | 修正     | ヘッダーにBobロゴ画像（リンク付き）とダークテーマトグルボタンを追加 |
| `style.css`  | 修正     | ヘッダー背景をグラデーションに変更、ダークテーマ用CSSカスタムプロパティ・トグルボタンスタイルを追加 |
| `main.js`    | 修正     | ダークテーマ切り替えロジックを追加 |

## 実装手順

### 1. `index.html` — ヘッダーの変更

#### 1-1. ヘッダー内部レイアウトの変更

現在の `.site-header__inner` は縦方向の構成。以下のように変更する。

* `.site-header__inner` を左右2カラム（Flexbox）のレイアウトに変更
  * 左側: ロゴリンク + 既存のeyebrow/タイトル
  * 右側: ダークテーマトグルボタン

#### 1-2. Bobロゴ画像とリンクの追加

`.site-header__inner` の先頭に以下を追加:

```html
<a href="https://www.ibm.com/products/bob" target="_blank" rel="noopener noreferrer" class="site-header__logo-link" aria-label="IBM Bob 製品ページ">
  <img src="bob.svg" alt="IBM Bob" class="site-header__logo" height="40">
</a>
```

#### 1-3. ダークテーマトグルボタンの追加

`.site-header__inner` の末尾に以下を追加:

```html
<button class="theme-toggle" id="theme-toggle" aria-label="テーマを切り替える">
  🌙 ダーク
</button>
```

### 2. `style.css` — スタイルの変更・追加

#### 2-1. ヘッダー背景をグラデーションに変更

`.site-header` の `background-color: var(--color-header-bg)` を以下に変更:

```css
background: linear-gradient(to right, #0f62fe, #a56eff);
```

#### 2-2. `.site-header__inner` をFlexboxレイアウトに変更

```css
.site-header__inner {
  display: flex;
  align-items: center;
  gap: var(--spacing-06);
  padding: var(--spacing-07) 0;
}
```

#### 2-3. ロゴリンクとロゴ画像のスタイル追加

```css
.site-header__logo-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}

.site-header__logo {
  height: 40px;
  width: auto;
  display: block;
}
```

#### 2-4. タイトルエリアのスタイル追加

```css
.site-header__title-area {
  flex: 1;
}
```

#### 2-5. トグルボタンのスタイル追加

```css
.theme-toggle {
  margin-left: auto;
  flex-shrink: 0;
  height: 32px;
  padding: 0 var(--spacing-04);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-header-text);
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color var(--transition), border-color var(--transition);
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-toggle:focus {
  outline: 2px solid #ffffff;
  outline-offset: -2px;
}
```

#### 2-6. ダークテーマ用CSSカスタムプロパティの追加

`body.dark-theme` セレクタで以下のトークンをオーバーライド:

| トークン                   | ダーク値   |
| -------------------------- | ---------- |
| `--color-bg`               | `#161616`  |
| `--color-bg-subtle`        | `#262626`  |
| `--color-bg-hover`         | `#353535`  |
| `--color-border`           | `#393939`  |
| `--color-border-strong`    | `#6f6f6f`  |
| `--color-text-primary`     | `#f4f4f4`  |
| `--color-text-secondary`   | `#c6c6c6`  |
| `--color-text-placeholder` | `#6f6f6f`  |
| `--color-layer-01`         | `#262626`  |
| `--color-layer-02`         | `#393939`  |

### 3. `main.js` — ダークテーマ切り替えロジックの追加

以下のロジックをファイル末尾に追加:

```js
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function () {
  const isDark = document.body.classList.toggle('dark-theme');
  themeToggle.textContent = isDark ? '☀️ ライト' : '🌙 ダーク';
});
```

## GUI実装

* **対象コンポーネント:** ヘッダー（`.site-header`、`.site-header__inner`）、ロゴリンク（`.site-header__logo-link`）、ロゴ画像（`.site-header__logo`）、トグルボタン（`.theme-toggle`）
* **スタイル:** ヘッダー背景グラデーション、Flexboxレイアウト、ダークテーマ用 `body.dark-theme` CSSクラス
* **状態管理:** `body` への `dark-theme` クラスの付け外しでテーマを管理。`main.js` でトグルボタンのテキストも更新
* **画面遷移:** なし（単一ページ）。ロゴクリックは `target="_blank"` で新タブ
* **レスポンシブ対応:** スマートフォン（768px未満）では、トグルボタンを維持しつつロゴサイズを調整（高さ 32px 程度）

## テストの追加・更新

自動テストは存在しないため、以下の手動確認を実施する:

1. Bob画像がヘッダー左上に表示されること
2. Bob画像クリックで `https://www.ibm.com/products/bob` が新しいタブで開くこと
3. ヘッダー背景がBlue→Purpleのグラデーションになっていること
4. トグルボタンがヘッダー右上に表示されること
5. トグルボタンクリックでダーク/ライトが切り替わること
6. ダークテーマ時のカラーが仕様書のトークン表と一致すること
7. 既存機能（検索・フィルタ・アコーディオン）がダーク/ライト両方で正常動作すること
8. スマートフォン幅（768px未満）でレイアウトが崩れないこと

## 検証計画

* HTMLの構文確認（ブラウザのDevToolsで確認）
* 各機能の手動確認（上記テスト項目）
* レスポンシブ確認（DevToolsのデバイスシミュレーター）
* 既存機能への影響確認（フィルタ・検索・アコーディオン）

## 移行・ロールバック

* `bob.svg` が同一ディレクトリに存在することが前提。存在しない場合はロゴ非表示（`alt` テキストが表示される）
* ロールバックは Git で対応可能（未コミットの場合はファイルを手動で元に戻す）

## 未解決事項

* なし
