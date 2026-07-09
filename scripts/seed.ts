import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const questions = [
  // Economic (เศรษฐกิจ)
  {
    axis: 'economic',
    category: 'value',
    content: 'ความมั่งคั่งของมหาเศรษฐีในปัจจุบัน เป็นผลมาจากโครงสร้างที่เอื้อประโยชน์ให้คนกลุ่มน้อย มากกว่ามาจากความพยายามส่วนบุคคล',
    is_reverse: false,
  },
  {
    axis: 'economic',
    category: 'value',
    content: 'รัฐมีหน้าที่รับผิดชอบโดยตรงในการดูแลให้ประชาชนทุกคนมีที่อยู่อาศัยและเข้าถึงการรักษาพยาบาลได้โดยไม่ล้มละลาย',
    is_reverse: false,
  },
  {
    axis: 'economic',
    category: 'value',
    content: 'การปล่อยให้ภาคเอกชนแข่งขันกันอย่างอิสระ เป็นวิธีที่ดีที่สุดในการยกระดับคุณภาพชีวิตของคนทั้งประเทศ',
    is_reverse: true,
  },
  {
    axis: 'economic',
    category: 'value',
    content: 'ผู้ที่ทำงานหนักและสร้างนวัตกรรม สมควรได้รับผลตอบแทนทางรายได้ที่สูงกว่าคนทั่วไปอย่างไม่มีขีดจำกัด',
    is_reverse: true,
  },
  {
    axis: 'economic',
    category: 'policy',
    content: 'รัฐควรนำภาษีความมั่งคั่ง (Wealth Tax) หรือภาษีมรดกในอัตราสูงมาใช้ เพื่อนำเงินไปจัดสวัสดิการถ้วนหน้า',
    is_reverse: false,
  },
  {
    axis: 'economic',
    category: 'policy',
    content: 'ควรมีการออกกฎหมายกำหนดเพดานส่วนต่างระหว่างเงินเดือนผู้บริหารระดับสูงกับพนักงานระดับล่างสุดภายในองค์กร',
    is_reverse: false,
  },
  {
    axis: 'economic',
    category: 'policy',
    content: 'รัฐควรยกเลิกการควบคุมราคาสินค้าและปล่อยให้กลไกตลาดทำงานตามอุปสงค์อุปทาน',
    is_reverse: true,
  },
  {
    axis: 'economic',
    category: 'policy',
    content: 'กิจการของรัฐที่ผูกขาดและขาดทุน ควรถูกขายให้บริษัทเอกชนนำไปบริหารจัดการแทน',
    is_reverse: true,
  },

  // Authority (อำนาจ)
  {
    axis: 'authority',
    category: 'value',
    content: 'รัฐไม่มีสิทธิ์ก้าวก่ายรสนิยมหรือวิถีชีวิตส่วนตัวของประชาชน ตราบใดที่สิ่งนั้นไม่ได้ไปทำร้ายบุคคลอื่น',
    is_reverse: false,
  },
  {
    axis: 'authority',
    category: 'value',
    content: 'การวิพากษ์วิจารณ์ผู้มีอำนาจและสถาบันหลักของสังคม เป็นสิทธิขั้นพื้นฐานที่ทุกคนพึงมี',
    is_reverse: false,
  },
  {
    axis: 'authority',
    category: 'value',
    content: 'สังคมจะปลอดภัยและก้าวหน้าได้ ประชาชนต้องรู้จักหน้าที่และเคารพกฎระเบียบอย่างเคร่งครัด',
    is_reverse: true,
  },
  {
    axis: 'authority',
    category: 'value',
    content: 'ในสถานการณ์ที่ประเทศเผชิญวิกฤต เสรีภาพของสื่อมวลชนเป็นสิ่งที่รัฐสามารถสั่งระงับชั่วคราวได้',
    is_reverse: true,
  },
  {
    axis: 'authority',
    category: 'policy',
    content: 'รัฐควรยกเลิกความผิดทางอาญาสำหรับผู้ที่ทำแท้งด้วยความสมัครใจในทุกกรณี',
    is_reverse: false,
  },
  {
    axis: 'authority',
    category: 'policy',
    content: 'ควรห้ามหน่วยงานรัฐใช้เทคโนโลยีสอดแนมข้อมูลส่วนบุคคลของประชาชนโดยเด็ดขาด หากไม่มีคำสั่งศาล',
    is_reverse: false,
  },
  {
    axis: 'authority',
    category: 'policy',
    content: 'รัฐควรมีอำนาจสั่งระงับเนื้อหาบนโซเชียลมีเดียที่ขัดต่อศีลธรรมอันดีหรือสร้างความแตกแยก',
    is_reverse: true,
  },
  {
    axis: 'authority',
    category: 'policy',
    content: 'ควรให้อำนาจพิเศษแก่หน่วยงานความมั่นคงในการเข้าถึงข้อมูลผู้ต้องสงสัย เพื่อป้องกันภัยคุกคามรูปแบบใหม่',
    is_reverse: true,
  },

  // Social (สังคม)
  {
    axis: 'social',
    category: 'value',
    content: 'ประเพณีหรือความเชื่อใดที่ล้าหลังและสร้างความไม่เท่าเทียม สังคมควรพร้อมใจกันยกเลิกโดยไม่ต้องเสียดาย',
    is_reverse: false,
  },
  {
    axis: 'social',
    category: 'value',
    content: 'ความหลากหลายทางเพศ ชาติพันธุ์ และวัฒนธรรม คือจุดแข็งที่ทำให้สังคมพัฒนาไปข้างหน้า',
    is_reverse: false,
  },
  {
    axis: 'social',
    category: 'value',
    content: 'ค่านิยมและบรรทัดฐานที่สืบทอดกันมา เป็นเกราะป้องกันไม่ให้สังคมยุคใหม่เสื่อมทรามลง',
    is_reverse: true,
  },
  {
    axis: 'social',
    category: 'value',
    content: 'เยาวชนยุคใหม่ควรถูกปลูกฝังให้เคารพและภูมิใจในประวัติศาสตร์กระแสหลักของชาติ',
    is_reverse: true,
  },
  {
    axis: 'social',
    category: 'policy',
    content: 'รัฐควรรับรองสิทธิการสมรสและสิทธิในการตั้งตัวเป็นครอบครัวของบุคคลทุกเพศอย่างเท่าเทียมกับคู่ชายหญิง',
    is_reverse: false,
  },
  {
    axis: 'social',
    category: 'policy',
    content: 'กฎหมายและระเบียบที่บังคับเรื่องการแต่งกายและทรงผมในสถานศึกษาของรัฐ ควรถูกยกเลิกทั้งหมด',
    is_reverse: false,
  },
  {
    axis: 'social',
    category: 'policy',
    content: 'รัฐควรมีนโยบายสนับสนุนและให้สิทธิพิเศษแก่รูปแบบครอบครัวที่ประกอบด้วยพ่อ แม่ และลูก ตามธรรมชาติเป็นหลัก',
    is_reverse: true,
  },
  {
    axis: 'social',
    category: 'policy',
    content: 'หลักสูตรการศึกษาภาคบังคับ ต้องมีวิชาที่เน้นสอนเรื่องศีลธรรมและหน้าที่พลเมืองตามแบบแผนดั้งเดิม',
    is_reverse: true,
  },

  // International (ความสัมพันธ์ระหว่างประเทศ)
  {
    axis: 'international',
    category: 'value',
    content: 'ปัญหาระดับโลกอย่างความยากจนหรือสิ่งแวดล้อม เป็นสิ่งที่เราควรเข้าไปร่วมแก้ไขในฐานะพลเมืองโลก',
    is_reverse: false,
  },
  {
    axis: 'international',
    category: 'value',
    content: 'มนุษยชาติมีผลประโยชน์ร่วมกันที่สำคัญกว่าการยึดติดกับเส้นสมมติที่เรียกว่าพรมแดนประเทศ',
    is_reverse: false,
  },
  {
    axis: 'international',
    category: 'value',
    content: 'รัฐบาลที่ดีต้องคำนึงถึงปากท้องและความปลอดภัยของคนในชาติก่อนพันธะระหว่างประเทศเสมอ',
    is_reverse: true,
  },
  {
    axis: 'international',
    category: 'value',
    content: 'การพึ่งพาตนเองทางเศรษฐกิจ สำคัญกว่าการเปิดรับการลงทุนจากต่างชาติที่อาจคุกคามธุรกิจท้องถิ่น',
    is_reverse: true,
  },
  {
    axis: 'international',
    category: 'policy',
    content: 'ประเทศควรแก้ไขกฎหมายภายในให้สอดคล้องและเคารพต่อมาตรฐานสิทธิมนุษยชนสากลอย่างไม่มีเงื่อนไข',
    is_reverse: false,
  },
  {
    axis: 'international',
    category: 'policy',
    content: 'รัฐควรจัดสรรงบประมาณและพื้นที่ปลอดภัย เพื่อช่วยเหลือผู้ลี้ภัยด้านมนุษยธรรมข้ามพรมแดน',
    is_reverse: false,
  },
  {
    axis: 'international',
    category: 'policy',
    content: 'รัฐควรตั้งกำแพงภาษีนำเข้าสำหรับสินค้าต่างประเทศที่มีราคาถูก เพื่อปกป้องธุรกิจ SMEs ในประเทศ',
    is_reverse: true,
  },
  {
    axis: 'international',
    category: 'policy',
    content: 'กฎหมายควรจำกัดสิทธิ์การถือครองที่ดินและกิจการสำคัญของชาวต่างชาติให้เข้มงวดที่สุด',
    is_reverse: true,
  },

  // Contextual 1: Centralization vs Decentralization (ศูนย์กลาง-กระจายอำนาจ)
  {
    axis: 'centralization',
    category: 'value',
    content: 'คนท้องถิ่นมีความเข้าใจและสามารถแก้ปัญหาในพื้นที่ตนเองได้ดีกว่าข้าราชการที่ถูกส่งมาจากส่วนกลาง',
    is_reverse: false,
  },
  {
    axis: 'centralization',
    category: 'value',
    content: 'การให้อำนาจส่วนกลางเป็นผู้ควบคุมมาตรฐาน จะช่วยลดความเหลื่อมล้ำและอิทธิพลมืดในระดับจังหวัดได้ดีที่สุด',
    is_reverse: true,
  },
  {
    axis: 'centralization',
    category: 'policy',
    content: 'ควรยกเลิกตำแหน่งผู้ว่าราชการจังหวัดที่มาจากการแต่งตั้ง และให้ประชาชนในพื้นที่เลือกตั้งผู้บริหารสูงสุดของตนเอง',
    is_reverse: false,
  },
  {
    axis: 'centralization',
    category: 'policy',
    content: 'กระทรวงในส่วนกลางควรเป็นผู้กำหนดหลักสูตรและจัดสรรงบประมาณให้โรงเรียนทั่วประเทศ เพื่อรักษามาตรฐานการศึกษาให้เท่าเทียมกัน',
    is_reverse: true,
  },

  // Contextual 2: Religiosity vs Secularism (ศาสนา-โลกวิสัย)
  {
    axis: 'religiosity',
    category: 'value',
    content: 'กฎหมายที่บังคับใช้กับคนทั้งประเทศ ไม่ควรถูกร่างขึ้นโดยอิงจากความเชื่อหรือข้อห้ามทางศาสนาใดศาสนาหนึ่ง',
    is_reverse: false,
  },
  {
    axis: 'religiosity',
    category: 'value',
    content: 'ศาสนาและศีลธรรมอันดี เป็นเครื่องยึดเหนี่ยวสำคัญที่รัฐต้องอุปถัมภ์เพื่อรักษาสันติสุขในสังคม',
    is_reverse: true,
  },
  {
    axis: 'religiosity',
    category: 'policy',
    content: 'รัฐควรยกเลิกการนำภาษีไปอุดหนุนกิจการทางศาสนา และปฏิบัติต่อองค์กรศาสนาเทียบเท่านิติบุคคลทั่วไป',
    is_reverse: false,
  },
  {
    axis: 'religiosity',
    category: 'policy',
    content: 'รัฐควรมีกฎหมายควบคุมและลงโทษผู้ที่แสดงความลบหลู่ดูหมิ่นศาสนาหลักของชาติอย่างเด็ดขาด',
    is_reverse: true,
  },
]

async function seed() {
  console.log('Seeding Database with 40 Questions...')

  // Clean existing questions first to prevent duplicates during re-runs
  const { error: deleteError } = await supabase.from('questions').delete().neq('id', '00000000-0000-0000-0000-000000000000') // Deletes all

  if (deleteError) {
    console.error('Error clearing old questions:', deleteError)
    process.exit(1)
  }

  const { data, error } = await supabase.from('questions').insert(questions)

  if (error) {
    console.error('Error seeding questions:', error)
    process.exit(1)
  }

  console.log('✅ Successfully seeded 40 questions into Supabase!')
}

seed()
