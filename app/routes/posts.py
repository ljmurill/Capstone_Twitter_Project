from datetime import datetime
from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.forms.post_form import PostForm
from app.models import Post, db

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@post_routes.route('/all')
def all_posts():
    all = Post.query.all()
    return {'posts': [post.to_dict() for post in all]}

@post_routes.route('')
def get_posts():
    feed = current_user.followed_posts()
    feed = [post.to_dict() for post in feed]
    print(feed, '============================')
    return {'posts': feed}


@post_routes.route('', methods=['POST'])
def post():
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        if form.data['image']:
            post=Post(
                image=form.data['image'],
                tweet=form.data['tweet'],
                user_id=form.data['user_id'],
                username=form.data['username'],
                profile_pic=form.data['profile_pic'],
                created_at=datetime.now()
            )
        else:
            post=Post(
                tweet=form.data['tweet'],
                user_id=form.data['user_id'],
                username=form.data['username'],
                profile_pic=form.data['profile_pic'],
                created_at=datetime.now()
            )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    specific_post = Post.query.get(id)

    db.session.delete(specific_post)
    db.session.commit()
    return specific_post.to_dict()

@post_routes.route('/<int:id>/update', methods=['POST'])
def edit_post(id):
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        post = Post.query.get(id)


        post.image = form.data['image']
        post.tweet = form.data['tweet']




        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
