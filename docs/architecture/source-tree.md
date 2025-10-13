#### 2. 前端應用元件架構 (C4 模型 - Level 3)

我建議採用功能驅動 (feature-driven) 的方式來組織我們的元件和邏輯，這有助於保持程式碼的清晰和可維護性。

**建議的資料夾結構:**

```
src/
├── app/                  # Next.js App Router - 頁面路由
│   ├── /                 # 首頁 (US-1)
│   ├── rooms/            # 房間列表/搜尋頁 (US-2)
│   ├── rooms/[id]/       # 房間詳情頁 (US-3)
│   ├── booking/          # 訂房流程頁 (US-4)
│   └── account/          # 使用者帳戶相關頁面
│       └── bookings/     # 我的訂單頁 (US-5)
│
├── components/           # 可重複使用的 React 元件
│   ├── ui/               # 由 shadcn-cli 產生的基礎 UI 元件 (Button, Input, etc.)
│   └── feature/          # 特定功能的複合元件 (e.g., HeroShowcase, BookingForm)
│
├── lib/                  # 核心邏輯與工具
│   ├── api.ts            # 集中管理所有對後端 API 的請求 (使用 SWR)
│   └── utils.ts          # 通用輔助函式
│
└── store/                # Zustand 狀態管理
    ├── userStore.ts      # 管理使用者認證狀態 (token, user info)
    └── bookingStore.ts   # 管理跨步驟的訂房流程狀態
```
