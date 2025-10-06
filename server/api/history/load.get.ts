export default defineEventHandler(async (event) => {
  const supabase = useSupabaseClient()
  
  try {
    const { data, error } = await supabase
      .from('translation_history')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50)
    
    if (error) {
      console.error('Supabase error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`,
      })
    }
    
    return {
      success: true,
      data: data || []
    }
  } catch (error: any) {
    console.error('Load history error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to load history',
    })
  }
})

