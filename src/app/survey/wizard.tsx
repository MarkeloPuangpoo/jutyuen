'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSurveyStore } from '@/store/survey'
import { submitSurvey } from '@/actions/submit-survey'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Loader2, Sparkles } from 'lucide-react'

type Question = {
  id: string
  content: string
}

const SCALE_LABELS = [
  'ไม่เห็นด้วย\nอย่างยิ่ง',
  'ไม่เห็นด้วย',
  'ค่อนข้าง\nไม่เห็นด้วย',
  'ค่อนข้าง\nเห็นด้วย',
  'เห็นด้วย',
  'เห็นด้วย\nอย่างยิ่ง',
]

function getSectionLabel(index: number): string {
  if (index < 8) return 'เศรษฐกิจ'
  if (index < 16) return 'อำนาจ'
  if (index < 24) return 'สังคม'
  if (index < 32) return 'การต่างประเทศ'
  return 'โมดูลเสริม'
}

export default function SurveyWizard({
  questions,
  sessionId,
}: {
  questions: Question[]
  sessionId: string
}) {
  const router = useRouter()
  const { setSessionId, setAnswer, getAnswersArray } = useSurveyStore()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedScore, setSelectedScore] = useState<number | null>(null)

  // Initialize session id in store
  useEffect(() => {
    setSessionId(sessionId)
    setStartTime(Date.now())
  }, [sessionId, setSessionId])

  if (!questions || questions.length === 0) {
    return <div className="p-8 text-center">ไม่มีคำถามในระบบ</div>
  }

  const currentQuestion = questions[currentIndex]
  const progressPercent = ((currentIndex) / questions.length) * 100
  const isLastQuestion = currentIndex === questions.length - 1

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNext = useCallback(async () => {
    if (isSubmitting || selectedScore === null) return

    const timeSpent = Date.now() - startTime

    // Save answer to store
    setAnswer(currentQuestion.id, selectedScore, timeSpent)

    // Check if it's the last question
    if (currentIndex === questions.length - 1) {
      setIsSubmitting(true)
      try {
        const payload = {
          session_id: sessionId,
          responses: getAnswersArray(),
        }
        // Force the last answer into the payload since state might batch
        const existingAnswers = payload.responses.filter(r => r.question_id !== currentQuestion.id)
        payload.responses = [...existingAnswers, { question_id: currentQuestion.id, raw_score: selectedScore, time_spent_ms: timeSpent }]

        const res = await submitSurvey(payload)

        if (res.success) {
          router.push(`/results/${sessionId}`)
        } else {
          console.error('Submission failed')
          setIsSubmitting(false)
        }
      } catch (error) {
        console.error('Error submitting survey:', error)
        setIsSubmitting(false)
      }
    } else {
      // Go to next question
      setSelectedScore(null)
      setCurrentIndex((prev) => prev + 1)
      setStartTime(Date.now())
    }
  }, [isSubmitting, selectedScore, startTime, currentIndex, currentQuestion, questions.length, sessionId, setAnswer, getAnswersArray, router])

  // Keyboard support: 1-6 to select, Enter to proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitting) return
      const num = parseInt(e.key, 10)
      if (num >= 1 && num <= 6) {
        setSelectedScore(num)
      }
      if (e.key === 'Enter' && selectedScore !== null) {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSubmitting, selectedScore, handleNext])

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 space-y-10 overflow-hidden">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
          <span>{getSectionLabel(currentIndex)}</span>
          <span className="tabular-nums">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full progress-gradient"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="space-y-10"
        >
          {/* Question Card */}
          <div className="gradient-border bg-card text-card-foreground rounded-2xl p-8 md:p-12 min-h-[220px] flex flex-col justify-center relative">
            <span className="absolute top-4 left-4 md:top-6 md:left-6 text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              Q.{currentIndex + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-center mt-4">
              {currentQuestion.content}
            </h2>
          </div>

          {/* 1-6 Scale Options */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-6 gap-2 md:gap-3">
              {[1, 2, 3, 4, 5, 6].map((score) => {
                const isSelected = selectedScore === score
                return (
                  <button
                    key={score}
                    type="button"
                    className={`h-14 md:h-16 rounded-full text-lg font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isSelected
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-105'
                        : 'border border-border hover:border-primary/40 hover:bg-primary/5'
                    }`}
                    onClick={() => setSelectedScore(score)}
                    disabled={isSubmitting}
                  >
                    {score}
                  </button>
                )
              })}
            </div>
            {/* Per-button labels */}
            <div className="grid grid-cols-6 gap-2 md:gap-3">
              {SCALE_LABELS.map((label, i) => (
                <p key={i} className="text-[10px] md:text-xs text-muted-foreground text-center leading-tight whitespace-pre-line">
                  {label}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Area */}
      <div className="pt-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {isSubmitting && (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              กำลังประมวลผลคำตอบของคุณ...
            </span>
          )}
        </div>
        <Button
          size="lg"
          onClick={handleNext}
          disabled={selectedScore === null || isSubmitting}
          className={`w-full sm:w-auto text-base gap-2 rounded-xl ${
            isLastQuestion ? 'progress-gradient border-0 text-white hover:opacity-90' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              กำลังส่ง...
            </>
          ) : isLastQuestion ? (
            <>
              <Sparkles className="w-5 h-5" />
              ดูผลลัพธ์
            </>
          ) : (
            <>
              ถัดไป
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
