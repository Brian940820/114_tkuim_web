# 排球比賽報名系統  
Volleyball Competition Registration System

---

## 一、專案主題與目標

本專案為一套前後端分離的比賽報名系統，  
使用者可瀏覽比賽列表、查看比賽資訊並進行報名；  
管理者則可新增比賽、查看報名名單並管理報名資料。

本專案目標為實作完整的 CRUD 流程，  
並熟悉前後端整合與 RESTful API 設計。

---

## 二、技術選擇與原因

### 前端（Frontend）
- HTML / CSS / JavaScript（Vanilla JS）
- 不使用前端框架，清楚呈現 DOM 操作與 API 串接流程

### 後端（Backend）
- Node.js
- Express.js
- 建立 RESTful API，負責商業邏輯與資料處理

### 資料庫（Database）
- MongoDB
- Mongoose ODM
- 使用 ObjectId 建立比賽與報名資料之關聯

---

## 三、系統架構說明

本系統採用前後端分離架構：

- 前端：負責畫面呈現與使用者操作
- 後端：提供 API 與處理商業邏輯
- 資料庫：儲存比賽與報名相關資料

前端透過 HTTP 請求與後端 API 溝通，  
後端再透過 Mongoose 與 MongoDB 進行資料存取。

---

## 四、系統功能說明

### 使用者功能
- 瀏覽比賽列表
- 查看比賽時間、地點與報名人數
- 進行比賽報名
- 查看各比賽的報名名單

### 管理功能
- 新增比賽
- 查看報名名單
- 刪除報名資料
- 限制比賽報名人數上限

---

## 五、安裝與執行方式

### 1. 安裝後端套件

```bash
npm install
```

### 2.設定環境變數（.env）

請在專案根目錄建立 .env 檔案，內容如下：

```
MONGODB_URI=mongodb://127.0.0.1:27017/competition_system
```
說明：
- MONGODB_URI：MongoDB 連線字串
- 可依實際環境修改為 MongoDB Atlas 或本機資料庫

### 3. 啟動後端伺服器
```bash
npm run dev
```
啟動成功後，後端 API 將運行於：
```
http://localhost:3000
```

### 4. 開啟前端頁面
使用瀏覽器直接開啟：
```
frontend/index.html
```

---

## 六、API 規格說明

Competition API
取得所有比賽
```bash
GET /api/competitions
```
回傳範例：
```json
{
  "success": true,
  "data": [
    {
      "_id": "competitionId",
      "name": "排球比賽 A",
      "location": "台北",
      "date": "2026-01-20T00:00:00.000Z",
      "maxPlayers": 12,
      "registeredCount": 3
    }
  ]
}
```
新增比賽
```bash
POST /api/competitions
```
Request Body：
```json
{
  "name": "排球比賽 A",
  "location": "台北",
  "date": "2026-01-20",
  "maxPlayers": 12
}
```
### Registration API
新增報名
```bash
POST /api/registrations
```
Request Body：
```json
{
  "competition": "competitionId",
  "name": "王小明",
  "email": "test@mail.com",
  "phone": "0912345678"
}
```
取得某比賽報名名單
```bash
GET /api/registrations/competition/:competitionId
```
刪除報名
```bash
DELETE /api/registrations/{id}
```
---

## 七、系統架構圖
```less
[ Browser ]
     |
     | HTTP (fetch)
     v
[ Frontend (HTML / JS) ]
     |
     | RESTful API
     v
[ Backend (Node.js / Express) ]
     |
     | Mongoose
     v
[ MongoDB ]
```

---

## 八、CRUD 流程圖（以報名流程為例）
```yaml
使用者填寫報名表單
        |
        v
前端送出 POST /api/registrations
        |
        v
後端驗證資料與人數上限
        |
        v
MongoDB 儲存報名資料
        |
        v
後端回傳成功結果
        |
        v
前端顯示報名成功畫面
```
---