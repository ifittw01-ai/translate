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
    const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.openrouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://localhost:3000',
        'X-Title': 'Multi-Language Translator',
      },
      body: {
        model: 'deepseek/deepseek-chat-v3.1:free',
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
  } catch (error: any) {
    console.error('Translation error:', error)
    
    let errorMessage = error.data?.error?.message || error.message || 'Unknown error'
    
    if (errorMessage.includes('free-models-per-day') || errorMessage.includes('Rate limit exceeded')) {
      errorMessage = '已達每日免費額度上限，請明天再試或添加額度'
    } else if (errorMessage.includes('429')) {
      errorMessage = '請求過於頻繁，請稍後再試'
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

