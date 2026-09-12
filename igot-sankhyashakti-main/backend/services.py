"""Replaceable demo adapters. No external API calls or LLM credentials required."""
from copy import deepcopy
import re
from demo_data import COURSES, PROGRAMMES, slug
from question_bank import generate_questions

class SemanticSearchService:
    mode = "simulated"
    def search(self, courses, query):
        words = set(re.findall(r"[a-z]+", query.lower())) - {"for", "in", "the", "of", "a", "training", "course", "learn", "me", "show"}
        if not words:
            return courses
        if words & {"ai", "ml", "machine", "artificial"}:
            words |= {"machine", "ai", "python"}
        ranked = [(sum(w in (c["title"]+" "+c["competency"]+" "+c["department"]+" deputy director statistical officer").lower() for w in words), c) for c in courses]
        return [c for score,c in sorted(ranked, key=lambda x: x[0], reverse=True) if score > 0]

class iGOTService:
    mode = "demo"
    def getCourses(self, state):
        return [{**deepcopy(c), "status": state["learning"].get(c["id"], {}).get("status", "Not Started"), "completed_modules": state["learning"].get(c["id"], {}).get("completed", [])} for c in COURSES]
    def searchCourses(self, state, query=""):
        return SemanticSearchService().search(self.getCourses(state), query)
    def getCourseDetails(self, state, course_id):
        return next((c for c in self.getCourses(state) if c["id"] == course_id), None)
    def getEnrollmentStatus(self, state, course_id):
        return state["learning"].get(course_id, {}).get("status", "Not Started")
    def getCompletionStatus(self, state, course_id):
        return self.getEnrollmentStatus(state, course_id) == "Completed"
    def getRecommendations(self, state):
        by_name = {c["name"]: c for c in enrich_competencies(state)}
        recs = []
        for course in self.getCourses(state):
            comp = by_name.get(course["competency"])
            if not comp or comp["gap"] == 0 or course["status"] == "Completed":
                continue
            # Transparent deterministic weighted ranking. Basic arithmetic never uses AI.
            factors = {"role_relevance": 20, "competency_gap": comp["gap"], "learning_history": 20 if course["status"] == "In Progress" else 5,
                       "department_priority": 12 if course["department"] == state["profile"]["department"] else 5,
                       "future_skill_relevance": 12 if comp["category"] == "Digital" else 6, "course_relevance": 10}
            recs.append({**course, "score": sum(factors.values()), "factors": factors, "current": comp["current"], "required": comp["required"], "gap": comp["gap"], "reason": AIService().explainRecommendation(course, comp)})
        return sorted(recs, key=lambda x: x["score"], reverse=True)

class NSSTAService:
    mode = "demo"
    def getTrainingProgrammes(self): return deepcopy(PROGRAMMES)
    def searchTrainingProgrammes(self, query): return [p for p in self.getTrainingProgrammes() if query.lower() in p["title"].lower()]
    def getProgrammeDetails(self, program_id): return next((p for p in self.getTrainingProgrammes() if p["id"] == program_id), None)
    def getRecommendedProgrammes(self, state): return [{**p, "registered": p["id"] in state["programmes"]} for p in self.getTrainingProgrammes()]

