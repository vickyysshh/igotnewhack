"""Simulated official-statistics data. No live government data or identities."""
from copy import deepcopy

PROFILE = {
    "id": "EMP-2026-0142", "name": "Ananya Sharma", "designation": "Deputy Director",
    "department": "Labour Statistics", "role": "Deputy Director", "experience": 8,
    "location": "New Delhi", "email": "ananya.sharma@example.in",
    "education": "M.Sc. Statistics, University of Delhi", "expertise": "Labour surveys, statistical reporting, data validation",
    "responsibilities": "Lead labour survey analysis, validate statistical datasets, and oversee publication of official reports.",
    "career_path": "Deputy Director → Joint Director → Director",
    "summary": "You are responsible for labour survey analysis, statistical reporting, data validation and dissemination. Your role increasingly requires applied analytics, SQL and AI-assisted statistical workflows."
}

CATEGORIES = {
    "Statistical": [("Survey Design", 78, 85), ("Sampling", 74, 85), ("Labour Statistics", 86, 90), ("Agricultural Statistics", 65, 70), ("Industrial Statistics", 69, 75), ("Price Statistics", 72, 80), ("National Accounts", 70, 75), ("SDG Indicators", 68, 80), ("Metadata Standards", 72, 80), ("Data Quality", 80, 90)],
    "Technical": [("Python", 62, 80), ("R", 70, 80), ("SQL", 55, 80), ("SPSS", 76, 80), ("SAS", 68, 75), ("Data Visualization", 65, 80), ("Statistical Analysis", 76, 85)],
    "Digital": [("AI / Machine Learning", 32, 65), ("Big Data", 46, 70), ("Cloud Computing", 45, 65), ("APIs", 54, 65), ("Open Data", 68, 75), ("GIS", 40, 60)],
    "Digital Governance": [("Cybersecurity", 55, 75), ("Data Privacy", 72, 85), ("Digital Signatures", 80, 85), ("Government Cloud", 62, 70), ("Digital Public Infrastructure", 64, 75)],
    "Behavioural": [("Leadership", 84, 90), ("Communication", 86, 90), ("Project Management", 78, 85), ("Ethics", 90, 95), ("Decision Making", 80, 85), ("Change Management", 74, 85)]
}

def slug(name):
    return name.lower().replace(" / ", "-").replace(" ", "-")

def competencies():
    return [{"id": slug(name), "name": name, "category": cat, "current": current, "required": required,
             "confidence": 88 if current < 60 else 92, "last_assessed": "2026-09-10"}
            for cat, rows in CATEGORIES.items() for name, current, required in rows]

