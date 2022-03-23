from asyncio import constants
from crypt import methods
from datetime import datetime
from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user
from flask_login import login_required
from app.models import db, Like
from app.forms.like_form import LikeForm


like_routes = Blueprint('likes', __name__)

@like_routes.route('/<int:id>/post')
def get_post_like(id):
    total = Like.query.filter(Like.post_id == id).all()
    return {like.user_id: like.to_dict() for like in total}

@like_routes.route('/<int:id>/comment')
def get_comment_like(id):
    total = Like.query.filter(Like.comment_id == id).all()
    return {like.user_id: like.to_dict() for like in total}

@like_routes.route('/<int:id>/post', methods=['POST'])
def post_like(id):

    like = Like(
        user_id=current_user.id,
        post_id=id
    )

    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@like_routes.route('/<int:id>/comment', methods=['POST'])
def comment_like(id):

    like = Like(
        user_id=current_user.id,
        comment_id=id
    )

    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@like_routes.route('/<int:id>/post', methods=['DELETE'])
def unlike_post(id):
    unlike = Like.query.filter((Like.user_id == current_user.id) and (Like.post_id == id)).first()

    db.session.delete(unlike)
    db.session.commit()
    return unlike.to_dict()

@like_routes.route('/<int:id>/comment', methods=['DELETE'])
def unlike_comment(id):
    unlike = Like.query.filter((Like.user_id == current_user.id) and (Like.comment_id == id)).first()

    db.session.delete(unlike)
    db.session.commit()
    return unlike.to_dict()
