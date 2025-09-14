import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')

export interface QuizScore {
  id?: string
  user_id: string
  user_email: string
  programming_language: string
  score: number
  total_questions: number
  completed_at: string
  quiz_data: any
}