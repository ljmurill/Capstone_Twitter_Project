from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, TextField, DateTimeField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


class PostForm(FlaskForm):

    image = TextField('image')
    tweet = TextField('tweet', validators=[DataRequired(message='Must insert a jot')])
    user_id = IntegerField('user_id')
    username = StringField('username')
    profile_pic = TextField('profile_pic')
    created_at = DateTimeField('created_at')
