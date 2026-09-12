import uuid
import requests
import pytest


# Core API and state-connection regression coverage for iGOT Sankhyashakti prototype
BASE_URL = pytest.importorskip("os").environ.get("REACT_APP_BACKEND_URL")


def build_headers(session_id=None):
    return {
        "X-Demo-Session": session_id or str(uuid.uuid4()),
        "Content-Type": "application/json",
    }


@pytest.fixture(scope="session")
def api_base_url():
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL is not set")
    return BASE_URL.rstrip("/")


def test_state_initialization_and_baseline_values(api_base_url):
    headers = build_headers()
    response = requests.get(f"{api_base_url}/api/state", headers=headers, timeout=30)
    assert response.status_code == 200
    data = response.json()

    assert data["profile"]["name"] == "Ananya Sharma"
    assert data["overview"]["overall"] == 74
    assert data["overview"]["critical_gaps"] == 6
    sql = next(c for c in data["competencies"] if c["name"] == "SQL")
    assert sql["current"] == 55
    assert sql["required"] == 80


def test_demo_auth_role_switch_and_admin_ui_api_guard(api_base_url):
    headers = build_headers()

    login_resp = requests.post(
        f"{api_base_url}/api/auth/demo",
        headers=headers,
        json={"role": "employee"},
        timeout=30,
    )
    assert login_resp.status_code == 200
    assert login_resp.json()["mode"] == "demo"

    admin_denied = requests.get(
        f"{api_base_url}/api/admin/analytics", headers=headers, timeout=30
    )
    assert admin_denied.status_code == 403
    assert "administrator" in admin_denied.json()["detail"].lower()

    to_admin = requests.post(
        f"{api_base_url}/api/auth/demo",
        headers=headers,
        json={"role": "super-admin"},
        timeout=30,
    )
    assert to_admin.status_code == 200

    admin_allowed = requests.get(
        f"{api_base_url}/api/admin/analytics", headers=headers, timeout=30
    )
    assert admin_allowed.status_code == 200
    body = admin_allowed.json()
    assert body["officials"] == 4820
    assert body["active_learners"] == 3910
    assert body["average_competency"] == 71


