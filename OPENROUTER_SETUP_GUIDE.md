# OpenRouter Privacy Settings - 完整設定指南

## ⚠️ 錯誤訊息
```
No endpoints found matching your data policy (Free model publication)
```

## 🎯 問題原因
您嘗試使用 OpenRouter 的**免費模型**，但尚未在帳號設定中啟用「免費模型使用權限」。

---

## ✅ 解決方案

### 方案一：啟用免費模型（推薦）

#### 步驟 1：前往隱私設定頁面
點擊此連結：**https://openrouter.ai/settings/privacy**

或手動前往：
1. 登入 OpenRouter：https://openrouter.ai
2. 點擊右上角的個人頭像
3. 選擇「Settings」
4. 點擊左側選單的「Privacy」

#### 步驟 2：找到 Data Policy 區塊
在頁面中找到類似以下的選項：
- **"Allow my data to be used for training in exchange for free model access"**
- **"Free model publication"**
- **"Enable free models"**
- **"Public data policy"**

#### 步驟 3：勾選並儲存
1. ✅ 勾選該選項
2. 點擊「Save」或「Update」按鈕
3. 等待頁面確認儲存成功

#### 步驟 4：重新啟動開發伺服器
```bash
# 停止目前的伺服器（按 Ctrl+C）
# 然後重新啟動
npm run dev
```

#### 步驟 5：測試翻譯功能
1. 輸入文字：「你好，世界」
2. 點擊「開始翻譯」
3. 應該會看到 5 種語言的翻譯結果

---

### 方案二：使用付費模型（無需啟用免費模型設定）

如果您不想允許 OpenRouter 使用您的資料，可以添加付費額度。

#### 步驟 1：添加額度
1. 前往：https://openrouter.ai/credits
2. 點擊「Add Credits」
3. 最低建議添加 $5-10 美元
4. 使用信用卡完成付款

#### 步驟 2：查看目前使用的模型
我已將代碼更新為使用 **Google Gemini Flash** 免費模型，這個模型可能有不同的隱私政策。

**目前配置：**
- 模型：`google/gemini-2.0-flash-exp:free`
- 優點：速度快、品質好、適合翻譯
- 缺點：仍需啟用免費模型設定

**如果有付費額度，可改用付費模型：**

編輯 `server/api/translate.post.ts`，將第 31 行改為：

```javascript
// 選項 A：DeepSeek Chat（超便宜，每百萬 tokens 約 $0.14）
model: 'deepseek/deepseek-chat',

// 選項 B：GPT-3.5 Turbo（中等價格，品質好）
model: 'openai/gpt-3.5-turbo',

// 選項 C：Claude Haiku（便宜且快速）
model: 'anthropic/claude-3-haiku',
```

---

### 方案三：嘗試其他免費模型

某些免費模型可能有不同的隱私政策要求。以下是可嘗試的模型列表：

編輯 `server/api/translate.post.ts`，將第 31 行改為以下任一選項：

```javascript
// 目前使用（已設定）
model: 'google/gemini-2.0-flash-exp:free',

// 可嘗試的其他選項：

// Meta Llama（開源模型）
model: 'meta-llama/llama-3.2-3b-instruct:free',

// Microsoft Phi（小型高效模型）
model: 'microsoft/phi-3-mini-128k-instruct:free',

// Qwen（對中文友善）
model: 'qwen/qwen-2-7b-instruct:free',

// Mistral（歐洲開源模型）
model: 'mistralai/mistral-7b-instruct:free',
```

每次更改後，記得重新啟動開發伺服器。

---

## 📊 費用比較

### 免費模型
- **費用**：$0（完全免費）
- **條件**：需啟用「免費模型使用權限」
- **限制**：每日請求次數限制
- **隱私**：資料可能用於模型訓練

### 付費模型（DeepSeek）
- **費用**：每百萬 tokens 約 $0.14
- **實際使用**：每次翻譯約 $0.0001（一分錢的百分之一）
- **條件**：帳號需有額度
- **限制**：無
- **隱私**：資料完全私密

### 範例計算
- 翻譯 1 次（5 種語言）≈ 500 tokens ≈ $0.00007
- $10 美元 ≈ 可翻譯約 140,000 次
- 對個人使用來說，$5-10 可以用很久

---

## 🔍 檢查您的設定

### 確認 API Key 正確
檢查您的 `.env` 檔案：

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxx
```

確認：
- ✅ Key 以 `sk-or-v1-` 開頭
- ✅ 沒有多餘的空格
- ✅ 沒有引號

### 查看 API 使用情況
前往：https://openrouter.ai/activity

可以看到：
- 請求歷史
- 錯誤訊息
- 使用的 tokens 數量
- 花費金額

### 檢查可用模型
前往：https://openrouter.ai/models?max_price=0

這會顯示所有免費模型。

---

## 🎯 快速測試

完成設定後，使用以下步驟測試：

1. **重新啟動伺服器**
   ```bash
   npm run dev
   ```

2. **開啟瀏覽器**
   前往：http://localhost:3000

3. **輸入測試文字**
   ```
   Hello, how are you?
   ```

4. **點擊「開始翻譯」**

5. **預期結果**
   - ✅ 看到 5 種語言的翻譯
   - ✅ 翻譯自動儲存到左側歷史記錄
   - ✅ 無錯誤訊息

---

## ❓ 常見問題

### Q1: 為什麼需要啟用「免費模型使用權限」？
**A:** OpenRouter 的免費模型政策要求用戶明確同意，讓他們可以使用您的 API 請求資料來訓練和改進模型。這是使用免費服務的交換條件。

### Q2: 我的資料會被如何使用？
**A:** 如果啟用免費模型，您的翻譯請求（輸入和輸出）可能會被：
- 用於訓練 AI 模型
- 作為測試資料
- 與模型提供商分享

如果您處理敏感資料，建議使用付費模型。

### Q3: 免費模型有請求次數限制嗎？
**A:** 是的，OpenRouter 免費模型通常有每日請求限制（例如：每天 200 次）。

### Q4: 付費模型很貴嗎？
**A:** 不貴！以 DeepSeek 為例：
- 每次翻譯約 $0.00007
- $10 可以翻譯約 14 萬次
- 個人使用非常划算

### Q5: 我可以混用免費和付費模型嗎？
**A:** 可以！您可以在代碼中設定不同的模型，甚至可以實作「優先使用免費，失敗後改用付費」的邏輯。

---

## 🎉 成功指標

設定成功後，您會看到：
- ✅ 翻譯正常運作
- ✅ 5 種語言結果顯示
- ✅ 歷史記錄自動儲存
- ✅ 無錯誤訊息
- ✅ Supabase 資料庫有記錄

---

## 📞 需要更多幫助？

1. **OpenRouter 文檔**：https://openrouter.ai/docs
2. **OpenRouter Discord**：https://discord.gg/openrouter
3. **查看模型列表**：https://openrouter.ai/models
4. **查看價格**：https://openrouter.ai/pricing
5. **API 狀態**：https://openrouter.ai/status

---

## 🚀 下一步

完成 OpenRouter 設定後，別忘了：
1. ✅ 設定 Supabase（參考 `SUPABASE_SETUP.md`）
2. ✅ 測試翻譯功能
3. ✅ 確認歷史記錄儲存
4. ✅ 開始使用您的翻譯應用！

Good luck! 🎈


