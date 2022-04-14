from copyreg import constructor
import imp
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.signup_form import SignUpForm
from app.models import User, Comment, Post, db
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<search>')
def users_search(search):
    users = User.query.filter(User.username.ilike(f'%{search}%')).all()

    return {'users': [user.to_dict() for user in users]}



@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/posts')
def all_content(id):
    posts = Post.query.filter(id==Post.user_id).order_by(Post.created_at.desc()).all()
    # comments = Comment.query.filter(id==Comment.user_id).order_by(Comment.created_at.desc()).all()

    # total = [post.to_dict() for post in posts] + [comment.to_dict() for comment in comments]
    total = [post.to_dict() for post in posts]

    # print(total, '============================')
    # total.sort(key=lambda x: x['created_at'], reverse=True)
    return {'total' : total}

@user_routes.route('/<int:id>', methods=['POST'])
def account_images(id):

    # form = SignUpForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():

        user = User.query.get(id)

        if "profile_pic" not in request.files and "background_image" not in request.files:

            if user.background_image == request.form['background_image']:
                user.background_image = user.background_image
            else:
                user.background_image = None
            if user.profile_pic == request.form['profile_pic']:
                user.profile_pic = user.profile_pic
            else:
                user.profile_pic = None


        elif "profile_pic" in request.files and "background_image" not in request.files:
            profile_pic = request.files['profile_pic']
            if not allowed_file(profile_pic.filename):
                return {"errors": "file type not permitted"}, 400

            profile_pic.filename = get_unique_filename(profile_pic.filename)

            upload = upload_file_to_s3(profile_pic)

            if "url" not in upload:
                return upload, 400

            if user.background_image == request.form['background_image']:
                user.background_image = user.background_image
            else:
                user.background_image = None
            user.profile_pic = upload["url"]

        elif "profile_pic" not in request.files and "background_image" in request.files:

            background_image = request.files['background_image']
            print(background_image, 'LETS GO')
            if not allowed_file(background_image.filename):
                return {"errors": "file type not permitted"}, 400

            background_image.filename = get_unique_filename(background_image.filename)

            upload = upload_file_to_s3(background_image)

            if "url" not in upload:
                return upload, 400
            if user.profile_pic == request.form['profile_pic']:
                user.profile_pic = user.profile_pic
            else:
                user.profile_pic = None
            user.background_image = upload["url"]
        else:
            background_image = request.files['background_image']
            if not allowed_file(background_image.filename):
                return {"errors": "file type not permitted"}, 400

            background_image.filename = get_unique_filename(background_image.filename)

            upload1 = upload_file_to_s3(background_image)

            if "url" not in upload1:
                return upload1, 400

            profile_pic = request.files['profile_pic']
            if not allowed_file(profile_pic.filename):
                return {"errors": "file type not permitted"}, 400

            profile_pic.filename = get_unique_filename(profile_pic.filename)

            upload2 = upload_file_to_s3(profile_pic)

            if "url" not in upload2:
                return upload2, 400
            user.background_image = upload1['url']
            user.profile_pic = upload2['url']

        db.session.commit()

        return user.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
