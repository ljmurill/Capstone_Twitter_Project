from crypt import methods
from datetime import datetime
from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.forms.comment_form import CommentForm
from app.models import Comment, db

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

@comment_routes.route('/<int:id>')
def specific_post_comments(id):
    comments = Comment.query.filter(Comment.post_id == id).all()
    print(comments, '++++++++++++++++++++++++++')
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('', methods=['POST'])
def make_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data['image']:
            comment=Comment(
                image=form.data['image'],
                comment=form.data['comment'],
                post_id=form.data['post_id'],
                user_id=form.data['user_id'],
                username=form.data['username'],
                profile_pic=form.data['profile_pic'],
                created_at=datetime.now()
            )
        else:
            comment=Comment(
                comment=form.data['comment'],
                post_id=form.data['post_id'],
                user_id=form.data['user_id'],
                username=form.data['username'],
                profile_pic=form.data['profile_pic'],
                created_at=datetime.now()
            )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
