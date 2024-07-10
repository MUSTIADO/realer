# import os
# from flask import Flask, jsonify, request, send_from_directory, render_template
# from flask_sqlalchemy import SQLAlchemy
# import stripe
# from flask_cors import CORS
# import requests
# from requests.auth import HTTPBasicAuth
# import base64
# from datetime import datetime
# import logging

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
# db = SQLAlchemy(app)
# stripe.api_key = 'your_stripe_secret_key'
# # CORS(app)  # Enable CORS for all routes
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# # M-PESA API settings
# MPESA_CONSUMER_KEY = os.getenv('MPESA_CONSUMER_KEY')
# MPESA_CONSUMER_SECRET = os.getenv('MPESA_CONSUMER_SECRET')
# MPESA_BUSINESS_SHORTCODE = '600989'  # Replace with your actual Business Shortcode
# MPESA_PASSKEY = 'your_mpesa_passkey'  # Replace with your actual M-PESA Passkey
# MPESA_CALLBACK_URL = 'https://yourdomain.com/mpesa_callback'  # Replace with your actual Callback URL

# # Example properties data (unchanged)
# properties = [
#     {'id': 1, 'name': 'Lumo Residence', 'Location': 'Muthaiga', 'address': 'MOMBASA', 'imageUrl': 'r1.jpeg', 'price': 250000},
#     {'id': 2, 'name': 'Green-fields', 'Location': 'Thome', 'address': 'Kenya', 'imageUrl': 'r2.jpeg', 'price': 350000},
#     {'id': 3, 'name': 'Brookshade Villas', 'Location': 'Gigiri', 'address': 'KAREN, NAIROBI', 'imageUrl': 'r3.jpeg', 'price': 450000},
#     {'id': 4, 'name': 'Leo Springs', 'Location': 'Karen', 'address': 'City D', 'imageUrl': 'r7.jpeg', 'price': 550000},
#     {'id': 5, 'name': 'High Tower', 'Location': 'Kilimani', 'address': 'City E', 'imageUrl': 'r8.jpeg', 'price': 650000},
#     {'id': 6, 'name': 'Avalon Heights', 'Location': 'Runda', 'address': 'KONZA CITY', 'imageUrl': 'valuee.jpeg', 'price': 750000},
#     {'id': 7, 'name': 'PerfectPads', 'Location': 'Kileleshwa', 'address': 'City D', 'imageUrl': 'contactt.jpeg', 'price': 550000},
#     {'id': 8, 'name': 'Apex Homes', 'Location': 'Thome', 'address': 'Nyari', 'imageUrl': 'value.jpeg', 'price': 650000},
#     {'id': 9, 'name': 'Verdant Homes', 'Location': 'Rossyln', 'address': 'KONZA CITY', 'imageUrl': 'rr.jpeg', 'price': 750000},
#     {'id': 10, 'name': 'Oasis', 'Location': 'Ridgeways', 'address': 'KAREN, NAIROBI', 'imageUrl': 'b1.jpeg', 'price': 450000},
#     {'id': 11, 'name': 'Harmony Heights', 'Location': 'Kitisuru', 'address': 'City D', 'imageUrl': 'b2.jpeg', 'price': 550000},
#     {'id': 12, 'name': 'Evergreen Homes', 'Location': 'Spring Valley', 'address': 'City E', 'imageUrl': 'b3.jpeg', 'price': 650000},
#     {'id': 13, 'name': 'Nova Nook', 'Location': 'Karen', 'address': 'KONZA CITY', 'imageUrl': 'b4.jpeg', 'price': 750000},
#     {'id': 14, 'name': 'Opulent Suites', 'Location': 'Runda', 'address': 'City D', 'imageUrl': 'b5.jpeg', 'price': 550000},
#     {'id': 15, 'name': 'EcoUrban Living', 'Location': 'Rossyln', 'address': 'City E', 'imageUrl': 'b6.jpeg', 'price': 650000},
#     {'id': 16, 'name': 'Serenity Gardens', 'Location': 'Muthaiga', 'address': 'KONZA CITY', 'imageUrl': 'b7.jpeg', 'price': 750000}
# ]

