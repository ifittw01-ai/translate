# 多語言翻譯機 (Multi-Language Translator)

一個基於 Nuxt 3 的多語言翻譯應用，支援英文、日語、繁體中文、簡體中文、法文翻譯。

## 功能特色

- 🌍 支援 5 種語言翻譯（英文、日語、繁體中文、簡體中文、法文）
- 📜 翻譯歷史記錄自動保存
- 💾 Supabase 雲端資料庫整合
- 🚀 使用 Nuxt 3 框架
- 🎨 美觀的 Tailwind CSS 界面
- 🔒 安全的伺服器端 API 調用
- 🔑 API Key 儲存在環境變數中

## 設定說明

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

1. 複製 `.env.example` 為 `.env`：
```bash
cp .env.example .env
```

2. 設定 OpenRouter API Key：
   - 前往 [OpenRouter](https://openrouter.ai/keys) 註冊並獲取 API Key
   - 在 `.env` 檔案中填入您的 API Key

3. 設定 Supabase（用於保存翻譯歷史）：
   - 前往 [Supabase](https://supabase.com) 建立帳號和專案
   - 詳細設定步驟請參考 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - 在 `.env` 檔案中填入您的 Supabase URL 和 Key

完整的 `.env` 檔案應該包含：
```bash
OPENROUTER_API_KEY=your_openrouter_api_key_here
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

應用會在 `http://localhost:3000` 啟動

## 使用方式

1. 在文字框中輸入要翻譯的文字
2. 點擊「開始翻譯」按鈕
3. 系統會自動將文字翻譯成 5 種語言並顯示結果
4. 翻譯記錄會自動保存在左側的歷史列表中
5. 點擊歷史記錄可以重新載入之前的翻譯
6. 可以刪除單筆記錄或清空全部歷史

## 技術架構

- **前端框架**: Nuxt 3 + Vue 3
- **樣式**: Tailwind CSS
- **翻譯 API**: OpenRouter (DeepSeek Chat V3.1 免費模型)
- **資料庫**: Supabase (PostgreSQL)
- **部署**: 可部署至 Vercel、Netlify 等平台

## 注意事項

- OpenRouter 免費帳戶有每日請求次數限制
- 所有敏感資料（API Keys）儲存在伺服器端，不會暴露給客戶端
- Supabase 免費方案提供 500MB 資料庫空間，足夠個人使用
- 建議在生產環境中使用環境變數管理所有敏感配置
- 詳細的 Supabase 設定步驟請參考 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 部署

### Vercel

```bash
npm run build
```

然後在 Vercel 專案設定中添加以下環境變數：
- `OPENROUTER_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`

### 其他平台

確保在部署平台的環境變數中設定以下三個變數：
- `OPENROUTER_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`

## 授權

MIT License

