"""avatar icon column in users

Revision ID: 712ae26ab097
Revises: f0c2e195b0ab
Create Date: 2021-05-07 01:04:45.935789

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '712ae26ab097'
down_revision = 'f0c2e195b0ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('avatar', sa.String(length=123), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'avatar')
    # ### end Alembic commands ###
