export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const supabase = useSupabaseClient()
  
  const { id } = query
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing id parameter',
    })
  }
  
  try {
    const { error } = await supabase
      .from('translation_history')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Supabase error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`,
      })
    }
    
    return {
      success: true,
      message: 'History item deleted'
    }
  } catch (error: any) {
    console.error('Delete history error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to delete history',
    })
  }
})