# # Serve images from 'images' folder in the project root (unchanged)
# @app.route('/images/<path:filename>')
# def serve_image(filename):
#     return send_from_directory('images', filename)

# # Route to get properties with pagination (unchanged)
# @app.route('/properties', methods=['GET'])
# def get_properties():
#     page = int(request.args.get('page', 1))
#     per_page = int(request.args.get('per_page', 1000))
#     start = (page - 1) * per_page
#     end = start + per_page
#     return jsonify(properties[start:end])

# # Route to get a single property by ID (unchanged)
# @app.route('/properties/<int:id>', methods=['GET'])
# def get_property(id):
#     property = next((prop for prop in properties if prop['id'] == id), None)
#     if property:
#         return jsonify(property)
#     else:
#         return jsonify({'error': 'Property not found'}), 404

# # Route to create a new property (unchanged)
# @app.route('/properties', methods=['POST'])
# def create_property():
#     new_property = request.json
#     if 'id' not in new_property:
#         return jsonify({'error': 'ID is required'}), 400
#     properties.append(new_property)
#     return jsonify(new_property), 201

# # Route to update a property by ID (unchanged)
# @app.route('/properties/<int:id>', methods=['PUT'])
# def update_property(id):
#     update_property = request.json
#     for prop in properties:
#         if prop['id'] == id:
#             prop.update(update_property)
#             return jsonify(prop)
#     return jsonify({'error': 'Property not found'}), 404

# # Route to delete a property by ID (unchanged)
# @app.route('/properties/<int:id>', methods=['DELETE'])
# def delete_property(id):
#     global properties
#     properties = [prop for prop in properties if prop['id'] != id]
#     return '', 204

# # Error Handling (unchanged)
# @app.errorhandler(404)
# def not_found(error):
#     return jsonify({'error': 'Not found'}), 404

# @app.errorhandler(400)
# def bad_request(error):
#     return jsonify({'error': 'Bad request'}), 400

# # Database Model for Favorites (unchanged)
# class Favorite(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     property_id = db.Column(db.String(50), nullable=False)
#     user_id = db.Column(db.String(50), nullable=False)

# # Route to add/remove property from favorites (unchanged)
# @app.route('/favorite', methods=['POST'])
# def add_to_favorite():
#     data = request.json
#     property_id = data.get('propertyId')
#     user_id = '1'

#     favorite_item = Favorite.query.filter_by(property_id=property_id, user_id=user_id).first()
#     if favorite_item:
#         db.session.delete(favorite_item)
#         db.session.commit()
#         return jsonify({'message': 'Removed from favorites'}), 200
#     else:
#         new_item = Favorite(property_id=property_id, user_id=user_id)
#         db.session.add(new_item)
#         db.session.commit()
#         return jsonify({'message': 'Added to favorites'}), 200

# # Route to process payment using Stripe (unchanged)
# @app.route('/payment', methods=['POST'])
# def process_payment():
#     data = request.json
#     amount = data.get('amount')
#     currency = data.get('currency')

#     try:
#         intent = stripe.PaymentIntent.create(
#             amount=int(float(amount) * 100),
#             currency=currency,
#         )
#         return jsonify({'client_secret': intent.client_secret}), 200
#     except Exception as e:
#         return jsonify(error=str(e)), 403

# # Function to get M-PESA access token (unchanged)
# def get_mpesa_access_token(consumer_key, consumer_secret):
#     url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
#     response = requests.get(url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
#     if response.status_code == 200:
#         return response.json().get('access_token')
#     raise Exception(f"Failed to get access token: {response.status_code} - {response.text}")

# # Function to generate timestamp (unchanged)
# def generate_timestamp():
#     return datetime.now().strftime("%Y%m%d%H%M%S")

# # Function to generate M-PESA password (unchanged)
# def generate_password(business_short_code, pass_key, timestamp):
#     password = f"{business_short_code}{pass_key}{timestamp}"
#     return base64.b64encode(password.encode()).decode()

# # Route to initiate M-PESA CustomerBuyGoodsOnline payment
# @app.route('/pay', methods=['POST'])
# def mpesa_express():
#     data = request.json
#     phone_number = data.get('Msisdn')
#     amount = data.get('Amount')

