from flask_wtf import FlaskForm
from wtforms import StringField, TextField, DateTimeField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):

    image = TextField('image')
    comment = TextField('tweet', validators=[DataRequired(message='Must insert a reply')])
    user_id = IntegerField('user_id')
    post_id = IntegerField('post_id')
    username = StringField('username')
    profile_pic = TextField('profile_pic')
    created_at = DateTimeField('created_at')
