from unittest import TestCase
from flask_wtf import FlaskForm
from wtforms import StringField, TextField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import User

def no_space(form, field):
    if field.name == 'username':
        username = field.data
        if ' ' in username:
            raise ValidationError("Can't have spaces in username")
    else:
        password = field.data
        if ' ' in password:
            raise ValidationError("Can't have spaces in password")

# def profilepicurl(form, field):
#     profilepic_url = field.data
#     if profilepic_url and not profilepic_url.endswith(('.jpg', '.png', '.jpeg','.gif')):
#         raise ValidationError("Enter valid Profile Picture url ending with .jpg, .png, .jpeg, or .gif")
#     if profilepic_url and not profilepic_url.startswith('https'):
#         raise ValidationError("Enter valid Profile Picture url")

# def backgroundimageurl(form, field):
#     backgroundimage_url = field.data
#     if backgroundimage_url and not backgroundimage_url.endswith(('.jpg', '.png', '.jpeg','.gif')):
#         raise ValidationError("Enter valid Background Image url ending with .jpg, .png, .jpeg, or .gif")
#     if backgroundimage_url and not backgroundimage_url.startswith('https'):
#         raise ValidationError("Enter valid Background Image url")

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
        'username', validators=[DataRequired(message='Username required'), username_exists, no_space, Length(min=5, max=30, message='Username must be between 5 to 30 characters long')])
    email = StringField('email', validators=[DataRequired(message='Email required'), user_exists, Email(message='Enter a valid email')])
    password = StringField('password', validators=[DataRequired(message='Password required'), EqualTo('confirm_password', message='Passwords must match') ,Length(min=3, message='Password must be at least 3 characters long'), no_space])
    confirm_password = StringField('confirm_password', validators=[DataRequired(message='Confirm Password required')])
    profile_pic = TextField('profile_pic')
    background_image = TextField('background_image')
    created_at = StringField('created_at')
