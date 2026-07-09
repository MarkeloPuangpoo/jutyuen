'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { Database } from '@/types/database.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Link2, Check } from 'lucide-react'

type SurveyResult = Database['public']['Tables']['survey_results']['Row']

const axisMeta: Record<string, { label: string; minLabel: string; maxLabel: string }> = {
  economic: { label: 'เศรษฐกิจ (Economic)', minLabel: 'ความเท่าเทียม (Equality)', maxLabel: 'กลไกตลาด (Markets)' },
  authority: { label: 'อำนาจ (Authority)', minLabel: 'เสรีภาพส่วนบุคคล (Liberty)', maxLabel: 'อำนาจส่วนกลาง (Authority)' },
  social: { label: 'สังคม (Social)', minLabel: 'จารีตเดิม (Tradition)', maxLabel: 'การเปลี่ยนแปลง (Progress)' },
  international: { label: 'ความสัมพันธ์ระหว่างประเทศ', minLabel: 'ชาตินิยม (Nation)', maxLabel: 'สากลนิยม (Globe)' },
  centralization: { label: 'โครงสร้างรัฐ', minLabel: 'ศูนย์กลาง (Centralization)', maxLabel: 'กระจายอำนาจ (Decentralization)' },
  religiosity: { label: 'ศาสนา-โลกวิสัย', minLabel: 'บทบาทศาสนา (Religiosity)', maxLabel: 'โลกวิสัย (Secularism)' },
}

const axisColors: Record<string, string> = {
  economic: 'oklch(0.55 0.20 250)',
  authority: 'oklch(0.55 0.20 25)',
  social: 'oklch(0.55 0.20 155)',
  international: 'oklch(0.60 0.20 70)',
}

const contextualColors: Record<string, string> = {
  centralization: 'oklch(0.55 0.18 320)',
  religiosity: 'oklch(0.55 0.18 50)',
}

export default function ResultsDisplay({ results }: { results: SurveyResult[] }) {
  const [copied, setCopied] = useState(false)

  if (!results || results.length === 0) {
    return <div className="p-8 text-center">ไม่พบข้อมูลผลลัพธ์</div>
  }

  const coreAxesKeys = ['economic', 'authority', 'social', 'international']
  const coreResults = results.filter((r) => coreAxesKeys.includes(r.axis))
  const contextualResults = results.filter((r) => !coreAxesKeys.includes(r.axis))

  const radarData = coreResults.map((r) => ({
    subject: axisMeta[r.axis]?.label || r.axis,
    score: r.score,
    fullMark: 100,
  }))

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = window.location.href
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 animate-in fade-in duration-700">
      {/* ── Header ── */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <span className="bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
            จุดยืน
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-heading)] italic text-4xl md:text-5xl tracking-tight">
          ผลลัพธ์ทัศนคติทางการเมืองของคุณ
        </h1>
        <p className="text-muted-foreground text-lg">
          การวิเคราะห์จาก 4 แกนหลัก และโมดูลเสริมตามบริบท
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Radar Chart */}
        <Card className="glass rounded-2xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">ภาพรวม 4 มิติ</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid strokeOpacity={0.15} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 500 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="คะแนนของคุณ"
                  dataKey="score"
                  stroke="oklch(0.55 0.22 280)"
                  strokeWidth={2.5}
                  fill="oklch(0.55 0.22 280)"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Core Axis Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">รายละเอียดแต่ละแกน</h3>
          {coreResults.map((r) => {
            const meta = axisMeta[r.axis]
            const color = axisColors[r.axis] || 'oklch(0.55 0.20 250)'
            const leaning = r.score > 50 ? meta.maxLabel : r.score < 50 ? meta.minLabel : 'สายกลาง'
            return (
              <Card
                key={r.axis}
                className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Gradient top strip */}
                <div
                  className="h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                />
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{meta.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        จุดยืน: <span className="font-medium text-foreground">{leaning}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold" style={{ color }}>
                        {r.score.toFixed(1)}
                      </span>
                      <div className="text-xs text-muted-foreground">± {r.margin_of_error} (MoE)</div>
                      <div className="text-xs text-muted-foreground">
                        Percentile: {r.percentile}%
                      </div>
                    </div>
                  </div>
                  {/* Mini progress bar */}
                  <div className="relative h-2 bg-secondary rounded-full overflow-hidden mt-3">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${r.score}%`, backgroundColor: color }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1 uppercase font-semibold tracking-wider">
                    <span>{meta.minLabel}</span>
                    <span>{meta.maxLabel}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* ── Contextual Modules ── */}
      {contextualResults.length > 0 && (
        <div className="space-y-6 pt-8 border-t">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl font-bold">โมดูลเสริมตามบริบทสังคมไทย</h3>
            <p className="text-muted-foreground text-sm">
              แกนเหล่านี้เป็นอิสระและไม่ส่งผลต่อ 4 แกนหลัก
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contextualResults.map((r) => {
              const meta = axisMeta[r.axis]
              const color = contextualColors[r.axis] || 'oklch(0.55 0.18 320)'
              const leaning = r.score > 50 ? meta.maxLabel : r.score < 50 ? meta.minLabel : 'สายกลาง'

              // Bidirectional bar: fill starts from 50% center
              const barLeft = r.score >= 50 ? '50%' : `${r.score}%`
              const barWidth = Math.abs(r.score - 50)

              return (
                <Card
                  key={r.axis}
                  className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="h-[3px] w-full"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                  />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{meta.label}</CardTitle>
                    <CardDescription>
                      จุดยืน: <span className="font-medium text-foreground">{leaning}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-end mb-2">
                      <div className="text-3xl font-black" style={{ color }}>
                        {r.score.toFixed(1)}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-muted-foreground">
                          ± {r.margin_of_error} MoE
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Percentile: {r.percentile}%
                        </div>
                      </div>
                    </div>
                    {/* Bidirectional progress bar with center marker */}
                    <div className="relative pt-4">
                      <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
                        <span className="max-w-[40%] leading-tight">{meta.minLabel}</span>
                        <span className="max-w-[40%] text-right leading-tight">{meta.maxLabel}</span>
                      </div>
                      <div className="relative w-full h-3 bg-secondary rounded-full overflow-hidden">
                        {/* Fill from center */}
                        <div
                          className="absolute h-full rounded-full transition-all duration-1000"
                          style={{
                            left: barLeft,
                            width: `${barWidth}%`,
                            backgroundColor: color,
                          }}
                        />
                        {/* Center marker at 50% */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-foreground/40" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Action Buttons ── */}
      <div className="flex gap-4 justify-center pt-4">
        <Link href="/">
          <Button variant="outline" className="rounded-xl cursor-pointer">
            <RotateCcw className="mr-2 h-4 w-4" />
            ทำแบบสำรวจอีกครั้ง
          </Button>
        </Link>
        <Button variant="default" className="rounded-xl" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              คัดลอกแล้ว!
            </>
          ) : (
            <>
              <Link2 className="mr-2 h-4 w-4" />
              คัดลอกลิงก์ผลลัพธ์
            </>
          )}
        </Button>
      </div>

      {/* ── Footer Disclaimer ── */}
      <p className="text-center text-xs text-muted-foreground pb-8">
        * ผลลัพธ์นี้เป็นเพียงการประมาณค่าจากเครื่องมือวัด ไม่ใช่การตัดสินตัวตนหรืออุดมการณ์ของคุณอย่างสมบูรณ์
      </p>
    </div>
  )
}
