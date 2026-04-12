from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from api.evidence import router as evidence_router
from auth.router import router as auth_router
from core.exceptions import register_exception_handlers
from core.config import settings

limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

app = FastAPI(title="DrRES API")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(evidence_router, prefix="/api/v1")
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to DrRES API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
