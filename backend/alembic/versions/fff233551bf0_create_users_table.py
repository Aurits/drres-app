"""create users table

Revision ID: fff233551bf0
Revises: 3e0154a557ec
Create Date: 2026-04-12 14:01:28.836000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = 'fff233551bf0'
down_revision: Union[str, None] = '3e0154a557ec'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=True),
    sa.Column('role', sa.Enum('public', 'researcher', 'admin', name='userrole'), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('email_verified_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
