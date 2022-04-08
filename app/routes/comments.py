from crypt import methods
from datetime import datetime
from email.mime import image
from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.forms.comment_form import CommentForm
from app.models import Comment, db
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@comment_routes.route('')
def all_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:id>')
def specific_post_comments(id):
    comments = Comment.query.filter(Comment.post_id == id).order_by(Comment.created_at.desc()).all()

    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('', methods=['POST'])
def make_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if "image" not in request.files:

            user_id = request.form["user_id"]
            post_id = request.form["post_id"]
            comment = request.form["comment"]
            username = request.form["username"]
            profile_pic = current_user.profile_pic

            new_comment=Comment(
                comment=comment,
                post_id=post_id,
                user_id=user_id,
                username=username,
                profile_pic=profile_pic,
                created_at=datetime.now()
            )
        else:
            image = request.files['image']


            if not allowed_file(image.filename):

                return {"errors": "file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:

                return upload, 400

            image=upload["url"]
            user_id = request.form["user_id"]
            post_id = request.form["post_id"]
            comment = request.form["comment"]
            username = request.form["username"]
            profile_pic = current_user.profile_pic

            new_comment=Comment(
                image = image,
                comment=comment,
                post_id=post_id,
                user_id=user_id,
                username=username,
                profile_pic=profile_pic,
                created_at=datetime.now()
            )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()

@comment_routes.route('/<int:id>/updates', methods=['POST'])
def update_comment(id):

    form=CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_comment = Comment.query.get(id)
        if "image" not in request.files:
            if edit_comment.image == request.form['image']:
                edit_comment.image = edit_comment.image
            else:
                edit_comment.image = None

            comment = request.form['comment']
            edit_comment.comment = comment
        
        else:
            image = request.files['image']

            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            comment = request.form['comment']
            image = upload['url']

            edit_comment.comment = comment
            edit_comment.image = image

        db.session.commit()
        return edit_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
