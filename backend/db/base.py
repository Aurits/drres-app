from datetime import datetime, timezone

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Base(DeclarativeBase):
    # Audit timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, onupdate=_utcnow, nullable=False
    )
    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True, default=None
    )

    # Audit actors (user IDs or identifiers)
    created_by: Mapped[str | None] = mapped_column(String(255), nullable=True, default=None)
    updated_by: Mapped[str | None] = mapped_column(String(255), nullable=True, default=None)
    deleted_by: Mapped[str | None] = mapped_column(String(255), nullable=True, default=None)
