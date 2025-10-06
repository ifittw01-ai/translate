export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabase = useSupabaseClient()
  
  const { inputText, translations } = body
  
  if (!inputText || !translations) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters',
    })
  }
  
  try {
    const { data, error } = await supabase
      .from('translation_history')
      .insert([
        {
          input_text: inputText,
          translations: translations,
          timestamp: new Date().toISOString(),
        }
      ])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`,
      })
    }
    
    return {
      success: true,
      data: data[0]
    }
  } catch (error: any) {
    console.error('Save history error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to save history',
    })
  }
})

