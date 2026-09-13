"""Demo datasets, master competency framework, and role mappings for iGOT Sankhyashakti.
Contains official competency framework domains and minimal coherent demo data.
"""
from copy import deepcopy

# Master Competency Framework strictly matching specifications
MASTER_COMPETENCY_FRAMEWORK = {
    "Statistical": [
        "Survey Design",
        "Sampling",
        "Labour Statistics",
        "Agricultural Statistics",
        "Industrial Statistics",
        "Price Statistics",
        "National Accounts",
        "SDG Indicators",
        "Metadata Standards",
        "Data Quality"
    ],
    "Technical": [
        "Python",
        "R",
        "SQL",
        "SPSS",
        "SAS",
        "Data Visualization",
        "Statistical Analysis"
    ],
    "Digital": [
        "AI / ML",
        "Big Data",
        "Cloud Computing",
        "APIs",
        "Open Data",
        "GIS"
    ],
    "Governance": [
        "Cybersecurity",
        "Data Privacy",
        "Digital Signatures",
        "Government Cloud",
        "Digital Public Infrastructure"
    ],
    "Behavioural / Management": [
        "Leadership",
        "Communication",
        "Project Management",
        "Ethics",
        "Decision Making",
        "Change Management"
    ]
}

LEVEL_LABELS = {
    1: "Beginner",
    2: "Basic",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert"
}

# Deterministic level to score mapping
LEVEL_TO_SCORE = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 100
}

def score_to_level(score: int) -> int:
    if score >= 100: return 5
    if score >= 80: return 4
    if score >= 60: return 3
    if score >= 40: return 2
    return 1

def slug(name: str) -> str:
    return name.lower().replace(" / ", "-").replace(" ", "-")

# Prototype Role -> Required Competencies Mapping
ROLE_COMPETENCY_MAPPINGS = {
    "Deputy Director:Labour Statistics": [
        {"name": "Labour Statistics", "category": "Statistical", "required_level": 4},
        {"name": "Survey Design", "category": "Statistical", "required_level": 4},
        {"name": "Data Quality", "category": "Statistical", "required_level": 4},
        {"name": "Statistical Analysis", "category": "Technical", "required_level": 4},
        {"name": "SQL", "category": "Technical", "required_level": 3},
        {"name": "Leadership", "category": "Behavioural / Management", "required_level": 4}
    ],
    "default": [
        {"name": "Labour Statistics", "category": "Statistical", "required_level": 4},
        {"name": "Survey Design", "category": "Statistical", "required_level": 4},
        {"name": "Data Quality", "category": "Statistical", "required_level": 4},
        {"name": "Statistical Analysis", "category": "Technical", "required_level": 4},
        {"name": "SQL", "category": "Technical", "required_level": 3},
        {"name": "Leadership", "category": "Behavioural / Management", "required_level": 4}
    ]
}

# Primary Demo Professional Profile
PRIMARY_DEMO_PROFILE = {
    "id": "EMP-2026-0142",
    "name": "Demo Professional",
    "designation": "Deputy Director",
    "department": "Labour Statistics",
    "role": "Deputy Director",
    "experience": 8,
    "location": "New Delhi",
    "email": "demo.officer@example.gov.in",
    "education": "M.Sc. Statistics",
    "expertise": "Labour surveys, statistical reporting, data validation",
    "responsibilities": "Lead labour survey analysis, validate datasets, oversee statistical publication",
    "career_path": "Deputy Director → Joint Director → Director",
    "summary": "You are responsible for leading labour survey analysis, validating datasets, and overseeing official statistical publication. Your role requires advanced capability in labour statistics, survey design, data quality, and applied technical analysis."
}

