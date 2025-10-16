# 冬眠客房 - 訂房網站 (Hotel Booking Project)
冰穹境是台灣首座以極光為主題的飯店，提供獨特的住宿體驗，讓您在星空下入眠，享受冰雪世界的美麗。 我們的設施包括穹頂劇院、星空餐廳和冰雪SPA，讓您在這裡度過難忘的假期。

## ✨ 主要功能 (Features)

-   **首頁 (Homepage)**: 包含 Hero Image、房型展示、關於我們、最新消息和美食介紹等多個區塊。
-   **客房瀏覽與篩選 (Room Browsing & Filtering)**:
    -   在 `/rooms` 頁面展示所有可預訂的客房。
    -   提供篩選器 (Filter) 功能，讓使用者可以根據入住/退房日期和人數來尋找合適的房型。
-   **客房詳情 (Room Details)**:
    -   點擊任一客房可進入 `/rooms/[id]` 頁面，查看詳細資訊，包括房間描述、圖片、設施列表。
    -   使用者可在此頁面選擇入住日期、人數以及加購項目 (Add-ons)。
-   **訂房流程 (Booking Process)**:
    -   使用者必須登入才能進行預訂。若未登入，系統會引導至登入頁面。
    -   若使用者個人資料（姓名、電話、Email、地址）不完整，系統會提示前往會員中心填寫。
    -   在 `/booking` 頁面，使用者可以最終確認訂房資訊（房型、日期、人數、聯絡資料、總金額）。
    -   提供編輯功能，讓使用者在最後一步仍可修改訂房細節。
    -   成功建立訂單後，導向 `/booking/success/[orderId]` 成功頁面。
-   **會員中心 (Account Management)**:
    -   在 `/account/bookings` 頁面，使用者可以查看「即將到來的旅程」和「歷史訂單」。
    -   提供「取消訂單」功能，讓使用者可以取消尚未到期的預訂。

## 🛠️ 技術棧 (Tech Stack)

-   **框架 (Framework)**: Next.js (App Router)
-   **語言 (Language)**: TypeScript
-   **樣式 (Styling)**: Tailwind CSS
-   **UI 元件庫 (UI Library)**: shadcn/ui
-   **狀態管理 (State Management)**: Zustand
-   **資料請求 (Data Fetching)**: SWR
-   **日期處理 (Date Handling)**: date-fns
