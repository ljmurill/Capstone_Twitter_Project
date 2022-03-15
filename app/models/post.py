from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    image = db.Column(db.Text)
    tweet = db.Column(db.Text, nullable = False)
    username = db.Column(db.String(50), nullable=False)
    profile_pic = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all,delete")
    likes = db.relationship("Like", back_populates="post", cascade="all,delete")


    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'image': self.image,
        'tweet': self.tweet,
        'username' : self.username,
        'profile_pic': self.profile_pic,
        'created_at': self.created_at
    }
