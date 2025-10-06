<template>
  <div class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">🌍 多語言翻譯機</h1>
        <p class="text-gray-600">支援英文、日語、繁體中文、簡體中文、法文翻譯</p>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Input Section -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div class="mb-4">
            <label for="inputText" class="block text-sm font-medium text-gray-700 mb-2">
              請輸入要翻譯的文字：
            </label>
            <textarea
              id="inputText"
              v-model="inputText"
              placeholder="輸入任何語言的文字..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            ></textarea>
          </div>

          <button
            @click="translateText"
            :disabled="!inputText.trim() || isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              翻譯中...
            </span>
            <span v-else>🚀 開始翻譯</span>
          </button>
        </div>

        <!-- Results Section -->
        <div v-if="translations.length > 0" class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">翻譯結果</h2>
          
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="translation in translations"
              :key="translation.language"
              class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
            >
              <div class="flex items-center mb-2">
                <span class="text-2xl mr-2">{{ translation.flag }}</span>
                <h3 class="font-semibold text-gray-800">{{ translation.language }}</h3>
              </div>
              <p class="text-gray-700 leading-relaxed">{{ translation.text }}</p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            {{ errorMessage }}
          </div>
        </div>

        <!-- Quota Limit Warning -->
        <div v-if="hasQuotaLimitError" class="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-semibold">⚠️ 已達每日免費額度上限</p>
              <p class="text-sm mt-1">
                您的 OpenRouter 免費額度已用完。您可以：
              </p>
              <ul class="text-sm mt-2 space-y-1">
                <li>• 等待明天額度重置後再試</li>
                <li>• 前往 <a href="https://openrouter.ai/credits" target="_blank" class="underline hover:text-yellow-900">OpenRouter</a> 添加 $10 額度（可獲得 1000 次請求）</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div v-if="translations.length === 0 && !errorMessage" class="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-semibold">使用說明：</p>
              <ul class="mt-1 text-sm space-y-1">
                <li>• 在上方文字框中輸入要翻譯的文字</li>
                <li>• 點擊「開始翻譯」按鈕</li>
                <li>• 系統會將文字翻譯成五種語言並顯示結果</li>
                <li>• 注意：免費帳戶有每日請求次數限制</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Translation {
  language: string
  flag: string
  text: string
}

interface Language {
  code: string
  name: string
  flag: string
}

const inputText = ref('')
const translations = ref<Translation[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const hasQuotaLimitError = computed(() => {
  return translations.value.some(t => 
    t.text && t.text.includes('已達每日免費額度上限')
  )
})

const translateText = async () => {
  if (!inputText.value.trim()) {
    errorMessage.value = '請輸入文字'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  translations.value = []

  try {
    // 定義要翻譯的語言
    const languages: Language[] = [
      { code: 'en', name: '英文', flag: '🇺🇸' },
      { code: 'ja', name: '日語', flag: '🇯🇵' },
      { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
      { code: 'zh-CN', name: '簡體中文', flag: '🇨🇳' },
      { code: 'fr', name: '法文', flag: '🇫🇷' }
    ]

    // 為每種語言創建翻譯請求
    const translationPromises = languages.map(async (lang) => {
      try {
        const result = await $fetch<Translation>('/api/translate', {
          method: 'POST',
          body: {
            inputText: inputText.value,
            targetLanguage: lang
          }
        })
        return result
      } catch (error: any) {
        console.error(`翻譯 ${lang.name} 時發生錯誤:`, error)
        return {
          language: lang.name,
          flag: lang.flag,
          text: `翻譯失敗: ${error.message || '未知錯誤'}`
        }
      }
    })

    // 等待所有翻譯完成
    translations.value = await Promise.all(translationPromises)

  } catch (error: any) {
    console.error('翻譯過程中發生錯誤:', error)
    errorMessage.value = `翻譯失敗: ${error.message || '未知錯誤'}`
  } finally {
    isLoading.value = false
  }
}
</script>

