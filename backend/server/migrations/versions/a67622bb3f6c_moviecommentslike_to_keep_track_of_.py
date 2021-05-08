"""moviecommentslike to keep track of which comment liked by who

Revision ID: a67622bb3f6c
Revises: 92f67ed9ad75
Create Date: 2021-05-08 06:38:56.713234

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a67622bb3f6c'
down_revision = '92f67ed9ad75'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('moviecommentslike',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.Column('comment_liked_by_user_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('moviecommentslike')
    # ### end Alembic commands ###
