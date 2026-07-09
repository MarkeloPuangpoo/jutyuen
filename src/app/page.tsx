import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Shield, Users, Globe, ArrowRight, BookOpen, MousePointerClick, BarChart3 } from 'lucide-react'

const axes = [
  {
    icon: TrendingUp,
    title: 'เศรษฐกิจ',
    titleEn: 'Economic',
    poles: 'ความเท่าเทียม (Equality) — กลไกตลาด (Markets)',
    description: 'คุณเชื่อในการกระจายรายได้โดยรัฐ หรือเชื่อในประสิทธิภาพของตลาดเสรี?',
    color: 'oklch(0.55 0.20 250)',
  },
  {
    icon: Shield,
    title: 'อำนาจ',
    titleEn: 'Authority',
    poles: 'เสรีภาพส่วนบุคคล (Liberty) — อำนาจส่วนกลาง (Authority)',
    description: 'เส้นแบ่งระหว่างสิทธิเสรีภาพ กับความมั่นคงของรัฐควรอยู่จุดใด?',
    color: 'oklch(0.55 0.20 25)',
  },
  {
    icon: Users,
    title: 'สังคม',
    titleEn: 'Social',
    poles: 'จารีตเดิม (Tradition) — การเปลี่ยนแปลง (Progress)',
    description: 'สังคมควรยึดมั่นในค่านิยมดั้งเดิม หรือโอบรับบรรทัดฐานใหม่?',
    color: 'oklch(0.55 0.20 155)',
  },
  {
    icon: Globe,
    title: 'การต่างประเทศ',
    titleEn: 'International',
    poles: 'ชาตินิยม (Nation) — สากลนิยม (Globe)',
    description: 'ผลประโยชน์ชาติมาก่อน หรือกติกาสากลคือสิ่งที่ต้องร่วมมือ?',
    color: 'oklch(0.60 0.20 70)',
  },
]

const steps = [
  {
    icon: BookOpen,
    step: '01',
    title: 'อ่านคำถาม',
    description: '40 ข้อคำถามที่ออกแบบให้สมดุลทั้งสองขั้ว ไม่มีคำตอบถูกผิด',
  },
  {
    icon: MousePointerClick,
    step: '02',
    title: 'ให้คะแนน 1–6',
    description: 'ประเมินจุดยืนของคุณตั้งแต่ไม่เห็นด้วยอย่างยิ่งจนถึงเห็นด้วยอย่างยิ่ง',
  },
  {
    icon: BarChart3,
    step: '03',
    title: 'ดูผลลัพธ์',
    description: 'ผลวิเคราะห์ผ่าน Radar Chart 4 แกน พร้อมช่วงความเชื่อมั่นและเปอร์เซ็นไทล์',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[300px] -right-[200px] w-[600px] h-[600px] rounded-full animate-soft-pulse"
          style={{ background: 'radial-gradient(circle, oklch(0.55 0.22 280 / 0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[40%] -left-[200px] w-[500px] h-[500px] rounded-full animate-soft-pulse"
          style={{ background: 'radial-gradient(circle, oklch(0.55 0.22 300 / 0.06) 0%, transparent 70%)', animationDelay: '1.5s' }}
        />
        <div
          className="absolute -bottom-[200px] right-[20%] w-[400px] h-[400px] rounded-full animate-soft-pulse"
          style={{ background: 'radial-gradient(circle, oklch(0.55 0.22 250 / 0.05) 0%, transparent 70%)', animationDelay: '3s' }}
        />
      </div>

      <main className="relative flex-1 w-full max-w-5xl mx-auto flex flex-col items-center py-16 md:py-24 px-6 sm:px-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            40 คำถาม · ประมาณ 5 นาที
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            <span className="font-[family-name:var(--font-heading)] italic">ค้นหา</span>
            <span className="text-gradient">จุดยืน</span>
            <br />
            <span className="text-muted-foreground font-normal text-3xl md:text-4xl lg:text-5xl">ทางการเมืองของคุณ</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            วิเคราะห์ทัศนคติผ่าน 4 แกนอิสระ ด้วยแบบสอบถามที่ออกแบบ
            ตามหลักจิตวิทยาการวัด — ไม่ใช่แค่ซ้าย-ขวา
          </p>

          <div className="pt-2">
            <Link href="/survey">
              <Button
                size="lg"
                className="h-13 px-8 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 glow-primary gap-2 cursor-pointer"
              >
                เริ่มทำแบบสำรวจ
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Axes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
          {axes.map((axis) => {
            const Icon = axis.icon
            return (
              <Card
                key={axis.titleEn}
                className="glass rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden"
              >
                {/* Top accent strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${axis.color}, transparent)` }}
                />
                <CardContent className="p-6 pt-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `color-mix(in oklch, ${axis.color} 15%, transparent)` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: axis.color }} />
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="font-semibold text-base text-foreground">
                        {axis.title}{' '}
                        <span className="text-muted-foreground font-normal text-sm">
                          {axis.titleEn}
                        </span>
                      </h3>
                      <p className="text-xs text-muted-foreground/80 font-medium">{axis.poles}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{axis.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* How it works */}
        <div className="w-full mt-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <h2 className="text-center text-xl font-semibold text-foreground mb-10">
            <span className="font-[family-name:var(--font-heading)] italic text-2xl">วิธีใช้งาน</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.step} className="text-center space-y-3 group">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary/60 tracking-widest uppercase">{s.step}</div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">{s.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border/50 w-full text-center space-y-3 animate-in fade-in duration-1000 delay-500 fill-mode-both">
          <p className="text-xs text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
            * ข้อมูลของคุณจะถูกเก็บเป็นความลับและไม่มีการระบุตัวตน 
            ระบบประมวลผลตามอัลกอริทึมที่ออกแบบเพื่อลดความลำเอียง (Bias) 
            และรายงานผลพร้อมช่วงความเชื่อมั่นทางสถิติ
          </p>
          <p className="text-xs text-muted-foreground/50">
            จุดยืน — Political Attitude Survey
          </p>
        </footer>
      </main>
    </div>
  )
}
