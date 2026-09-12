# iGOT Sankhyashakti — Product Requirements & Handoff

## Original problem statement
Build a complete, polished, production-style web application prototype called **iGOT Sankhyashakti**, with the tagline **AI-Powered Competency Intelligence for India's Official Statistical Workforce**, for Smart India Hackathon 2026. The primary product is competency intelligence, not a course marketplace. Connect Employee → Role → Required/current competencies → Gaps → Personalized learning → Assessment → Competency improvement → Workforce analytics → Future skills.

The user supplied a navy/white government-style Sankhyashakti login reference and a technical architecture image specifying React/Next.js, Python/FastAPI, PostgreSQL/vector database, AI/NLP, REST integration and future RBAC/SSO. The user explicitly approved **React + FastAPI, simulated AI/iGOT/NSSTA services and database-ready demo storage**, and following the provided visual reference closely. Additional user request: **“i need a best ui , goverment like website keep in mind”**.

Critical verbatim requirement: **“Do not merely create static pages. Build a connected prototype where the pages share state/data.”** SQL must be able to move from 55% to 68% after an assessment, reducing the gap from 25 to 12 points and updating other screens. All live government connections and official-site claims are prohibited until real integrations are provided.

## Personas
- Employee: Ananya Sharma, Deputy Director, Labour Statistics, 8 years of experience; primary judge journey.
- Trainer: Dr. Rajesh Kumar, demo Senior Faculty at NSSTA; cohort analytics and material-to-assessment journey.
- Administrator: Priya Menon, demo workforce administrator; departmental intelligence, reports and directory.
- Super Admin: additional switchable demonstration role, including directory role selection.

## Core requirements (static)
1. Public landing and reference-inspired demo login; persistent prototype/simulated data labels.
2. Employee dashboard, editable profile, 34-competency map across five domains, explained skill gaps.
3. Deterministic ranking, personalized pathway, simulated iGOT courses/NSSTA programmes.
4. Assessment counts 5/10/20 and MCQ/True-False/scenario questions; flags, timer, review, results.
5. Deterministic actual-answer scoring with connected updates across dashboard, gaps, recommendations, progress and contextual assistant.
6. Trainer dashboard, learners, material uploads and illustrative AI extraction/quiz generation.
7. Workforce analytics, departments, training effectiveness, future skills, real report downloads and demo directory controls.
8. Responsive sidebar and mobile navigation, supporting chart data, keyboard-focus states, loading/empty/error/success states.
9. No live LLM/government credentials needed. Replaceable external service abstractions and future relational architecture.

## Architecture decisions
- **Runtime:** React 19, React Router, shadcn/Radix components, Tailwind, Recharts, Lucide, Sonner; FastAPI/Pydantic with MongoDB demo persistence. Existing environment configuration is preserved.
- **Persistence:** UUID `X-Demo-Session` associates anonymous demo state with a browser. MongoDB session/assessment collections contain profile, competency evidence, learning, results and upload metadata. Production SSO/authentication is not implemented.
- **Client state:** DemoContext refreshes shared API state after mutations. Role is stored in localStorage; unfinished assessment and chat in sessionStorage. Demo directory is localStorage-only and does not grant actual permissions.
- **Scoring:** Accuracy = correct answers / total. New competency = prior + max(0, round((accuracy − prior) × .52)). SQL 55 with 80% accuracy becomes 68. Repeated submission of the same attempt is idempotent. Lower scores do not fabricate improvement.
- **Ranking:** deterministic role relevance + gap + history + department priority + future skill relevance + course relevance. Completed courses excluded. Initial SQL learning-history boost aligns recommendation with the user's in-progress path.
- **Adapters:** iGOTService, NSSTAService, AIService, DocumentProcessingService, SemanticSearchService and NotificationService in backend/services.py. All are explicitly simulated implementations.
- **Documents:** validate extension, non-empty content and maximum 10 MB. Original bytes are read transiently, never stored. Returned summary/topics are illustrative, not extracted from file contents.
- **Charts:** StableChart supplies positive initial dimensions while ResizeObserver measures actual space; text/data descriptions accompany visualizations.
- **Exports:** jsPDF, ExcelJS and CSV generate actual files. Prepared Blob URLs are native download anchors, retaining browser user activation and supporting consecutive downloads. All formats include simulation labels.
- **Future database:** architecture/postgresql-schema.sql describes the relational migration target; it is not applied or claimed as a running PostgreSQL/vector connection.