def test_profile_edit_persists_after_refresh(api_base_url):
    headers = build_headers()

    state_before = requests.get(f"{api_base_url}/api/state", headers=headers, timeout=30)
    assert state_before.status_code == 200
    original = state_before.json()["profile"]

    payload = {
        "name": original["name"],
        "designation": "Deputy Director",
        "department": "Labour Statistics",
        "experience": 9,
        "location": "New Delhi",
        "education": "M.Sc. Statistics, University of Delhi",
        "expertise": "Labour surveys, statistical reporting, data validation",
        "responsibilities": "Lead labour survey analysis, validate statistical datasets, and oversee publication of official reports.",
    }
    patch_resp = requests.patch(
        f"{api_base_url}/api/profile", headers=headers, json=payload, timeout=30
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["experience"] == 9

    profile_resp = requests.get(f"{api_base_url}/api/profile", headers=headers, timeout=30)
    assert profile_resp.status_code == 200
    assert profile_resp.json()["experience"] == 9
    assert "9 years" in profile_resp.json()["summary"]


def test_course_learning_updates_persist_and_complete_status(api_base_url):
    headers = build_headers()

    enroll = requests.post(
        f"{api_base_url}/api/courses/ai-statistics/enroll", headers=headers, timeout=30
    )
    assert enroll.status_code == 200
    assert enroll.json()["status"] in ["In Progress", "Completed"]

    for module_index in [0, 1, 2, 3]:
        complete = requests.post(
            f"{api_base_url}/api/courses/ai-statistics/complete-module",
            headers=headers,
            json={"module": module_index},
            timeout=30,
        )
        assert complete.status_code == 200

    state = requests.get(f"{api_base_url}/api/state", headers=headers, timeout=30)
    assert state.status_code == 200
    ai_course = next(c for c in state.json()["courses"] if c["id"] == "ai-statistics")
    assert ai_course["status"] == "Completed"
    assert ai_course["completed_modules"] == [0, 1, 2, 3]


def test_programme_registration_persists(api_base_url):
    headers = build_headers()
    register = requests.post(
        f"{api_base_url}/api/programmes/advanced-statistical/register",
        headers=headers,
        timeout=30,
    )
    assert register.status_code == 200
    assert register.json()["registered"] is True

    state = requests.get(f"{api_base_url}/api/state", headers=headers, timeout=30)
    assert state.status_code == 200
    programme = next(
        p
        for p in state.json()["training_programmes"]
        if p["id"] == "advanced-statistical"
    )
    assert programme["registered"] is True


def test_assessment_generate_sql_bank_and_submit_updates_connected_state(api_base_url):
    headers = build_headers()

    generated = requests.post(
        f"{api_base_url}/api/assessment/generate",
        headers=headers,
        json={"competency": "SQL", "count": 10, "question_type": "MCQ"},
        timeout=30,
    )
    assert generated.status_code == 200
    payload = generated.json()
    assert payload["count"] == 10
    assert len(payload["questions"]) == 10
    assert "correct" not in payload["questions"][0]

    correct_index = [1, 2, 0, 3, 1, 2, 0, 3, 1, 2]
    answers = {str(i + 1): correct_index[i] for i in range(8)}
    answers.update({"9": 0, "10": 0})

    submitted = requests.post(
        f"{api_base_url}/api/assessment/submit",
        headers=headers,
        json={"assessment_id": payload["id"], "answers": answers},
        timeout=30,
    )
    assert submitted.status_code == 200
    result = submitted.json()
    assert result["score"] == 8
    assert result["total"] == 10
    assert result["accuracy"] == 80
    assert result["previous"] == 55
    assert result["current"] == 68
    assert result["improvement"] == 13
    assert result["previous_gap"] == 25
    assert result["new_gap"] == 12

    refreshed = requests.get(f"{api_base_url}/api/state", headers=headers, timeout=30)
    assert refreshed.status_code == 200
    state = refreshed.json()
    sql = next(c for c in state["competencies"] if c["name"] == "SQL")
    assert sql["current"] == 68
    assert sql["gap"] == 12
    assert state["overview"]["overall"] == 77
    assert state["overview"]["critical_gaps"] == 5


def test_assessment_lower_score_does_not_improve_competency(api_base_url):
    headers = build_headers()

    generated = requests.post(
        f"{api_base_url}/api/assessment/generate",
        headers=headers,
        json={"competency": "SQL", "count": 10, "question_type": "MCQ"},
        timeout=30,
    )
    assert generated.status_code == 200
    assessment_id = generated.json()["id"]

    wrong_answers = {str(i): 0 for i in range(1, 11)}
    submitted = requests.post(
        f"{api_base_url}/api/assessment/submit",
        headers=headers,
        json={"assessment_id": assessment_id, "answers": wrong_answers},
        timeout=30,
    )
    assert submitted.status_code == 200
    result = submitted.json()
    assert result["previous"] == 55
    assert result["current"] == 55
    assert result["improvement"] == 0


def test_assessment_submit_is_idempotent_same_session(api_base_url):
    headers = build_headers()
    generated = requests.post(
        f"{api_base_url}/api/assessment/generate",
        headers=headers,
        json={"competency": "SQL", "count": 5, "question_type": "MCQ"},
        timeout=30,
    )
    assert generated.status_code == 200
    assessment_id = generated.json()["id"]

    answers = {"1": 1, "2": 2, "3": 0, "4": 3, "5": 1}
    first_submit = requests.post(
        f"{api_base_url}/api/assessment/submit",
        headers=headers,
        json={"assessment_id": assessment_id, "answers": answers},
        timeout=30,
    )
    second_submit = requests.post(
        f"{api_base_url}/api/assessment/submit",
        headers=headers,
        json={"assessment_id": assessment_id, "answers": answers},
        timeout=30,
    )

    assert first_submit.status_code == 200
    assert second_submit.status_code == 200
    assert first_submit.json()["id"] == second_submit.json()["id"]


def test_assessment_submit_blocked_for_other_session(api_base_url):
    session_a = build_headers()
    session_b = build_headers()

    generated = requests.post(
        f"{api_base_url}/api/assessment/generate",
        headers=session_a,
        json={"competency": "SQL", "count": 5, "question_type": "MCQ"},
        timeout=30,
    )
    assert generated.status_code == 200

    blocked = requests.post(
        f"{api_base_url}/api/assessment/submit",
        headers=session_b,
        json={"assessment_id": generated.json()["id"], "answers": {"1": 1}},
        timeout=30,
    )
    assert blocked.status_code == 404
    assert "not found" in blocked.json()["detail"].lower()


def test_documents_invalid_extension_empty_and_oversize(api_base_url):
    headers = {"X-Demo-Session": str(uuid.uuid4())}

    invalid_ext = requests.post(
        f"{api_base_url}/api/documents/upload",
        headers=headers,
        files={"file": ("bad.exe", b"123", "application/octet-stream")},
        timeout=30,
    )
    assert invalid_ext.status_code == 400

    empty_file = requests.post(
        f"{api_base_url}/api/documents/upload",
        headers=headers,
        files={"file": ("empty.txt", b"", "text/plain")},
        timeout=30,
    )
    assert empty_file.status_code == 400

    oversize = requests.post(
        f"{api_base_url}/api/documents/upload",
        headers=headers,
        files={"file": ("big.txt", b"a" * (10 * 1024 * 1024 + 2), "text/plain")},
        timeout=60,
    )
    assert oversize.status_code == 413


def test_documents_upload_summary_and_quiz_generate_requires_valid_competency(api_base_url):
    headers = {"X-Demo-Session": str(uuid.uuid4())}
    upload = requests.post(
        f"{api_base_url}/api/documents/upload",
        headers=headers,
        files={"file": ("sample.txt", b"survey sampling and labour statistics", "text/plain")},
        timeout=30,
    )
    assert upload.status_code == 200
    doc = upload.json()
    assert doc["mode"] == "simulated"

    summary = requests.post(
        f"{api_base_url}/api/documents/{doc['id']}/summary", headers=headers, timeout=30
    )
    assert summary.status_code == 200
    assert "Demonstration study summary" in summary.json()["summary"]

    invalid_quiz = requests.post(
        f"{api_base_url}/api/quiz/generate",
        headers={**headers, "Content-Type": "application/json"},
        json={
            "competency": "Unknown Skill",
            "count": 5,
            "question_type": "MCQ",
            "document_id": doc["id"],
        },
        timeout=30,
    )
    assert invalid_quiz.status_code == 400
    assert "choose a competency" in invalid_quiz.json()["detail"].lower()