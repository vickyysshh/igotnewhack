-- FUTURE MIGRATION REFERENCE ONLY. Not applied by the prototype.
-- Runtime persistence currently uses the approved MongoDB demo store.
CREATE TABLE department (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL
);
CREATE TABLE workforce_role (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT ''
);
CREATE TABLE employee (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_code text UNIQUE NOT NULL,
  name text NOT NULL, official_email text UNIQUE,
  department_id uuid REFERENCES department(id), role_id uuid REFERENCES workforce_role(id),
  designation text, experience_years int CHECK (experience_years BETWEEN 0 AND 50),
  location text, education text, expertise jsonb, responsibilities text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE competency (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL,
  category text NOT NULL, description text, future_relevance numeric
);
CREATE TABLE role_competency (
  role_id uuid REFERENCES workforce_role(id), competency_id uuid REFERENCES competency(id),
  required_score int CHECK (required_score BETWEEN 0 AND 100), weight numeric NOT NULL DEFAULT 1,
  PRIMARY KEY (role_id, competency_id)
);
CREATE TABLE employee_competency (
  employee_id uuid REFERENCES employee(id), competency_id uuid REFERENCES competency(id),
  current_score int CHECK (current_score BETWEEN 0 AND 100),
  confidence int CHECK (confidence BETWEEN 0 AND 100), last_assessed timestamptz,
  provenance jsonb, PRIMARY KEY (employee_id, competency_id)
);
CREATE TABLE course (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), external_id text, title text NOT NULL,
  provider text NOT NULL, duration_hours numeric, difficulty text, language text,
  description text, department_id uuid REFERENCES department(id), metadata jsonb
);
CREATE TABLE course_competency (
  course_id uuid REFERENCES course(id), competency_id uuid REFERENCES competency(id),
  relevance numeric, PRIMARY KEY (course_id, competency_id)
);
CREATE TABLE learning_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid REFERENCES employee(id),
  course_id uuid REFERENCES course(id), status text NOT NULL,
  completed_modules jsonb NOT NULL DEFAULT '[]', learning_hours numeric,
  started_at timestamptz, completed_at timestamptz,
  UNIQUE (employee_id, course_id)
);
CREATE TABLE training_programme (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, provider text,
  competency_id uuid REFERENCES competency(id), duration_days numeric,
  starts_at date, ends_at date, location text, capacity int
);
CREATE TABLE training_registration (
  employee_id uuid REFERENCES employee(id), programme_id uuid REFERENCES training_programme(id),
  status text, created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (employee_id, programme_id)
);
CREATE TABLE learning_document (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), owner_id uuid REFERENCES employee(id),
  filename text NOT NULL, bytes bigint, mime_type text, storage_reference text,
  processing_status text, extraction jsonb, retention_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE assessment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid REFERENCES employee(id),
  competency_id uuid REFERENCES competency(id), course_id uuid REFERENCES course(id),
  document_id uuid REFERENCES learning_document(id), question_type text,
  question_count int CHECK (question_count IN (5,10,20)), submitted boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE assessment_question (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id uuid REFERENCES assessment(id),
  position int NOT NULL, question text NOT NULL, options jsonb NOT NULL,
  correct_answer int NOT NULL, explanation text, competency_id uuid REFERENCES competency(id),
  UNIQUE (assessment_id, position)
);
CREATE TABLE assessment_result (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id uuid UNIQUE REFERENCES assessment(id),
  employee_id uuid REFERENCES employee(id), correct_count int, total_count int, accuracy int,
  previous_score int, updated_score int, answers jsonb, breakdown jsonb,
  completed_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE skill_gap (
  employee_id uuid REFERENCES employee(id), competency_id uuid REFERENCES competency(id),
  current_score int, required_score int, gap int, priority text, explanation text,
  computed_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (employee_id, competency_id)
);
CREATE TABLE recommendation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid REFERENCES employee(id),
  competency_id uuid REFERENCES competency(id), course_id uuid REFERENCES course(id),
  programme_id uuid REFERENCES training_programme(id), deterministic_score numeric,
  factors jsonb, explanation text, generated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE department_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), department_id uuid REFERENCES department(id),
  period date, employee_count int, average_competency numeric, gap_summary jsonb,
  training_effectiveness jsonb, future_skill_projections jsonb, provenance jsonb,
  UNIQUE (department_id, period)
);
CREATE TABLE audit_event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), actor_id uuid REFERENCES employee(id),
  action text NOT NULL, entity_type text, entity_id uuid, metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX employee_by_department ON employee(department_id);
CREATE INDEX assessment_by_employee ON assessment(employee_id,created_at);
CREATE INDEX recommendation_by_employee ON recommendation(employee_id,deterministic_score DESC);
-- Future vector integration, only after choosing an embedding model/dimension:
-- CREATE EXTENSION IF NOT EXISTS vector;
-- CREATE TABLE semantic_content (id uuid PRIMARY KEY, source_type text, source_id uuid,
--   content text, embedding vector(<PROVIDER_DIMENSION>), model text, version text);