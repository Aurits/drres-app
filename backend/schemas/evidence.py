from typing import List, Optional
from pydantic import BaseModel


class EvidenceRead(BaseModel):
    id: int
    title: str
    type: str
    sdg: str
    abstract: Optional[str] = None
    authors: Optional[str] = None
    year: Optional[str] = None
    country: Optional[str] = None
    priority_area: Optional[str] = None
    sub_area: Optional[str] = None
    doi: Optional[str] = None
    citation: Optional[str] = None

    model_config = {"from_attributes": True}


class EvidenceListResponse(BaseModel):
    items: List[EvidenceRead]
    total: int
    page: int
    per_page: int


class FacetsResponse(BaseModel):
    type: List[str]
    sdg: List[str]
    country: List[str]
    sub_area: List[str]
    year: List[str]


class SearchParams(BaseModel):
    q: Optional[str] = None
    sdg: Optional[List[str]] = None
    type: Optional[List[str]] = None
    country: Optional[List[str]] = None
    sub_area: Optional[List[str]] = None
    year: Optional[List[str]] = None
    sort: str = "relevance"   # "relevance" | "year_desc" | "year_asc"
    page: int = 1
    per_page: int = 15