#     logging.info(f"Payment Request: Phone - {phone_number}, Amount - {amount}")

#     try:
#         access_token = get_mpesa_access_token(MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET)
#     except Exception as e:
#         logging.error(f"Error getting access token: {str(e)}")
#         return jsonify({"error": str(e)}), 500

#     timestamp = generate_timestamp()
#     password = generate_password(MPESA_BUSINESS_SHORTCODE, MPESA_PASSKEY, timestamp)

#     url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
#     headers = {
#         'Content-Type': 'application/json',
#         'Authorization': f'Bearer {access_token}'
#     }
#     payload = {
#         "BusinessShortCode": MPESA_BUSINESS_SHORTCODE,
#         "Password": password,
#         "Timestamp": timestamp,
#         "TransactionType": "CustomerBuyGoodsOnline",
#         "Amount": amount,
#         "PartyA": phone_number,
#         "PartyB": MPESA_BUSINESS_SHORTCODE,
#         "PhoneNumber": phone_number,
#         "CallBackURL": MPESA_CALLBACK_URL,
#         "AccountReference": "My Safari App",
#         "TransactionDesc": "Buying goods online"
#     }

#     try:
#         response = requests.post(url, headers=headers, json=payload)
#         logging.info(f"Payment Response: {response.json()}")
#         return jsonify(response.json()), response.status_code
#     except Exception as e:
#         logging.error(f"Error initiating payment: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# # Route to initiate B2C payment (unchanged)
# @app.route('/b2c_payment', methods=['POST'])
# def b2c_payment():
#     ...

# # Route to serve index.html (unchanged)
# @app.route('/')
# def index():
#     return render_template('index.html')

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)

import os
from flask import Flask, jsonify, request, send_from_directory, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import stripe
import requests
from requests.auth import HTTPBasicAuth
import base64
from datetime import datetime
import json
import logging

# Initialize Flask application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'  # Replace with your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with your own secret key for session management
db = SQLAlchemy(app)
stripe.api_key = 'your_stripe_secret_key'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Models

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
    # Create the database and tables
with app.app_context():
    db.create_all()

# Favorite model
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.String(50), nullable=False)

# Example properties data
properties = [
    {'id': 1, 'name': 'Lumo Residence', 'Location': 'Muthaiga', 'address': 'MOMBASA', 'imageUrl': 'r1.jpeg', 'price': 250000},
    {'id': 2, 'name': 'Green-fields', 'Location': 'Thome', 'address': 'Kenya', 'imageUrl': 'r2.jpeg', 'price': 350000},
    {'id': 3, 'name': 'Brookshade Villas', 'Location': 'Gigiri', 'address': 'KAREN, NAIROBI', 'imageUrl': 'r3.jpeg', 'price': 450000},
    {'id': 4, 'name': 'Leo Springs', 'Location': 'Karen', 'address': 'City D', 'imageUrl': 'r7.jpeg', 'price': 550000},
    {'id': 5, 'name': 'High Tower', 'Location': 'Kilimani', 'address': 'City E', 'imageUrl': 'r8.jpeg', 'price': 650000},
    {'id': 6, 'name': 'Avalon Heights', 'Location': 'Runda', 'address': 'KONZA CITY', 'imageUrl': 'valuee.jpeg', 'price': 750000},
    {'id': 7, 'name': 'PerfectPads', 'Location': 'Kileleshwa', 'address': 'City D', 'imageUrl': 'contactt.jpeg', 'price': 550000},
    {'id': 8, 'name': 'Apex Homes', 'Location': 'Thome', 'address': 'Nyari', 'imageUrl': 'value.jpeg', 'price': 650000},
    {'id': 9, 'name': 'Verdant Homes', 'Location': 'Rossyln', 'address': 'KONZA CITY', 'imageUrl': 'rr.jpeg', 'price': 750000},
    {'id': 10, 'name': 'Oasis', 'Location': 'Ridgeways', 'address': 'KAREN, NAIROBI', 'imageUrl': 'b1.jpeg', 'price': 450000},
    {'id': 11, 'name': 'Harmony Heights', 'Location': 'Kitisuru', 'address': 'City D', 'imageUrl': 'b2.jpeg', 'price': 550000},
    {'id': 12, 'name': 'Evergreen Homes', 'Location': 'Spring Valley', 'address': 'City E', 'imageUrl': 'b3.jpeg', 'price': 650000},
    {'id': 13, 'name': 'Nova Nook', 'Location': 'Karen', 'address': 'KONZA CITY', 'imageUrl': 'b4.jpeg', 'price': 750000},
    {'id': 14, 'name': 'Opulent Suites', 'Location': 'Runda', 'address': 'City D', 'imageUrl': 'b5.jpeg', 'price': 550000},
    {'id': 15, 'name': 'EcoUrban Living', 'Location': 'Rossyln', 'address': 'City E', 'imageUrl': 'b6.jpeg', 'price': 650000},
    {'id': 16, 'name': 'Serenity Gardens', 'Location': 'Muthaiga', 'address': 'KONZA CITY', 'imageUrl': 'b7.jpeg', 'price': 750000}
]

