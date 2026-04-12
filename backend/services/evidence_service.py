from typing import Optional, List
from sqlalchemy import select, func, distinct, text
from sqlalchemy.ext.asyncio import AsyncSession

from models.evidence import Evidence
from schemas.evidence import SearchParams, EvidenceListResponse, EvidenceRead, FacetsResponse


async def search_evidence(db: AsyncSession, params: SearchParams) -> EvidenceListResponse:
    stmt = select(Evidence)

    # Full-text search
    if params.q:
        tsquery = func.websearch_to_tsquery("english", params.q)
        stmt = stmt.where(Evidence.search_vector.op("@@")(tsquery))

    # Faceted filters
    if params.sdg:
        stmt = stmt.where(Evidence.sdg.in_(params.sdg))
    if params.type:
        stmt = stmt.where(Evidence.type.in_(params.type))
    if params.country:
        stmt = stmt.where(Evidence.country.in_(params.country))
    if params.sub_area:
        stmt = stmt.where(Evidence.sub_area.in_(params.sub_area))
    if params.year:
        stmt = stmt.where(Evidence.year.in_(params.year))

    # Count total before pagination
    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = (await db.execute(count_stmt)).scalar_one()

    # Sorting
    if params.sort == "year_desc":
        stmt = stmt.order_by(Evidence.year.desc().nullslast())
    elif params.sort == "year_asc":
        stmt = stmt.order_by(Evidence.year.asc().nullslast())
    elif params.q:
        # Rank by relevance when a search query is present
        tsquery = func.websearch_to_tsquery("english", params.q)
        stmt = stmt.order_by(func.ts_rank(Evidence.search_vector, tsquery).desc())
    else:
        stmt = stmt.order_by(Evidence.id)

    # Pagination
    offset = (params.page - 1) * params.per_page
    stmt = stmt.offset(offset).limit(params.per_page)

    result = await db.execute(stmt)
    items = result.scalars().all()

    return EvidenceListResponse(
        items=[EvidenceRead.model_validate(item) for item in items],
        total=total,
        page=params.page,
        per_page=params.per_page,
    )


async def get_evidence_by_id(db: AsyncSession, evidence_id: int) -> Optional[Evidence]:
    result = await db.execute(select(Evidence).where(Evidence.id == evidence_id))
    return result.scalar_one_or_none()


async def get_facets(db: AsyncSession) -> FacetsResponse:
    async def distinct_values(col):
        result = await db.execute(
            select(distinct(col)).where(col.isnot(None)).order_by(col)
        )
        return [row[0] for row in result.all()]

    return FacetsResponse(
        type=await distinct_values(Evidence.type),
        sdg=await distinct_values(Evidence.sdg),
        country=await distinct_values(Evidence.country),
        sub_area=await distinct_values(Evidence.sub_area),
        year=await distinct_values(Evidence.year),
    )