class AIService:
    mode = "simulated"
    def generateRoleSummary(self, profile):
        return f"As {profile['designation']} in {profile['department']}, your responsibilities include {profile['responsibilities'].lower().rstrip('.')}. Your {profile['experience']} years of experience support progression toward advanced analytics and workforce leadership."
    def extractCompetencies(self, text=""):
        return ["Survey Methodology", "Sampling", "Labour Statistics", "Data Analysis"]
    def explainRecommendation(self, course, comp):
        return f"{comp['name']} is currently {comp['current']}%, while your role requires {comp['required']}%. This course addresses a {comp['gap']}-point gap and is aligned with your role and learning history."
    def generateAssessmentQuestions(self, competency, count, question_type): return generate_questions(competency, count, question_type)
    def generateStudySummary(self, document):
        return "Demonstration study summary: Define the target population and sampling frame; select a representative sample; apply survey weights; validate labour-market indicators; document methodology and protect respondent confidentiality. Review sampling bias, non-response and reproducibility before publishing estimates."
    def answerAssistantQuery(self, message, state):
        comps = enrich_competencies(state)
        gaps = sorted(comps, key=lambda c:c["gap"], reverse=True)
        sql = next(c for c in comps if c["name"] == "SQL")
        recs = iGOTService().getRecommendations(state)
        name = state["profile"]["name"].split()[0]
        q = message.lower()
        if any(w in q for w in ["sql", "recommended", "recommendation", "next", "learn"]):
            target = recs[0]["title"] if recs else "a refresher assessment"
            return f"{name}, based on your role as {state['profile']['designation']} in {state['profile']['department']}, I recommend {target} next.\n\nYour SQL competency is currently {sql['current']}% against a target of {sql['required']}% — a {sql['gap']}-point gap. You have completed foundational SQL training. Continue applied statistical analysis, then move to Applied Machine Learning.\n\nYour highest-priority gap is {gaps[0]['name']} ({gaps[0]['gap']} points). Complete a competency assessment after learning so your recommendations can reflect your progress."
        if "gap" in q:
            return "Your largest current competency gaps are:\n\n" + "\n".join(f"• {c['name']}: {c['current']}% current / {c['required']}% required ({c['gap']}-point gap)." for c in gaps[:4]) + "\n\nThese are prioritized by your role requirements, assessment evidence, department priorities and future-skill relevance."
        if any(w in q for w in ["role", "career", "future"]):
            return f"Your progression path is {state['profile']['career_path']}. For your next role, strengthen AI/ML, data engineering, leadership and change management. Your current Leadership score is 84%; combine that strength with applied analytics and cross-department programme experience. These are simulated planning recommendations, not official promotion requirements."
        if any(w in q for w in ["score", "progress", "improv"]):
            return f"Your overall competency indicator is {overview(state)['overall']}%. It summarizes the demo baseline and verified assessment changes within this session. Your SQL score is {sql['current']}%. Assessments calculate accuracy from your answers; a higher result updates the competency using a 52% evidence-weighted adjustment. A lower result never artificially raises your competency."
        return f"I can help with your competency gaps, learning recommendations, SQL progress and career skills, {name}. Your highest-priority gap is {gaps[0]['name']} at {gaps[0]['gap']} points. Would you like a learning recommendation or an explanation of your competency score? I use this demonstration's data, not live government systems."

class DocumentProcessingService:
    mode = "simulated"
    def process(self, filename, size):
        return {"name": filename, "size": size, "status": "Processed", "mode": "simulated", "summary": "Illustrative extraction: A training module covering survey methodology, sampling design, labour-force indicators and statistical data validation. This is simulated output, not an analysis of the uploaded document.", "topics": ["Survey design", "Sampling frameworks", "Labour-force indicators", "Data validation"], "competencies": AIService().extractCompetencies(), "objectives": ["Design a representative statistical sample", "Identify and mitigate survey bias", "Validate and interpret labour-market indicators"]}

class NotificationService:
    def getNotifications(self, state): return [{"id":"assessment", "title":"Your competency assessment is ready", "text":"Update your SQL evidence and learning recommendations.", "route":"/app/assessments"}, {"id":"programme", "title":"NSSTA programme recommendations", "text":"Advanced Statistical Data Analysis · 19–23 October", "route":"/app/courses"}]

def enrich_competencies(state):
    return [{**c, "gap": max(0,c["required"]-c["current"]), "priority": "High" if c["required"]-c["current"]>=25 else "Medium" if c["required"]-c["current"]>=15 else "Low", "level": min(5, max(1,(c["current"]+19)//20)), "target_level": min(5,(c["required"]+19)//20)} for c in state["competencies"]]

def overview(state):
    gains = sum(r["improvement"] for r in state["results"])
    completed = sum(v["status"]=="Completed" for v in state["learning"].values())-1
    hours = 38.5 + sum(len(v["completed"])*next((c["duration"]/4 for c in COURSES if c["id"]==k),0) for k,v in state["learning"].items() if k!="sql-fundamentals")-2
    return {"overall": min(100,74+round(gains/5)), "critical_gaps": sum(c["required"]-c["current"]>=20 for c in state["competencies"]), "courses_completed": 12+completed, "hours": round(hours,1), "assessment_score": state["results"][-1]["accuracy"] if state["results"] else 81, "improvement": 18+round(gains/5), "categories": [{"name": n, "current": min(100,v+round(gains/5)) if n=="Technical" else v, "required": r} for n,v,r in [("Statistical Domain",72,85),("Technical",68,80),("Digital",54,75),("Data & Analytics",76,85),("Behavioural",82,90)]]}