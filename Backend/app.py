from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import stripe
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
db = SQLAlchemy(app)
stripe.api_key = 'your_stripe_secret_key'
CORS(app)  # Enable CORS for all routes

# Example data (replace with your data storage logic)
properties = [
    {'id': 1, 'name': 'r1', 'location': 'MOMBASA', 'imageUrl': 'r1.jpeg', 'price': 250000},
    {'id': 2, 'name': 'r2', 'location': 'Kenya', 'imageUrl': 'r2.jpeg', 'price': 350000},
    {'id': 3, 'name': 'r3', 'location': 'KAREN, NAIROBI', 'imageUrl': 'r3.jpeg', 'price': 450000},
    {'id': 4, 'name': 'r7', 'location': 'City D', 'imageUrl': 'r7.jpeg', 'price': 550000},
    {'id': 5, 'name': 'r8', 'location': 'City E', 'imageUrl': 'r8.jpeg', 'price': 650000},
    {'id': 6, 'name': 'cont', 'location': 'KONZA CITY', 'imageUrl': 'valuee.jpeg', 'price': 750000},
    {'id': 7, 'name': 'hero', 'location': 'City D', 'imageUrl': 'contactt.jpeg', 'price': 550000},
    {'id': 8, 'name': 'va', 'location': 'City E', 'imageUrl': 'value.jpeg', 'price': 650000},
    {'id': 9, 'name': 'val', 'location': 'KONZA CITY', 'imageUrl': 'rr.jpeg', 'price': 750000}

]

# Serve images from 'images' folder in the project root
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

@app.route('/properties', methods=['GET'])
def get_properties():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 1000))
    start = (page - 1) * per_page
    end = start + per_page
    return jsonify(properties[start:end])

@app.route('/properties/<int:id>', methods=['GET'])
def get_property(id):
    property = next((prop for prop in properties if prop['id'] == id), None)
    if property:
        return jsonify(property)
    else:
        return jsonify({'error': 'Property not found'}), 404

@app.route('/properties', methods=['POST'])
def create_property():
    new_property = request.json
    if 'id' not in new_property:
        return jsonify({'error': 'ID is required'}), 400
    properties.append(new_property)
    return jsonify(new_property), 201

@app.route('/properties/<int:id>', methods=['PUT'])
def update_property(id):
    update_property = request.json
    for prop in properties:
        if prop['id'] == id:
            prop.update(update_property)
            return jsonify(prop)
    return jsonify({'error': 'Property not found'}), 404

@app.route('/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    global properties
    properties = [prop for prop in properties if prop['id'] != id]
    return '', 204

# Error Handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

# Run the application
# if __name__ == '__main__':
#     app.run(debug=True)
    

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