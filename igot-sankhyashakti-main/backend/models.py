from pydantic import BaseModel, Field, ConfigDict
from typing import Literal, Any

class DemoState(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    role: str = "employee"
    profile: dict = Field(default_factory=dict)
    competencies: list[dict] = Field(default_factory=list)
    learning: dict = Field(default_factory=dict)
    results: list[dict] = Field(default_factory=list)
    documents: list[dict] = Field(default_factory=list)
    programmes: list[str] = Field(default_factory=list)
    notifications_read: bool = False
    history: list[dict] = Field(default_factory=list)
    va_assessment_completed: bool = False

class LoginInput(BaseModel):
    role: Literal["employee", "trainer", "admin", "super-admin"]

class ProfileInput(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    designation: str = Field(min_length=2, max_length=100)
    department: str = Field(min_length=2, max_length=100)
    experience: int = Field(ge=0, le=50)
    location: str = Field(default="New Delhi", max_length=100)
    education: str = Field(default="", max_length=300)
    expertise: str = Field(default="", max_length=500)
    responsibilities: str = Field(default="", max_length=2000)

class RegistrationInput(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    designation: str = Field(min_length=2, max_length=100)
    department: str = Field(min_length=2, max_length=100)
    domain: str = Field(default="Labour Statistics", max_length=100)
    experience: int | str = Field(default=8)
    location: str = Field(default="New Delhi", max_length=100)
    education: str = Field(default="M.Sc. Statistics", max_length=300)
    expertise: str = Field(default="Labour surveys, statistical reporting, data validation", max_length=500)
    responsibilities: str = Field(default="Lead labour survey analysis, validate datasets, oversee statistical publication", max_length=2000)
    email: str = Field(default="demo.officer@example.gov.in", max_length=150)
    workspace: str = Field(default="employee")

class GenerateInput(BaseModel):
    competency: str = "SQL"
    count: Literal[5, 10, 20] = 5
    question_type: Literal["MCQ", "True/False", "Scenario-based"] = "MCQ"
    document_id: str | None = None

class SubmitInput(BaseModel):
    assessment_id: str
    answers: dict[str, int]

class AdaptiveStartInput(BaseModel):
    competency: str | None = None

class AdaptiveAnswerInput(BaseModel):
    adaptive_session_id: str
    competency: str
    question: str
    answer: str

class ChatInput(BaseModel):
    message: str = Field(min_length=1, max_length=3000)

class ModuleInput(BaseModel):
    module: int = Field(ge=0, le=3)

class APIRecord(BaseModel):
    model_config = ConfigDict(extra="allow")
    id: str

class VASubmitInput(BaseModel):
    answers: dict[str, Any]