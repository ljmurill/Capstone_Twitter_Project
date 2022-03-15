from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable = False)
    image = db.Column(db.Text)
    comment = db.Column(db.Text, nullable = False)
    username = db.Column(db.String(50), nullable=False)
    profile_pic = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

    post = db.relationship("Post", back_populates="comments")
    user = db.relationship("User", back_populates="comments")
    likes = db.relationship("Like", back_populates="comments", cascade="all,delete")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'post_id': self.post_id,
        'image': self.image,
        'comment': self.comment,
        'username' : self.username,
        'profile_pic': self.profile_pic,
        'created_at': self.created_at
    }
