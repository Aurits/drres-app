from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from db.database import get_db
from schemas.evidence import EvidenceRead, EvidenceListResponse, FacetsResponse, SearchParams
from services.evidence_service import search_evidence, get_evidence_by_id, get_facets

router = APIRouter(prefix="/evidence", tags=["evidence"])


@router.get("/facets", response_model=FacetsResponse)
async def facets(db: AsyncSession = Depends(get_db)):
    return await get_facets(db)


@router.get("", response_model=EvidenceListResponse)
async def list_evidence(
    q: Optional[str] = Query(None, description="Full-text / boolean search query"),
    sdg: Optional[List[str]] = Query(None),
    type: Optional[List[str]] = Query(None),
    country: Optional[List[str]] = Query(None),
    sub_area: Optional[List[str]] = Query(None),
    year: Optional[List[str]] = Query(None),
    sort: str = Query("relevance", pattern="^(relevance|year_desc|year_asc)$"),
    page: int = Query(1, ge=1),
    per_page: int = Query(15, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    params = SearchParams(
        q=q,
        sdg=sdg,
        type=type,
        country=country,
        sub_area=sub_area,
        year=year,
        sort=sort,
        page=page,
        per_page=per_page,
    )
    return await search_evidence(db, params)


@router.get("/{evidence_id}", response_model=EvidenceRead)
async def get_evidence(evidence_id: int, db: AsyncSession = Depends(get_db)):
    record = await get_evidence_by_id(db, evidence_id)
    if not record:
        raise HTTPException(status_code=404, detail="Evidence record not found")
    return record
