from datetime import datetime
from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.forms.post_form import PostForm
from app.models import Post, db

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
def get_posts():
    feed = current_user.followed_posts()
    return {'posts': [post.to_dict() for post in feed]}


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
    print(form.errors, '============================')
    return form.errors

@post_routes.route('', methods=['DELETE'])
def delete_post(post_id):
    specific_post = Post.query.get(post_id)

    db.session.delete(specific_post)
    db.session.commit()
    return specific_post.to_dict()

@post_routes.route('/update', methods=['POST'])
def edit_post(post_id):
    post = Post.query.get(post_id)

    post.image = request.form['image']
    post.tweet = request.form['tweet']

    db.session.commit()
    return post.to_dict()
