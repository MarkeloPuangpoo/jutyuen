import { createClient } from '@/lib/supabase/server'
import SurveyWizard from './wizard'

export default async function SurveyPage() {
  const supabase = await createClient()

  // 1. Fetch active questions from DB
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('id, content')
    .eq('is_active', true)
    // You could add order by random() or id here depending on need
    // .order('id')

  if (questionsError || !questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">ไม่พบข้อคำถามในระบบ หรือเกิดข้อผิดพลาด</h1>
      </div>
    )
  }

  // 2. Create a new Survey Session (Anonymous)
  const { data: session, error: sessionError } = await supabase
    .from('survey_sessions')
    .insert([{ status: 'started' }])
    .select('id')
    .single()

  if (sessionError || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">ไม่สามารถสร้าง Session ได้ กรุณาลองใหม่</h1>
      </div>
    )
  }

  // 3. Render the client-side Survey Wizard
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <SurveyWizard questions={questions} sessionId={session.id} />
    </div>
  )
}
