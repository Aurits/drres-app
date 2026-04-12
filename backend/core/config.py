from pathlib import Path


from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[1]

class Settings(BaseSettings):

    model_config = SettingsConfigDict(
        env_file=str(BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ── Database ──────────────────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://drres:drres@localhost:5432/drres"
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_TIMEOUT: int = 30
    DB_POOL_RECYCLE: int = 1800  # recycle connections every 30 minutes

    # ── AWS / S3 (Phase 3) ────────────────────────────────────────────────────
    AWS_BUCKET: str = ""
    AWS_REGION: str = "af-south-1"
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""

    # ── OpenAI (Phase 4) ──────────────────────────────────────────────────────
    OPENAI_API_KEY: str = ""

    # ── Anthropic (Phase 4) ───────────────────────────────────────────────────
    ANTHROPIC_API_KEY: str = ""

    # ── Auth / JWT (Phase 6) ──────────────────────────────────────────────────
    JWT_SECRET_KEY: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── App ───────────────────────────────────────────────────────────────────
    ENVIRONMENT: str = "development"  # development | staging | production
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]



settings = Settings()
