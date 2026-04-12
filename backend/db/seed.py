"""
Seed script — populates the evidence table with initial data.
Run once on first deploy:
    DATABASE_URL=postgresql+asyncpg://... python db/seed.py
"""
import asyncio
import json
import os
import sys

# Allow running from the backend root
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from db.base import Base
from models.evidence import Evidence

DATABASE_URL = os.environ.get(
    "DATABASE_URL", "postgresql+asyncpg://drres:drres@localhost:5432/drres"
)

# ---------------------------------------------------------------------------
# Seed data — extend this list or replace with a JSON fixture file
# ---------------------------------------------------------------------------
SEED_DATA = [
    {
        "title": "'Give Me Some Time': Facilitators of and Barriers to Uptake of Home-Based HIV Testing During Household Contact Investigation for Tuberculosis in Kampala, Uganda",
        "type": "Primary Study",
        "sdg": "SDG 3: Good Health",
        "abstract": (
            "Background: Integrating home-based HIV counseling and testing (HCT) with tuberculosis "
            "(TB) evaluation could improve the uptake of HIV testing among household contacts of "
            "patients with active TB."
        ),
        "authors": "Armstrong-Hough M, Ggita J, Ayakaka I, Dowdy D, Cattamanchi A, Haberer JE, Katamba A, Davis JL",
        "year": "2018",
        "country": "Uganda",
        "priority_area": "Health Systems",
        "sub_area": "Disease Surveillance",
        "doi": "10.1097/QAI.0000000000001617",
        "citation": (
            "Armstrong-Hough M et al. (2018) 'Give Me Some Time'. "
            "JAIDS 77(4), 400-404"
        ),
    },
    {
        "title": "Climate-Resilient Agriculture Policies for Sub-Saharan Drylands",
        "type": "Systematic Review",
        "sdg": "SDG 13: Climate Action",
        "abstract": (
            "A comprehensive review of 144 pilot programs testing drought-resistant crop subsidies "
            "and soil moisture retention techniques across Sub-Saharan Africa."
        ),
        "authors": "Institute for Climate Impact",
        "year": "2024",
        "country": "Sub-Saharan Africa",
        "priority_area": "Food Security",
        "sub_area": "Crop Subsidies",
        "doi": None,
        "citation": None,
    },
    {
        "title": "AI in Primary Education: Infrastructure Requirements for Rural Deployment",
        "type": "Policy Brief",
        "sdg": "SDG 4: Quality Education",
        "abstract": (
            "Analysis of localized LLM deployment in off-grid educational facilities, highlighting "
            "the necessary hardware infrastructure and policy shifts required at the district level."
        ),
        "authors": "African Tech Policy Network",
        "year": "2024",
        "country": "Kenya",
        "priority_area": "Digital Infrastructure",
        "sub_area": "Broadband Access",
        "doi": None,
        "citation": None,
    },
]


async def seed():
    engine = create_async_engine(DATABASE_URL, echo=True)

    # Create tables if they don't exist yet (safe no-op if already present)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with AsyncSessionLocal() as session:
        for item in SEED_DATA:
            record = Evidence(**item)
            session.add(record)
        await session.commit()

    print(f"Seeded {len(SEED_DATA)} records successfully.")
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
