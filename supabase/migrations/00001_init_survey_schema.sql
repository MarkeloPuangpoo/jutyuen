-- 1. สร้าง ENUM Types
CREATE TYPE axis_type AS ENUM (
 'economic',
 'authority',
 'social',
 'international',
 'centralization',
 'religiosity'
);

CREATE TYPE question_category AS ENUM (
 'value',
 'policy'
);

CREATE TYPE session_status AS ENUM (
 'started',
 'completed',
 'abandoned'
);

-- 2. ตารางผู้ใช้งาน (Users)
CREATE TABLE users (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 demographics JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE users IS 'เก็บข้อมูลผู้ทำแบบสอบถาม';

-- 3. ตารางข้อคำถาม (Questions)
CREATE TABLE questions (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 axis axis_type NOT NULL,
 category question_category NOT NULL,
 content TEXT NOT NULL,
 is_reverse BOOLEAN NOT NULL DEFAULT FALSE,
 is_active BOOLEAN NOT NULL DEFAULT TRUE,
 version INTEGER NOT NULL DEFAULT 1,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE questions IS 'คลังข้อคำถามทั้งหมด รวมถึง Module เสริม';

-- 4. ตารางเซสชันการตอบแบบสอบถาม (Survey Sessions)
CREATE TABLE survey_sessions (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id UUID REFERENCES users(id) ON DELETE SET NULL,
 status session_status NOT NULL DEFAULT 'started',
 started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 completed_at TIMESTAMP WITH TIME ZONE,
 scoring_version VARCHAR(50) DEFAULT '1.0'
);
COMMENT ON TABLE survey_sessions IS 'บันทึกการเริ่มต้นและสิ้นสุดของการทำแบบสอบถามแต่ละครั้ง';

-- 5. ตารางคำตอบรายข้อ (Responses)
CREATE TABLE responses (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 session_id UUID NOT NULL REFERENCES survey_sessions(id) ON DELETE CASCADE,
 question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
 raw_score SMALLINT NOT NULL CHECK (raw_score >= 1 AND raw_score <= 6),
 time_spent_ms INTEGER CHECK (time_spent_ms >= 0),
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT unique_session_question UNIQUE (session_id, question_id)
);
COMMENT ON TABLE responses IS 'บันทึกคำตอบรายข้อของผู้ใช้งาน';

-- 6. ตารางเก็บผลลัพธ์ที่คำนวณแล้ว (Survey Results)
CREATE TABLE survey_results (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 session_id UUID NOT NULL REFERENCES survey_sessions(id) ON DELETE CASCADE,
 axis axis_type NOT NULL,
 score NUMERIC(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
 margin_of_error NUMERIC(5,2) NOT NULL,
 percentile NUMERIC(5,2) NOT NULL CHECK (percentile >= 0 AND percentile <= 100),
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT unique_session_axis UNIQUE (session_id, axis)
);
COMMENT ON TABLE survey_results IS 'เก็บผลลัพธ์คะแนนสุทธิของแต่ละแกนที่ผ่านกระบวนการคำนวณแล้ว';

-- 7. ตารางฐานข้อมูลอ้างอิงเชิงสถิติ (Norms Data)
CREATE TABLE norms_data (
 id SERIAL PRIMARY KEY,
 axis axis_type NOT NULL UNIQUE,
 mean_score NUMERIC(5,2) NOT NULL,
 std_dev NUMERIC(5,2) NOT NULL,
 total_samples INTEGER NOT NULL CHECK (total_samples > 0),
 last_recalculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE norms_data IS 'เก็บค่าทางสถิติของกลุ่มตัวอย่างตั้งต้น เพื่อใช้คำนวณ Percentile';

-- 8. สร้าง Indexes เพื่อความเร็วในการ Query
CREATE INDEX idx_questions_axis ON questions(axis);
CREATE INDEX idx_responses_session_id ON responses(session_id);
CREATE INDEX idx_survey_sessions_user_id ON survey_sessions(user_id);
CREATE INDEX idx_survey_results_session_id ON survey_results(session_id);
