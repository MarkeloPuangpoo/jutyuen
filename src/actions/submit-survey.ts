'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'

type AxisType = Database['public']['Enums']['axis_type']

export type SurveyResponseInput = {
  question_id: string
  raw_score: number
  time_spent_ms: number
}

export type SubmitSurveyPayload = {
  session_id: string
  responses: SurveyResponseInput[]
}

// Function to calculate CDF of standard normal distribution for percentile estimation
function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp((-z * z) / 2)
  const probability =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return z > 0 ? 1 - probability : probability
}

export async function submitSurvey(payload: SubmitSurveyPayload) {
  const supabase = await createClient()
  const { session_id, responses } = payload

  // 1. Save raw responses to the `responses` table
  const responsesToInsert = responses.map((r) => ({
    session_id,
    question_id: r.question_id,
    raw_score: r.raw_score,
    time_spent_ms: r.time_spent_ms,
  }))

  const { error: insertResponsesError } = await supabase
    .from('responses')
    .insert(responsesToInsert)

  if (insertResponsesError) {
    console.error('Error inserting responses:', insertResponsesError)
    throw new Error('Failed to save responses')
  }

  // 2. Fetch all questions to get axis and is_reverse metadata
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('id, axis, is_reverse')

  if (questionsError || !questions) {
    throw new Error('Failed to fetch questions for scoring')
  }

  const questionMap = new Map<string, { axis: AxisType; is_reverse: boolean }>()
  questions.forEach((q) => {
    questionMap.set(q.id, { axis: q.axis, is_reverse: q.is_reverse })
  })

  // 3. Implement Scoring Logic (Reverse coding, Scaling, Axis Aggregation)
  // Group scaled scores by axis
  const axisScores = new Map<AxisType, number[]>()

  for (const r of responses) {
    const qMeta = questionMap.get(r.question_id)
    if (!qMeta) continue

    const { axis, is_reverse } = qMeta
    
    // Reverse coding: R_rev = 7 - R
    const finalRaw = is_reverse ? 7 - r.raw_score : r.raw_score
    
    // Scaling: 1-6 to 0-100 (S = ((R - 1) / 5) * 100)
    const scaledScore = ((finalRaw - 1) / 5) * 100

    if (!axisScores.has(axis)) {
      axisScores.set(axis, [])
    }
    axisScores.get(axis)!.push(scaledScore)
  }

  // Fetch Norms Data for percentile calculation
  const { data: normsData } = await supabase.from('norms_data').select('*')
  const normsMap = new Map<AxisType, { mean: number; std: number }>()
  if (normsData) {
    normsData.forEach((n) => {
      normsMap.set(n.axis, { mean: n.mean_score, std: n.std_dev })
    })
  }

  // Calculate final metrics per axis
  const resultsToInsert: any[] = []
  const payloadToReturn: any = {
    session_id,
    axes: {},
  }

  for (const [axis, scores] of Array.from(axisScores.entries())) {
    const n = scores.length
    if (n === 0) continue

    // Axis Aggregation (Average score per axis)
    const axisScore = scores.reduce((sum, s) => sum + s, 0) / n

    // Confidence Interval / Margin of Error (95% CI)
    let margin_of_error = 0.0
    if (n > 1) {
      const variance =
        scores.reduce((sum, x) => sum + Math.pow(x - axisScore, 2), 0) / (n - 1)
      const sd = Math.sqrt(variance)
      margin_of_error = 1.96 * (sd / Math.sqrt(n))
    }

    // Percentile Calculation
    let percentile = 50.0 // Default fallback
    const norm = normsMap.get(axis)
    if (norm && norm.std > 0) {
      // Calculate Z-score and use normal CDF
      const z = (axisScore - norm.mean) / norm.std
      percentile = normalCDF(z) * 100
    }

    // Format to 2 decimal places
    const finalScore = parseFloat(axisScore.toFixed(2))
    const finalMoE = parseFloat(margin_of_error.toFixed(2))
    const finalPercentile = parseFloat(percentile.toFixed(2))

    resultsToInsert.push({
      session_id,
      axis,
      score: finalScore,
      margin_of_error: finalMoE,
      percentile: finalPercentile,
    })

    payloadToReturn.axes[axis] = {
      score: finalScore,
      margin_of_error: finalMoE,
      percentile: finalPercentile,
    }
  }

  // 4. Save the calculated results to the `survey_results` table
  if (resultsToInsert.length > 0) {
    const { error: insertResultsError } = await supabase
      .from('survey_results')
      .insert(resultsToInsert)

    if (insertResultsError) {
      console.error('Error inserting survey results:', insertResultsError)
      throw new Error('Failed to save survey results')
    }
  }

  // Update session status to completed
  await supabase
    .from('survey_sessions')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', session_id)

  // Return the data payload for the frontend to render
  return {
    success: true,
    data: payloadToReturn,
  }
}
