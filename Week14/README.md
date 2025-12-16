# 淡江大學官方網站 🎓

一個仿淡江大學官方首頁的完整網站專案，使用純 HTML5、CSS3 和 JavaScript 開發。

## 📸 網站截圖

```
首頁包含：
├─ 紅色功能列（學校 Logo + 名稱）
├─ 白色導覽列（5大主菜單 + 下拉選單）
├─ 4 張圖片自動輪播 Banner
├─ 招生資訊卡片區
├─ 學校特色宣傳區（AI + SDGs）
└─ Footer（地址、聯絡、社群連結）
```

## ✨ 主要功能

### 🏠 首頁 (`index.html`)
- ✅ 響應式導覽列
- ✅ 4 張圖片自動輪播（每 5 秒切換）
- ✅ 招生資訊卡片（支援 hover 動畫）
- ✅ 學校特色宣傳區
- ✅ 完整 Footer

### 📄 子頁面
- **招生資訊** (`pages/admission.html`) - 招生方案、常見問題、聯絡資訊
- **學術單位** (`pages/department.html`) - 各學院介紹、系所列表、研究重點
- **行政單位** (`pages/office.html`) - 各處室服務、快速導航、組織架構
- **認識本校** (`pages/about.html`) - 校訓願景、校史、特色亮點、榮譽成就
- **獎助學金** (`pages/scholarship.html`) - 獎學金方案、篩選功能、申請流程

## 🛠️ 技術棧

| 技術 | 說明 |
|------|------|
| **HTML5** | 語意化標籤結構 |
| **CSS3** | Flexbox、Grid、動畫、漸層、RWD |
| **JavaScript** | 輪播、漢堡選單、互動功能 |
| **Font Awesome** | Icon 圖示庫 |

## 📁 檔案結構

```
Week14/
├── index.html              # 首頁
├── pages/
│   ├── admission.html      # 招生資訊
│   ├── department.html     # 學術單位
│   ├── office.html         # 行政單位
│   ├── about.html          # 認識本校
│   └── scholarship.html    # 獎助學金
├── assets/
│   ├── css/
│   │   └── style.css       # 主要樣式表 (1200+ 行)
│   ├── js/
│   │   └── script.js       # 互動功能 (300+ 行)
│   └── images/             # 圖片資料夾
├── README.md               # 本檔案
├── README_WEBSITE.md       # 詳細文檔
└── todo.md                 # 專案需求清單
```

## 🎨 設計系統

### 色彩方案
- **主色** - `#D91E1F`（淡江大學紅色）
- **輔助色** - `#FDB913`（金色）
- **文字色** - `#333`（深灰）
- **背景色** - `#f8f9fa`（淺灰）

### 響應式斷點
| 尺寸 | 範圍 | 設備 |
|------|------|------|
| 桌面版 | 1024px+ | 電腦 |
| 平板版 | 768px-1024px | 平板 |
| 手機版 | 480px-768px | 手機 |
| 超小屏 | <480px | 小型手機 |

## 🚀 快速開始

### 方法 1：Python HTTP 伺服器
```bash
cd /Users/chenguanhua/projects/114_tkuim_web/Week14
python3 -m http.server 8000
```
然後在瀏覽器打開：`http://localhost:8000`

### 方法 2：VS Code Live Server
1. 安裝 Live Server 擴充功能
2. 右鍵點選 `index.html`
3. 選擇 "Open with Live Server"

### 方法 3：Node.js http-server
```bash
npx http-server
```

## 🎯 主要功能說明

### 1️⃣ 導覽列
- 紅色頂部：學校 Logo + 名稱
- 白色選單：5 大主菜單
- 下拉選單：子菜單支援
- 漢堡選單：手機版自動切換

### 2️⃣ 輪播 Banner
```javascript
- 自動播放（5 秒切換）
- 滑鼠懸停暫停
- 左右切換按鈕
- 指示點點擊導航
- 4 張預設圖片
```

### 3️⃣ 互動功能
- ✅ 卡片 hover 動畫
- ✅ 回到頂端按鈕（捲動 300px 後出現）
- ✅ FAQ 展開/收合
- ✅ 獎學金篩選
- ✅ 快速導航連結

### 4️⃣ 響應式設計
- 平板版：卡片改為雙欄
- 手機版：完整單欄佈局
- 觸摸友善的按鈕尺寸
- 自動調整字體大小

## 📊 頁面統計

| 頁面 | 檔案大小 | 功能 |
|------|---------|------|
| 首頁 | ~12 KB | 輪播、卡片 |
| 招生資訊 | ~14 KB | FAQ、聯絡 |
| 學術單位 | ~13 KB | 學院卡片、統計 |
| 行政單位 | ~15 KB | 處室卡片、導航 |
| 認識本校 | ~14 KB | 時間軸、亮點 |
| 獎助學金 | ~16 KB | 篩選、申請流程 |
| **style.css** | ~45 KB | 完整樣式 |
| **script.js** | ~8 KB | 互動功能 |

## 💻 瀏覽器支援

| 瀏覽器 | 支援 |
|-------|------|
| Chrome | ✅ 最新版本 |
| Safari | ✅ 最新版本 |
| Firefox | ✅ 最新版本 |
| Edge | ✅ 最新版本 |

## 📝 程式碼範例

### 輪播功能
```javascript
class Carousel {
  next() {
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    this.show(nextIndex);
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }
}
```

### 漢堡選單
```javascript
hamburger?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
});
```

### 回到頂端
```javascript
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn?.classList.add('show');
  }
});
```

## ✅ 功能清單

### 已完成
- [x] 專案初始化與資料夾結構
- [x] 主要樣式表設計
- [x] 首頁製作（Header、Banner、招生、Footer）
- [x] 導覽列功能（漢堡選單、下拉選單）
- [x] 輪播 Banner 實現
- [x] 招生資訊頁面
- [x] 學術單位頁面
- [x] 行政單位頁面
- [x] 認識本校頁面
- [x] 獎助學金頁面
- [x] 回到頂端按鈕
- [x] FAQ 展開/收合功能
- [x] 完整響應式設計

### 待進行
- [ ] 整合真實圖片
- [ ] 搜尋功能（全站搜尋）
- [ ] 新聞/公告系統
- [ ] 線上報名系統
- [ ] 多語言支援
- [ ] 深色模式
- [ ] 無障礙設計增強

## 🔗 快速連結

| 功能 | 連結 |
|------|------|
| 招生資訊 | `/pages/admission.html` |
| 獎助學金 | `/pages/scholarship.html` |
| 學術單位 | `/pages/department.html` |
| 行政單位 | `/pages/office.html` |
| 認識本校 | `/pages/about.html` |

## 📞 聯絡資訊

- **學校電話** - (02) 2621-5656
- **官方網站** - www.tku.edu.tw
- **Email** - info@mail.tku.edu.tw
- **地址** - 新北市淡水區英專路151號

## 📄 授權

本專案為教學用途，仿淡江大學官方網站製作。

## 🎓 開發人員

- **課程** - TKUIM Web Development 
- **日期** - 2025年12月16日
- **版本** - 1.0.0

---

### 🚀 後續改進

歡迎提交建議或改進意見！如有問題，請聯絡開發團隊。

**最後更新** - 2025年12月16日
