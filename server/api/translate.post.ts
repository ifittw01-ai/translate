export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const { inputText, targetLanguage } = body
  
  if (!inputText || !targetLanguage) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters',
    })
  }
  
  if (!config.openrouterApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenRouter API key is not configured',
    })
  }
  
  try {
    // 使用重試機制處理速率限制
    let retries = 2
    let lastError = null
    
    while (retries >= 0) {
      try {
        const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.openrouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://localhost:3000',
            'X-Title': 'Multi-Language Translator',
          },
          body: {
            model: 'google/gemini-2.0-flash-exp:free',  // Alternative free model
            messages: [
              {
                role: 'system',
                content: `請將以下文字翻譯成${targetLanguage.name}。只回傳翻譯結果，不要添加任何其他文字或解釋。`,
              },
              {
                role: 'user',
                content: inputText,
              },
            ],
            max_tokens: 1000,
            temperature: 0.3,
          },
        })
        
        return {
          language: targetLanguage.name,
          flag: targetLanguage.flag,
          text: response.choices[0].message.content.trim(),
        }
      } catch (err: any) {
        lastError = err
        if (err.statusCode === 429 && retries > 0) {
          // 如果是速率限制，等待後重試
          await new Promise(resolve => setTimeout(resolve, 2000))
          retries--
          continue
        }
        throw err
      }
    }
    
    throw lastError
  } catch (error: any) {
    console.error('Translation error:', error)
    
    let errorMessage = error.data?.error?.message || error.message || 'Unknown error'
    
    if (errorMessage.includes('data policy') || errorMessage.includes('No endpoints found')) {
      errorMessage = '需要啟用免費模型權限。請前往 https://openrouter.ai/settings/privacy 勾選「Allow free model usage」或添加付費額度'
    } else if (error.statusCode === 429 || errorMessage.includes('429') || errorMessage.includes('Too Many Requests')) {
      errorMessage = '請求速率過快或已達免費額度上限。建議：1) 稍後再試 2) 添加付費額度（每次翻譯不到 $0.0001）'
    } else if (errorMessage.includes('free-models-per-day') || errorMessage.includes('Rate limit exceeded')) {
      errorMessage = '已達每日免費額度上限，請明天再試或添加付費額度'
    } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      errorMessage = 'API Key 無效，請檢查您的 OpenRouter API Key'
    }
    
    return {
      language: targetLanguage.name,
      flag: targetLanguage.flag,
      text: `翻譯失敗: ${errorMessage}`,
    }
  }
})

