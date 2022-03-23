from datetime import datetime
from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user
from flask_login import login_required
from app.models import db, User

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/<int:id>', methods = ['POST'])
@login_required
def follow(id):
    user = User.query.get(id)
    if user == current_user:
        return redirect('/')
    current_user.follow(user)
    db.session.commit()
    return user.to_dict()


@follow_routes.route('/<int:id>/unfollow', methods = ['POST'])
@login_required
def unfollow(id):
    user = User.query.get(id)
    if user == current_user:
        return redirect('/')
    current_user.unfollow(user)
    db.session.commit()
    return user.to_dict()


@follow_routes.route('/<int:id>/following', methods = ['GET'])
@login_required
def get_following(id):
    user = User.query.get(id)
    following = user.followed.all()
    return {'following': [follow.to_dict() for follow in following]}

@follow_routes.route('/<int:id>/followers', methods = ['GET'])
@login_required
def get_followers(id):
    user = User.query.get(id)
    followers = user.followers.all()
    return {'followers': [follow.to_dict() for follow in followers]}
