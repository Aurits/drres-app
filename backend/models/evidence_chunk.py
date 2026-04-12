from sqlalchemy import Column, Computed, ForeignKey, Index, Integer, Text
from sqlalchemy.dialects.postgresql import TSVECTOR
from sqlalchemy.orm import relationship

from db.base import Base


class EvidenceChunk(Base):
    __tablename__ = "evidence_chunks"

    id = Column(Integer, primary_key=True, index=True)

    # Parent evidence record
    evidence_id = Column(Integer, ForeignKey("evidence.id", ondelete="CASCADE"), nullable=False, index=True)

    # Position of this chunk within the document (0-based)
    chunk_index = Column(Integer, nullable=False)

    # Plain text of this chunk (~500 tokens, produced by the ingestion worker)
    text = Column(Text, nullable=False)

    # Per-chunk tsvector — no truncation risk since each chunk is small
    search_vector = Column(
        TSVECTOR,
        Computed("to_tsvector('english', coalesce(text, ''))", persisted=True),
    )

    # embedding column added via Alembic migration in Phase 4
    # once the pgvector extension is enabled in PostgreSQL.
    # Placeholder: ALTER TABLE evidence_chunks ADD COLUMN embedding vector(1536);

    evidence = relationship("Evidence", back_populates="chunks")

    __table_args__ = (
        Index("ix_evidence_chunks_search_vector", "search_vector", postgresql_using="gin"),
    )
