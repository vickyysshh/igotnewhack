from pydantic import BaseModel, Field, ConfigDict
from typing import Literal, Any

class DemoState(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    role: str
    profile: dict
    competencies: list[dict]
    learning: dict
    results: list[dict]
    documents: list[dict]
    programmes: list[str]
    notifications_read: bool
    history: list[dict]

class LoginInput(BaseModel):
    role: Literal["employee", "trainer", "admin", "super-admin"]

class ProfileInput(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    designation: str = Field(min_length=2, max_length=100)
    department: str = Field(min_length=2, max_length=100)
    experience: int = Field(ge=0, le=50)
    location: str = Field(min_length=2, max_length=100)
    education: str = Field(max_length=300)
    expertise: str = Field(max_length=500)
    responsibilities: str = Field(max_length=2000)

class GenerateInput(BaseModel):
    competency: str = "SQL"
    count: Literal[5, 10, 20] = 10
    question_type: Literal["MCQ", "True/False", "Scenario-based"] = "MCQ"
    document_id: str | None = None

class SubmitInput(BaseModel):
    assessment_id: str
    answers: dict[str, int]

class ChatInput(BaseModel):
    message: str = Field(min_length=1, max_length=3000)

class ModuleInput(BaseModel):
    module: int = Field(ge=0, le=3)

class APIRecord(BaseModel):
    model_config = ConfigDict(extra="allow")
    id: str