from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, EmailStr
from typing import List
from db.database import get_db
from auth import service as auth_service
from auth.utils import get_current_user
from auth.models import User

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UpdateUserRequest(BaseModel):
    full_name: str = None
    email: EmailStr = None
    role: str = None
    is_active: bool = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str = None
    role: str
    is_active: bool
    class Config:
        from_attributes = True

@router.post("/register", response_model=UserResponse)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    return await auth_service.register(db, data.email, data.password, data.full_name)

@router.post("/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await auth_service.login(db, data.email, data.password)

@router.get("/me", response_model=UserResponse)
async def me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/users", response_model=List[UserResponse])
async def get_all_users(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(User))
    return result.scalars().all()

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await auth_service.get_user_by_id(db, user_id)

@router.patch("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, data: UpdateUserRequest, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = await auth_service.get_user_by_id(db, user_id)
    if data.full_name is not None:
        user.full_name = data.full_name
    if data.email is not None:
        user.email = data.email
    if data.role is not None:
        user.role = data.role
    if data.is_active is not None:
        user.is_active = data.is_active
    await db.commit()
    await db.refresh(user)
    return user

@router.delete("/users/{user_id}")
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = await auth_service.get_user_by_id(db, user_id)
    await db.delete(user)
    await db.commit()
    return {"message": f"User {user_id} deleted successfully"}
