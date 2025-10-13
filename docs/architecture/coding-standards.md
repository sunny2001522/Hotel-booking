# 編碼標準 (Coding Standards)

為確保專案的程式碼品質、一致性和可維護性，所有開發工作應遵循以下標準。

## 1. 語言

- **TypeScript**: 專案應完全使用 TypeScript (`.ts` / `.tsx`) 來撰寫，並啟用嚴格模式 (`strict: true`)。
- **類型定義**: 盡可能為所有變數、函式參數和回傳值定義明確的類型。避免使用 `any`。

## 2. 格式化

- **Prettier**: 專案將使用 Prettier 進行自動程式碼格式化。開發者應在 commit 前確保程式碼已被格式化。
- **ESLint**: 專案將使用 ESLint 進行程式碼品質檢查，並遵循 `eslint-config-next` 的建議規則。

## 3. 命名規範

- **元件 (Components)**: 使用 PascalCase (e.g., `BookingForm.tsx`)。
- **變數 & 函式**: 使用 camelCase (e.g., `const bookingData`, `function handleBooking()`)。
- **類型 & 介面**: 使用 PascalCase (e.g., `interface RoomData`)。

## 4. 元件開發

- **原子化設計**: 盡量將 UI 拆分成小的、可重複使用的元件。
- **關注點分離**: 將 UI 元件 (`/components`) 與頁面邏輯 (`/app`) 分離。
- **Props**: 為元件的 Props 定義明確的 TypeScript 介面。

## 5. Git 工作流程

- **Commit 訊息**: 請遵循 Conventional Commits 規範 (e.g., `feat: add room booking feature`, `fix: correct login bug`)。
- **分支 (Branching)**: 功能開發應在獨立的 feature branch 中進行。