COURSES = [
    {"id": "sql-analysis", "title": "SQL for Statistical Data Analysis", "competency": "SQL", "category": "Technical", "provider": "iGOT Karmayogi", "duration": 8, "difficulty": "Intermediate", "rating": 4.8, "completion_rate": 92, "language": "English / Hindi", "department": "Labour Statistics", "prerequisites": "SQL Fundamentals", "description": "Apply SQL to official statistical datasets: joins, aggregation, validation and reproducible labour-market analysis.", "modules": ["Working with statistical datasets", "Joins and survey data integration", "Aggregations and quality checks", "Labour-market analysis case study"]},
    {"id": "ai-statistics", "title": "AI Applications in Official Statistics", "competency": "AI / Machine Learning", "category": "Digital", "provider": "iGOT Karmayogi / NSSTA", "duration": 6, "difficulty": "Intermediate", "rating": 4.9, "completion_rate": 88, "language": "English", "department": "Labour Statistics", "prerequisites": "Applied Machine Learning", "description": "Explore responsible AI for survey processing, statistical production and evidence-based public policy.", "modules": ["AI in statistical production", "Classification and prediction", "Responsible AI and bias", "Official statistics case study"]},
    {"id": "data-viz", "title": "Advanced Data Visualization", "competency": "Data Visualization", "category": "Technical", "provider": "NSSTA", "duration": 5, "difficulty": "Advanced", "rating": 4.7, "completion_rate": 85, "language": "English / Hindi", "department": "Social Statistics", "prerequisites": "Basic charts and statistical reporting", "description": "Communicate evidence through accessible charts, statistical dashboards and data-led narratives.", "modules": ["Visual encoding", "Accessible statistical charts", "Dashboard design", "Publishing official data"]},
    {"id": "gis-official", "title": "GIS for Official Statistics", "competency": "GIS", "category": "Digital", "provider": "iGOT Karmayogi", "duration": 7, "difficulty": "Intermediate", "rating": 4.6, "completion_rate": 84, "language": "English", "department": "Agricultural Statistics", "prerequisites": "Basic geographical concepts", "description": "Combine spatial data and statistical methods for regional indicators and survey planning.", "modules": ["Spatial data fundamentals", "Mapping survey boundaries", "Spatial analysis", "Regional indicators"]},
    {"id": "applied-ml", "title": "Applied Machine Learning", "competency": "AI / Machine Learning", "category": "Digital", "provider": "NSSTA", "duration": 10, "difficulty": "Intermediate", "rating": 4.8, "completion_rate": 89, "language": "English", "department": "Data Informatics", "prerequisites": "Foundational statistical analysis", "description": "Understand supervised learning, model evaluation and interpretable predictions for public datasets.", "modules": ["Preparing training data", "Supervised learning", "Model evaluation", "Interpretable predictions"]},
    {"id": "python-stats", "title": "Python for Statistical Analysis", "competency": "Python", "category": "Technical", "provider": "iGOT Karmayogi", "duration": 12, "difficulty": "Beginner", "rating": 4.8, "completion_rate": 93, "language": "English / Hindi", "department": "Data Informatics", "prerequisites": "None", "description": "Build a reproducible statistical workflow with Python, pandas and visual analysis.", "modules": ["Python foundations", "Data frames", "Statistical summaries", "Reproducible notebooks"]},
    {"id": "cloud-government", "title": "Cloud Computing for Government Data", "competency": "Cloud Computing", "category": "Digital", "provider": "iGOT Karmayogi", "duration": 4, "difficulty": "Beginner", "rating": 4.5, "completion_rate": 87, "language": "English", "department": "Data Informatics", "prerequisites": "None", "description": "Understand cloud deployment, access policies and responsible handling of government data.", "modules": ["Cloud concepts", "Storage and access", "Data protection", "Public-sector use cases"]},
    {"id": "sql-fundamentals", "title": "SQL Fundamentals", "competency": "SQL", "category": "Technical", "provider": "iGOT Karmayogi", "duration": 4, "difficulty": "Beginner", "rating": 4.7, "completion_rate": 95, "language": "English / Hindi", "department": "Labour Statistics", "prerequisites": "None", "description": "Learn relational data, filtering, sorting and SQL queries.", "modules": ["Relational tables", "SELECT queries", "Filtering records", "Sorting results"]},
    {"id": "ml-government", "title": "Machine Learning for Government Analytics", "competency": "AI / Machine Learning", "category": "Digital", "provider": "iGOT Karmayogi", "duration": 8, "difficulty": "Advanced", "rating": 4.8, "completion_rate": 82, "language": "English", "department": "Survey Design", "prerequisites": "Applied Machine Learning", "description": "Evaluate machine learning approaches for survey optimization and administrative data.", "modules": ["Administrative data", "Feature selection", "Validation strategies", "Policy interpretation"]}
]

DEPARTMENTS = [{"id": slug(name), "name": name, "employees": n, "competency": c, "gap": gap, "need": need}
    for name, n, c, gap, need in [
    ("National Accounts", 620, 78, "Data Visualization", "Medium"), ("Labour Statistics", 840, 68, "AI / ML", "High"),
    ("Agricultural Statistics", 710, 72, "GIS", "High"), ("Industrial Statistics", 580, 74, "SQL", "Medium"),
    ("Social Statistics", 650, 73, "Data Visualization", "Medium"), ("Data Informatics", 490, 65, "Cloud Computing", "High"),
    ("Survey Design", 520, 76, "AI / ML", "Medium"), ("Data Quality", 410, 63, "Data Engineering", "High")]]

PROGRAMMES = [
    {"id": "advanced-statistical", "title": "Advanced Statistical Data Analysis Programme", "provider": "NSSTA / TPAC", "duration": "5 Days", "location": "Greater Noida", "date": "19–23 October 2026", "competency": "Statistical Analysis", "seats": 30},
    {"id": "survey-design", "title": "Modern Survey Design & Sampling", "provider": "NSSTA / TPAC", "duration": "3 Days", "location": "Hybrid", "date": "02–04 November 2026", "competency": "Survey Design", "seats": 40}]

def initial_state(session_id):
    return {"id": session_id, "role": "employee", "profile": deepcopy(PROFILE), "competencies": competencies(),
            "learning": {"sql-fundamentals": {"completed": [0, 1, 2, 3], "status": "Completed"}, "sql-analysis": {"completed": [0], "status": "In Progress"}},
            "results": [], "documents": [], "programmes": [], "notifications_read": False,
            "history": [{"month": m, "competency": c, "hours": h, "score": s, "gap": g, "courses": n} for m,c,h,s,g,n in [("Jan",52,8,58,45,2),("Feb",58,16,65,40,5),("Mar",64,24,72,36,8),("Apr",69,31,77,33,10),("May",74,38.5,81,31,12)]]}