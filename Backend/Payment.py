from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import stripe

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
db = SQLAlchemy(app)
stripe.api_key = 'your_stripe_secret_key'

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.String(50), nullable=False)

@app.route('/favorite', methods=['POST'])
def add_to_favorite():
    data = request.json
    property_id = data.get('propertyId')
    user_id = '1'

    favorite_item = Favorite.query.filter_by(property_id=property_id, user_id=user_id).first()
    if favorite_item:
        db.session.delete(favorite_item)
        db.session.commit()
        return jsonify({'message': 'Removed from favorite'}), 200
    else:
        new_item = Favorite(property_id=property_id, user_id=user_id)
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'message': 'Added to favorite'}), 200

@app.route('/payment', methods=['POST'])
def process_payment():
    data = request.json
    amount = data.get('amount')
    currency = data.get('currency')

    try:
        intent = stripe.PaymentIntent.create(
            amount=int(float(amount) * 100),
            currency=currency,
        )
        return jsonify({'client_secret': intent.client_secret}), 200
    except Exception as e:
        return jsonify(error=str(e)), 403

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)