# Baseline demonstrated levels for primary demo professional to create 2-3 meaningful gaps
# Required: Labour Statistics 4 (80), Survey Design 4 (80), Data Quality 4 (80), Statistical Analysis 4 (80), SQL 3 (60), Leadership 4 (80)
# Baseline: Labour Statistics 4 (80, gap 0), Survey Design 3 (60, gap 20 Med), Data Quality 2 (40, gap 40 High), Statistical Analysis 3 (60, gap 20 Med), SQL 2 (40, gap 20 Med), Leadership 4 (80, gap 0)
DEMO_BASELINE_LEVELS = {
    "Labour Statistics": {"demonstrated_level": 4, "confidence": 92, "evidence": "Demonstrated expertise in labour-force survey indicators and national employment statistics."},
    "Survey Design": {"demonstrated_level": 3, "confidence": 88, "evidence": "Practical knowledge of stratified sampling and survey design; further validation techniques needed."},
    "Data Quality": {"demonstrated_level": 2, "confidence": 85, "evidence": "Basic validation checks performed; automated anomaly detection and standard metadata validation needed."},
    "Statistical Analysis": {"demonstrated_level": 3, "confidence": 90, "evidence": "Proficient in descriptive and inferential statistics; needs applied policy modeling."},
    "SQL": {"demonstrated_level": 2, "confidence": 86, "evidence": "Understands basic SELECT and filtering queries; needs complex aggregations and survey joins."},
    "Leadership": {"demonstrated_level": 4, "confidence": 94, "evidence": "Experienced in leading survey analysis teams and coordinating publication reviews."}
}

# Small mock iGOT course catalogue (6-8 courses mapped directly to framework competencies)
COURSES = [
    {
        "id": "data-quality-assurance",
        "title": "Data Quality Assurance & Statistical Validation",
        "competency": "Data Quality",
        "category": "Statistical",
        "level": 4,
        "provider": "iGOT Karmayogi (Mock)",
        "duration": 6,
        "difficulty": "Advanced",
        "rating": 4.9,
        "completion_rate": 91,
        "language": "English / Hindi",
        "department": "Labour Statistics",
        "prerequisites": "Basic Data Validation",
        "description": "Master data quality audits, outlier detection, consistency rules, and metadata standards for official statistical systems.",
        "modules": ["Data Quality Dimensions in Official Statistics", "Validation Rules & Anomaly Detection", "Handling Non-Response & Imputation", "Publishing Quality Reports"]
    },
    {
        "id": "survey-design-sampling",
        "title": "Modern Survey Design & Complex Sampling",
        "competency": "Survey Design",
        "category": "Statistical",
        "level": 4,
        "provider": "NSSTA / iGOT (Mock)",
        "duration": 8,
        "difficulty": "Advanced",
        "rating": 4.8,
        "completion_rate": 89,
        "language": "English",
        "department": "Labour Statistics",
        "prerequisites": "Sampling Fundamentals",
        "description": "Design robust sampling frames, calculate sample weights, and mitigate non-sampling errors in large-scale socio-economic surveys.",
        "modules": ["Sampling Frames & Stratification", "Weighting & Post-Stratification", "Minimizing Non-Sampling Errors", "Survey Reproducibility Standards"]
    },
    {
        "id": "sql-analysis",
        "title": "SQL for Statistical Data Analysis",
        "competency": "SQL",
        "category": "Technical",
        "level": 3,
        "provider": "iGOT Karmayogi (Mock)",
        "duration": 8,
        "difficulty": "Intermediate",
        "rating": 4.8,
        "completion_rate": 92,
        "language": "English / Hindi",
        "department": "Labour Statistics",
        "prerequisites": "SQL Fundamentals",
        "description": "Apply SQL to official statistical datasets: joins, aggregation, validation and reproducible labour-market analysis.",
        "modules": ["Working with statistical datasets", "Joins and survey data integration", "Aggregations and quality checks", "Labour-market analysis case study"]
    },
    {
        "id": "advanced-labour-stats",
        "title": "Advanced Labour Statistics & Indicators",
        "competency": "Labour Statistics",
        "category": "Statistical",
        "level": 4,
        "provider": "iGOT Karmayogi (Mock)",
        "duration": 6,
        "difficulty": "Advanced",
        "rating": 4.9,
        "completion_rate": 95,
        "language": "English",
        "department": "Labour Statistics",
        "prerequisites": "Labour Survey Basics",
        "description": "Comprehensive study of ILO conventions, Periodic Labour Force Survey (PLFS) indicators, and decent work metrics.",
        "modules": ["PLFS Methodology & Indicators", "Informality & Underemployment Metrics", "Seasonal Adjustments in Labour Data", "Dissemination Best Practices"]
    },
    {
        "id": "statistical-data-analysis",
        "title": "Applied Statistical Analysis for Public Policy",
        "competency": "Statistical Analysis",
        "category": "Technical",
        "level": 4,
        "provider": "NSSTA (Mock)",
        "duration": 10,
        "difficulty": "Intermediate",
        "rating": 4.7,
        "completion_rate": 88,
        "language": "English",
        "department": "Labour Statistics",
        "prerequisites": "Foundational Statistics",
        "description": "Learn multivariate statistical techniques, regression diagnostics, and policy impact estimation using administrative data.",
        "modules": ["Regression & Econometric Modeling", "Diagnostic Tests & Outlier Analysis", "Time Series & Index Numbers", "Evidence-Based Policy Reporting"]
    },
    {
        "id": "leadership-public-statistics",
        "title": "Leadership & Decision Making in Public Statistics",
        "competency": "Leadership",
        "category": "Behavioural / Management",
        "level": 4,
        "provider": "iGOT Karmayogi (Mock)",
        "duration": 5,
        "difficulty": "Advanced",
        "rating": 4.9,
        "completion_rate": 94,
        "language": "English / Hindi",
        "department": "Official Statistical System",
        "prerequisites": "None",
        "description": "Develop strategic leadership, multi-stakeholder communication, and ethical decision making in statistical publication.",
        "modules": ["Leading Statistical Teams", "Data Ethics & Public Trust", "Crisis Decision Making", "Change Management in Digital Initiatives"]
    },
    {
        "id": "sql-fundamentals",
        "title": "SQL Fundamentals for Officials",
        "competency": "SQL",
        "category": "Technical",
        "level": 2,
        "provider": "iGOT Karmayogi (Mock)",
        "duration": 4,
        "difficulty": "Beginner",
        "rating": 4.7,
        "completion_rate": 95,
        "language": "English / Hindi",
        "department": "Labour Statistics",
        "prerequisites": "None",
        "description": "Learn relational data querying, filtering, sorting, and basic aggregation for administrative tables.",
        "modules": ["Relational tables", "SELECT queries", "Filtering records", "Sorting results"]
    }
]

