import uuid
from fastapi.testclient import TestClient
from server import app, db

client = TestClient(app)

def test_root_endpoint():
    resp = client.get("/api/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["name"] == "iGOT Sankhyashakti"
    assert "MongoDB" in data["integrations"]

def test_state_and_profile():
    session_id = str(uuid.uuid4())
    resp = client.get("/api/state", headers={"X-Demo-Session": session_id})
    assert resp.status_code == 200
    data = resp.json()
    assert "profile" in data
    assert "competencies" in data
    assert len(data["competencies"]) == 6  # Demo professional competencies
    assert any(c["name"] == "Labour Statistics" for c in data["competencies"])
    assert any(c["name"] == "Data Quality" for c in data["competencies"])

def test_professional_registration_persists_to_mongodb():
    session_id = str(uuid.uuid4())
    reg_payload = {
        "name": "Demo Professional",
        "designation": "Deputy Director",
        "department": "Labour Statistics",
        "domain": "Labour Statistics",
        "experience": 8,
        "education": "M.Sc. Statistics",
        "expertise": "Labour surveys, statistical reporting, data validation",
        "responsibilities": "Lead labour survey analysis, validate datasets, oversee statistical publication",
        "email": "demo.director@example.gov.in",
        "workspace": "employee"
    }
    resp = client.post("/api/professionals/register", json=reg_payload, headers={"X-Demo-Session": session_id})
    assert resp.status_code == 200
    res = resp.json()
    assert res["profile"]["name"] == "Demo Professional"
    assert res["profile"]["designation"] == "Deputy Director"
    assert len(res["competencies"]) == 6

    # Verify state endpoint now returns the registered profile
    state_resp = client.get("/api/state", headers={"X-Demo-Session": session_id})
    assert state_resp.status_code == 200
    state_data = state_resp.json()
    assert state_data["profile"]["name"] == "Demo Professional"
    assert state_data["profile"]["designation"] == "Deputy Director"

def test_adaptive_assessment_workflow_and_deterministic_scoring():
    session_id = str(uuid.uuid4())
    # Start adaptive assessment
    start_resp = client.post("/api/assessment/adaptive/start", json={"competency": "Data Quality"}, headers={"X-Demo-Session": session_id})
    assert start_resp.status_code == 200
    start_data = start_resp.json()
    assert start_data["competency"] == "Data Quality"
    assert "question" in start_data
    assert len(start_data["question"]) > 15
    adaptive_id = start_data["adaptive_session_id"]

    # Provide candidate answer
    answer_payload = {
        "adaptive_session_id": adaptive_id,
        "competency": "Data Quality",
        "question": start_data["question"],
        "answer": "We enforce multi-stage consistency checks, automated range validation, cross-variable logic checks, and outlier detection using Mahalanobis distance before certifying official labour datasets."
    }
    interact_resp = client.post("/api/assessment/adaptive/interact", json=answer_payload, headers={"X-Demo-Session": session_id})
    assert interact_resp.status_code == 200
    interact_data = interact_resp.json()
    assert "demonstrated_level" in interact_data
    assert 1 <= interact_data["demonstrated_level"] <= 5
    # Deterministic scoring: Level * 20
    assert interact_data["score"] == interact_data["demonstrated_level"] * 20
    assert "evidence_summary" in interact_data

    # Verify competency map has updated score
    comp_resp = client.get("/api/competencies", headers={"X-Demo-Session": session_id})
    assert comp_resp.status_code == 200
    dq_comp = next(c for c in comp_resp.json() if c["name"] == "Data Quality")
    assert dq_comp["current"] == interact_data["score"]
    assert dq_comp["gap"] == max(0, dq_comp["required"] - dq_comp["current"])

def test_skill_gap_and_course_recommendations():
    session_id = str(uuid.uuid4())
    gaps_resp = client.get("/api/competency-gaps", headers={"X-Demo-Session": session_id})
    assert gaps_resp.status_code == 200
    gaps = gaps_resp.json()
    assert len(gaps) > 0
    # Gaps should be sorted descending
    assert gaps[0]["gap"] >= gaps[-1]["gap"]

    # Recommendations
    recs_resp = client.get("/api/recommendations", headers={"X-Demo-Session": session_id})
    assert recs_resp.status_code == 200
    recs = recs_resp.json()
    assert len(recs) > 0
    # Recommendations should be ranked deterministically by score
    assert recs[0]["score"] >= recs[-1]["score"]

def test_why_this_course_explanation():
    session_id = str(uuid.uuid4())
    why_resp = client.get("/api/courses/data-quality-assurance/why", headers={"X-Demo-Session": session_id})
    assert why_resp.status_code == 200
    data = why_resp.json()
    assert data["course_id"] == "data-quality-assurance"
    assert "explanation" in data
    assert len(data["explanation"]) > 20

def test_learning_path():
    session_id = str(uuid.uuid4())
    path_resp = client.get("/api/learning-path", headers={"X-Demo-Session": session_id})
    assert path_resp.status_code == 200
    steps = path_resp.json()
    assert 2 <= len(steps) <= 4

def test_document_upload_and_quiz_generation():
    session_id = str(uuid.uuid4())
    # Upload sample text document
    sample_content = b"Official Statistics Survey Methodology Notes: Sampling frames, stratified sampling, and data quality assurance protocols for periodic labour force surveys."
    upload_resp = client.post(
        "/api/documents/upload",
        files={"file": ("methodology.txt", sample_content, "text/plain")},
        headers={"X-Demo-Session": session_id}
    )
    assert upload_resp.status_code == 200
    doc = upload_resp.json()
    assert doc["status"] == "Processed"

    # Generate quiz based on uploaded document
    quiz_resp = client.post(
        "/api/quiz/generate",
        json={"competency": "Survey Design", "count": 5, "document_id": doc["id"]},
        headers={"X-Demo-Session": session_id}
    )
    assert quiz_resp.status_code == 200
    quiz_data = quiz_resp.json()
    assert quiz_data["competency"] == "Survey Design"
    assert len(quiz_data["questions"]) == 5

    # Submit answers to quiz
    answers = {q["id"]: 0 for q in quiz_data["questions"]}
    submit_resp = client.post(
        "/api/assessment/submit",
        json={"assessment_id": quiz_data["id"], "answers": answers},
        headers={"X-Demo-Session": session_id}
    )
    assert submit_resp.status_code == 200
    result = submit_resp.json()
    assert "accuracy" in result
    assert "score" in result

def test_assistant_query_grounded():
    session_id = str(uuid.uuid4())
    chat_resp = client.post(
        "/api/assistant",
        json={"message": "What are my biggest skill gaps?"},
        headers={"X-Demo-Session": session_id}
    )
    assert chat_resp.status_code == 200
    data = chat_resp.json()
    assert "answer" in data
    assert len(data["answer"]) > 10
