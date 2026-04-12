from __future__ import annotations

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, OperationalError


# ── Custom application exceptions ─────────────────────────────────────────────
# All inherit HTTPException so FastAPI handles them natively (no extra handler).

class AppException(HTTPException):
    """Base class for all application-level HTTP exceptions."""

    def __init__(self, detail: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        super().__init__(status_code=status_code, detail=detail)


class BadRequestException(AppException):
    def __init__(self, detail: str = "Bad request"):
        super().__init__(detail=detail, status_code=status.HTTP_400_BAD_REQUEST)


class UnauthorizedException(AppException):
    def __init__(self, detail: str = "Not authenticated"):
        super().__init__(detail=detail, status_code=status.HTTP_401_UNAUTHORIZED)


class ForbiddenException(AppException):
    def __init__(self, detail: str = "Insufficient permissions"):
        super().__init__(detail=detail, status_code=status.HTTP_403_FORBIDDEN)


class AccountLockedException(AppException):
    def __init__(self, detail: str = "Account is locked. Contact an administrator."):
        super().__init__(detail=detail, status_code=status.HTTP_403_FORBIDDEN)


class NotFoundException(AppException):
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(detail=detail, status_code=status.HTTP_404_NOT_FOUND)


class ConflictException(AppException):
    def __init__(self, detail: str = "Resource already exists"):
        super().__init__(detail=detail, status_code=status.HTTP_409_CONFLICT)


class ValidationException(AppException):
    def __init__(self, detail: str = "Validation error"):
        super().__init__(detail=detail, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


class InternalServerException(AppException):
    def __init__(self, detail: str = "An unexpected error occurred"):
        super().__init__(detail=detail, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceUnavailableException(AppException):
    def __init__(self, detail: str = "Service temporarily unavailable"):
        super().__init__(detail=detail, status_code=status.HTTP_503_SERVICE_UNAVAILABLE)


# ── Infrastructure-level handlers ─────────────────────────────────────────────
# These catch errors raised by SQLAlchemy / Pydantic — not our code directly.

def register_exception_handlers(app: FastAPI) -> None:
    """Register infrastructure-level exception handlers on the FastAPI app."""

    @app.exception_handler(RequestValidationError)
    async def validation_error_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        errors = [
            {"field": " → ".join(str(loc) for loc in err["loc"]), "message": err["msg"]}
            for err in exc.errors()
        ]
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"detail": "Validation error.", "errors": errors},
        )

    @app.exception_handler(IntegrityError)
    async def integrity_error_handler(
        request: Request, exc: IntegrityError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content={"detail": "A record with this data already exists."},
        )

    @app.exception_handler(OperationalError)
    async def db_operational_error_handler(
        request: Request, exc: OperationalError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"detail": "Database is temporarily unavailable. Please try again."},
        )

    @app.exception_handler(Exception)
    async def unhandled_error_handler(
        request: Request, exc: Exception
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "An unexpected error occurred."},
        )
