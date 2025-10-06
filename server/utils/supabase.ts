import { createClient } from '@supabase/supabase-js'

export const useSupabaseClient = () => {
  const config = useRuntimeConfig()
  
  if (!config.supabaseUrl || !config.supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase configuration is missing',
    })
  }
  
  return createClient(config.supabaseUrl, config.supabaseKey)
}

