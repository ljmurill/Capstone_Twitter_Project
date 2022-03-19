from unittest import TestCase
from flask_wtf import FlaskForm
from wtforms import StringField, TextField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(message='Enter a valid email')])
    password = StringField('password', validators=[DataRequired()])
    profile_pic = TextField('profile_pic')
    background_image = TextField('background_image')
    created_at = StringField('created_at')
