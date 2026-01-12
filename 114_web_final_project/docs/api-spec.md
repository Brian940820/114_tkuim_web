# API 規格文件  
Volleyball Competition Registration System

---

## Base URL
http://localhost:3000/api

## Competition API
### 取得所有比賽
```bash
GET /api/competitions
```
### 回傳範例：
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
### 新增比賽
```bash
POST /api/competitions
```
### Request Body：
```json
{
  "name": "排球比賽 A",
  "location": "台北",
  "date": "2026-01-20",
  "maxPlayers": 12
}
```
---
## Registration API
###  新增報名
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
### 取得某比賽報名名單
```bash
GET /api/registrations/competition/:competitionId
```
### 刪除報名
```bash
DELETE /api/registrations/{id}
```