# Routes

# Serve images from 'images' folder
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

# Route to get properties with pagination
@app.route('/properties', methods=['GET'])
def get_properties():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 1000))
    start = (page - 1) * per_page
    end = start + per_page
    return jsonify(properties[start:end])

# Route to get a single property by ID
@app.route('/properties/<int:id>', methods=['GET'])
def get_property(id):
    property = next((prop for prop in properties if prop['id'] == id), None)
    if property:
        return jsonify(property)
    else:
        return jsonify({'error': 'Property not found'}), 404

# Route to create a new property
@app.route('/properties', methods=['POST'])
def create_property():
    new_property = request.json
    if 'id' not in new_property:
        return jsonify({'error': 'ID is required'}), 400
    properties.append(new_property)
    return jsonify(new_property), 201

# Route to update a property by ID
@app.route('/properties/<int:id>', methods=['PUT'])
def update_property(id):
    update_property = request.json
    for prop in properties:
        if prop['id'] == id:
            prop.update(update_property)
            return jsonify(prop)
    return jsonify({'error': 'Property not found'}), 404

# Route to delete a property by ID
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

# Database initialization (create tables)
with app.app_context():
    db.create_all()

# Additional routes from the first application (User authentication)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, username=username, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create user', 'error': str(e)}), 500
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful', 'username': user.username}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    # In a more complex app, you might handle server-side logout logic here
    # For now, we'll just return a success message
    return jsonify({'message': 'Logged out successfully'}), 200

# # Additional routes from the second application (Favorites, Payment, M-PESA)

@app.route('/favorite', methods=['POST'])
def add_to_favorite():
    data = request.json
    property_id = data.get('propertyId')
    user_id = '1'  # Assuming a hardcoded user_id for demo purposes

    favorite_item = Favorite.query.filter_by(property_id=property_id, user_id=user_id).first()
    if favorite_item:
        db.session.delete(favorite_item)
        db.session.commit()
        return jsonify({'message': 'Removed from favorites'}), 200
    else:
        new_item = Favorite(property_id=property_id, user_id=user_id)
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'message': 'Added to favorites'}), 200

@app.route('/payment', methods=['POST'])
def process_payment():
    data = request.json
    amount = data.get('amount')
    currency = data.get('currency', 'usd')
    token = data.get('token')

    try:
        charge = stripe.Charge.create(
            amount=int(amount),
            currency=currency,
            source=token,
            description='Payment for property'
        )
        return jsonify({'message': 'Payment successful', 'charge_id': charge.id}), 200
    except stripe.error.StripeError as e:
        return jsonify({'message': 'Payment failed', 'error': str(e)}), 400

@app.route('/pay', methods=['POST'])
def mpesa_express():
    # Example endpoint for handling M-PESA Express payments
    # This would involve integrating with Safaricom's API
    # Placeholder for demonstration purposes
    return jsonify({'message': 'M-PESA payment endpoint'}), 200

# Serve index.html (if needed)
@app.route('/')
def index():
    return render_template('index.html')

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