## Implemented — 2026-09-11
- Public landing with real New Delhi government-building photograph, restrained tricolour identity, login, privacy/security/accessibility/help dialogs.
- All employee navigation pages and connected course/module/assessment/progress workflows.
- Baseline KPIs: 74% competency, 6 critical areas, 12 completed courses, 38.5 learning hours, 81% assessment score, +18% indicator.
- Nine curated courses, two NSSTA/TPAC programmes, searchable/filtered catalogue, pagination, course module simulation, interest registration and gated final pathway assessment.
- 20 SQL questions and 20 general statistical/AI questions, reusable true/false and scenario formats, answer review and evidence updates.
- Simulated contextual assistant reflects the latest session values and explains deterministic recommendations.
- Trainer dashboard/analytics, sample learner cohort, upload validation, demo extraction, study summary and assessment generation.
- Admin and super-admin experiences, all navigation routes, department filtering/sorting/details, intervention panels, future-skills charts and training comparisons.
- Five reports in actual PDF/CSV/XLSX formats; demo user creation, duplicate prevention, filter, suspend/activate confirmation.
- Responsive desktop/tablet/mobile views and improved text contrast/legibility.

## Verification — 2026-09-11
- Testing-agent report: `/app/test_reports/iteration_1.json`. Backend suite `/app/backend/tests/test_prototype_api.py`: **11/11 passed**, including connected SQL 55→68, scope isolation, idempotency, lower-score behavior and upload rejection rules.
- Broad frontend journeys verified at 1920×800, 390×844 and 768×1024. No horizontal overflow in tested routes; core role, profile, course, assessment, document, analytics and directory flows passed.
- All reported functional issues fixed: native prepared download links for export sequencing; positive initial chart dimensions; valid native option labels instead of mixed instrumented JSX children.
- Self-regression: uninterrupted PDF→CSV→XLSX workforce exports and reopened future XLSX export all produced downloads. Course and upload dropdowns contain no `option span` elements. Chart pages no longer issue Recharts dimension warnings.
- Final browser console: no application runtime/nesting/chart errors; only aborted preview-overlay/telemetry requests during navigation.
- Final production build successful, backend regression repeated: **11/11 passed**. See `/app/test_reports/final_build.log` and `/app/test_reports/pytest/final_results.xml`.

## Prioritized backlog
### P0 — prototype
- No outstanding blocking issues in the verified demonstration scope.

### P1 — real-system phase (not configured)
- Authorized iGOT/NSSTA adapters and actual provider access.
- Real LLM/NLP document extraction, contextual generation and embedding/vector adapter.
- PostgreSQL migration using the supplied relational target, proper ownership/audit records.
- Production identity provider/SSO and server-enforced authorization, privacy controls, retention, rate limits and audit review.
- Durable object storage only if original uploaded documents need to be retained.

### P2 — product polish
- Guided judge walkthrough with resettable isolated demo scenarios.
- Hindi UI translation and manual accessibility evaluation.
- Expanded competency-specific question banks beyond curated SQL/general demo banks.
- Cohort assignment/assessment publishing and certificate generation.
- Continue extracting legacy shared stylesheet sections into focused feature modules; new export styles are already isolated.

## Next tasks
1. Add a guided SIH demonstration mode that highlights the complete before/after competency loop.
2. Choose and configure real AI integration only when requested, preserving current service contracts.
3. Migrate data/identity with verified credentials and evaluate security/accessibility before any real-government use.
