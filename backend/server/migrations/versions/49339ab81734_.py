"""empty message

Revision ID: 49339ab81734
Revises: 0a5639347e7f
Create Date: 2021-04-26 04:09:25.491099

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '49339ab81734'
down_revision = '0a5639347e7f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('last_logged_in', sa.String(length=16), nullable=True))
    op.add_column('user', sa.Column('status', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'status')
    op.drop_column('user', 'last_logged_in')
    # ### end Alembic commands ###
