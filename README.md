# 多語言翻譯機 (Multi-Language Translator)

一個基於 Nuxt 3 的多語言翻譯應用，支援英文、日語、繁體中文、簡體中文、法文翻譯。

## 功能特色

- 🌍 支援 5 種語言翻譯
- 🚀 使用 Nuxt 3 框架
- 🎨 美觀的 Tailwind CSS 界面
- 🔒 安全的伺服器端 API 調用
- 🔑 API Key 儲存在環境變數中

## 設定說明

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定 OpenRouter API Key

1. 前往 [OpenRouter](https://openrouter.ai/keys) 註冊並獲取 API Key
2. 複製 `.env.example` 為 `.env`
3. 在 `.env` 檔案中填入您的 API Key：

```bash
OPENROUTER_API_KEY=your_actual_api_key_here
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

## 技術架構

- **前端框架**: Nuxt 3 + Vue 3
- **樣式**: Tailwind CSS
- **API**: OpenRouter (DeepSeek Chat V3.1 免費模型)
- **部署**: 可部署至 Vercel、Netlify 等平台

## 注意事項

- 免費帳戶有每日請求次數限制
- API Key 儲存在伺服器端，不會暴露給客戶端
- 建議在生產環境中使用環境變數管理 API Key

## 部署

### Vercel

```bash
npm run build
```

然後在 Vercel 專案設定中添加環境變數 `OPENROUTER_API_KEY`

### 其他平台

確保在部署平台的環境變數中設定 `OPENROUTER_API_KEY`

## 授權

MIT License

