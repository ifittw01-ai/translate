export default defineEventHandler(async (event) => {
  const supabase = useSupabaseClient()
  
  try {
    const { error } = await supabase
      .from('translation_history')
      .delete()
      .neq('id', 0) // This deletes all records
    
    if (error) {
      console.error('Supabase error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`,
      })
    }
    
    return {
      success: true,
      message: 'All history cleared'
    }
  } catch (error: any) {
    console.error('Clear history error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to clear history',
    })
  }
})

