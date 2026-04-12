from sqlalchemy import Column, Index, Integer, String, Text, Computed
from sqlalchemy.dialects.postgresql import TSVECTOR
from sqlalchemy.orm import relationship

from db.base import Base


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text, nullable=False)
    type = Column(String(100), nullable=False)
    sdg = Column(String(100), nullable=False)
    abstract = Column(Text, nullable=True)
    authors = Column(Text, nullable=True)
    year = Column(String(10), nullable=True)
    country = Column(String(150), nullable=True)
    priority_area = Column(String(200), nullable=True)
    sub_area = Column(String(200), nullable=True)
    doi = Column(String(300), nullable=True)
    citation = Column(Text, nullable=True)

    # S3 reference — stores the object key (e.g. "evidence/2024/paper.pdf")
    s3_key = Column(String(500), nullable=True)

    # Metadata-only tsvector for fast listing/filter search.
    # Full document search runs against evidence_chunks.search_vector.
    search_vector = Column(
        TSVECTOR,
        Computed(
            "to_tsvector('english',"
            " coalesce(title, '') || ' ' ||"
            " coalesce(abstract, '') || ' ' ||"
            " coalesce(authors, '')"
            ")",
            persisted=True,
        ),
    )

    # Chunks produced by the ingestion worker (populated in Phase 3)
    chunks = relationship("EvidenceChunk", back_populates="evidence", lazy="noload")

    __table_args__ = (
        Index("ix_evidence_search_vector", "search_vector", postgresql_using="gin"),
    )
