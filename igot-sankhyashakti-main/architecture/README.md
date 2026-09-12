# Integration and persistence architecture

## Running prototype

- React frontend uses only `REACT_APP_BACKEND_URL` for API calls.
- FastAPI `/api` routes use the existing `MONGO_URL` and `DB_NAME`.
- Every demo browser receives a UUID session. MongoDB `_id` fields are excluded before JSON serialization.
- External integrations are all named adapters in `backend/services.py`. None connect to government systems or an LLM.
- `models.py` validates inbound requests; `question_bank.py` is a curated demo question bank.
- `postgresql-schema.sql` is a **future migration reference**, not the running database.

## Adapter replacement points

| Service | Current behavior | Future replacement |
|---|---|---|
| AIService | Contextual deterministic prose / curated questions | Server-side LLM provider, secrets via environment |
| iGOTService | Curated courses, session-only enrollment | Authorized catalogue/enrollment/completion REST adapter |
| NSSTAService | Two training programmes, session interest | Authorized NSSTA/TPAC programme adapter |
| DocumentProcessingService | Validated upload metadata + explicitly illustrative extraction | Sandboxed text extraction, provenance and LLM topic mapping |
| SemanticSearchService | Keyword expansion and ranking | Embeddings + vector retrieval |
| NotificationService | Two contextual demo notifications | Authenticated notification transport |

Basic arithmetic and evidence updates must remain deterministic rather than delegated to an LLM.

## Principal endpoints

`GET /api/state`, `POST /api/auth/demo`, `GET/PATCH /api/profile`, `GET /api/competencies`, `GET /api/competency-gaps`, `GET /api/recommendations`, `GET /api/courses`, `GET /api/courses/{id}`, `POST /api/courses/{id}/enroll`, `POST /api/courses/{id}/complete-module`, `POST /api/programmes/{id}/register`, `POST /api/assessment/generate`, `POST /api/assessment/submit`, `POST /api/documents/upload`, `POST /api/documents/{id}/summary`, `POST /api/quiz/generate`, `GET /api/progress`, `POST /api/assistant`, `GET /api/admin/analytics`, `GET /api/admin/departments`, `GET /api/admin/future-skills`.

The `X-Demo-Session` header is not a production security credential. An employee role cannot access admin analytics routes until deliberately switched to the administrator demo role. Do not use this mechanism for sensitive data or public production authorization.

## Storage and provenance

- Current state, completed learning and assessment evidence persist in MongoDB.
- Assessment questions retain answer keys server-side; keys are not returned until review after submission.
- Uploaded original files are not retained, only filename/size and mock extraction metadata.
- Chat and unfinished exam data are browser-session-only.
- The user-management demo directory is browser-local and has no effect on actual authentication.
- Report files are generated client-side and include simulated-data labels.

## Future model relationships

Role → RoleCompetency → Competency; Employee → EmployeeCompetency; Course → CourseCompetency; Employee → LearningHistory; Assessment → AssessmentQuestion → AssessmentResult; SkillGap → Recommendation → Course / TrainingProgramme; Department → DepartmentAnalytics. All migration target identifiers are UUIDs. Evidence/provenance and audit events should be retained in real deployments.