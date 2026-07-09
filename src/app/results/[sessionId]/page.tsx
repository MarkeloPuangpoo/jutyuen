import { createClient } from '@/lib/supabase/server'
import ResultsDisplay from './results-display'
import { redirect } from 'next/navigation'

export default async function ResultsPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  
  if (!sessionId) {
    redirect('/')
  }

  const supabase = await createClient()

  // Fetch results for the given session ID
  const { data: results, error } = await supabase
    .from('survey_results')
    .select('*')
    .eq('session_id', sessionId)
  
  if (error || !results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-destructive">ไม่พบข้อมูลผลลัพธ์</h1>
          <p className="text-muted-foreground">ไม่พบข้อมูลสำหรับ Session ID นี้ หรือคุณยังทำแบบสอบถามไม่เสร็จ</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ResultsDisplay results={results} />
    </div>
  )
}
