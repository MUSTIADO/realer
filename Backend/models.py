from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

# class User(db.Model):
#     __tablename__ = "users"

#     id = db.Column(db.String(32), primary_key=True, default=get_uuid)
#     email = db.Column(db.String(150), unique=True, nullable=False)
#     password = db.Column(db.String(255), nullable=False)

#     def __repr__(self):
#         return f'<User {self.email}>'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)  # Note: In practice, hash passwords before saving

    def _repr_(self):
        return f'<User {self.username}>'

class Property(db.Model):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Property {self.name}>'