PROGRAMMES = [
    {
        "id": "advanced-statistical",
        "title": "Advanced Statistical Data Analysis Programme",
        "provider": "NSSTA / TPAC",
        "duration": "5 Days",
        "location": "Greater Noida",
        "date": "19–23 October 2026",
        "competency": "Statistical Analysis",
        "seats": 30
    },
    {
        "id": "survey-design",
        "title": "Modern Survey Design & Sampling Frameworks",
        "provider": "NSSTA / TPAC",
        "duration": "3 Days",
        "location": "Hybrid",
        "date": "02–04 November 2026",
        "competency": "Survey Design",
        "seats": 40
    }
]

DEPARTMENTS = [
    {"id": "labour-statistics", "name": "Labour Statistics", "employees": 840, "competency": "Data Quality", "gap": "Data Quality", "need": "High"},
    {"id": "survey-design", "name": "Survey Design", "employees": 520, "competency": "Survey Design", "gap": "Sampling", "need": "Medium"},
    {"id": "national-accounts", "name": "National Accounts", "employees": 620, "competency": "Statistical Analysis", "gap": "Data Visualization", "need": "Medium"},
    {"id": "price-statistics", "name": "Price Statistics", "employees": 490, "competency": "Data Quality", "gap": "SQL", "need": "High"}
]

def build_demo_competencies_for_role(role="Deputy Director", domain="Labour Statistics"):
    """Returns only the relevant competencies for the specified role/domain, initialized deterministically."""
    key = f"{role}:{domain}"
    reqs = ROLE_COMPETENCY_MAPPINGS.get(key, ROLE_COMPETENCY_MAPPINGS["default"])
    result = []
    for r in reqs:
        cname = r["name"]
        cat = r["category"]
        req_level = r["required_level"]
        req_score = LEVEL_TO_SCORE[req_level]
        result.append({
            "id": slug(cname),
            "name": cname,
            "category": cat,
            "domain": cat,
            "current": 0,
            "current_level": 0,
            "level": 0,
            "required": req_score,
            "required_level": req_level,
            "target_level": req_level,
            "gap": req_score,
            "priority": "High" if req_score >= 25 else "Medium",
            "confidence": 0,
            "evidence": "Not assessed.",
            "last_assessed": None
        })
    return result

def initial_state(session_id, profile=None):
    prof = deepcopy(profile) if profile else deepcopy(PRIMARY_DEMO_PROFILE)
    role = prof.get("designation", "Deputy Director")
    domain = prof.get("department", "Labour Statistics")
    comps = build_demo_competencies_for_role(role, domain)
    return {
        "id": session_id,
        "role": "employee",
        "profile": prof,
        "competencies": comps,
        "learning": {},
        "results": [],
        "documents": [],
        "programmes": [],
        "notifications_read": False,
        "history": [],
        "va_assessment_completed": False
    }