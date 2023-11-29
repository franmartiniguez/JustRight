from flask import Flask, render_template, request, jsonify, redirect
from firebase_admin import credentials, firestore
from firebase import Firebase  # Import your Firebase class from the previous code

app = Flask(__name__)

# Initialize Firebase
firebase_instance = Firebase()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_rental', methods=['POST'])
def add_rental():
    if request.method == 'POST':
        # Retrieve data from the form
        address = request.json['address']
        landlord_rating = float(request.json['landlord_rating'])
        landlord_review = request.json['landlord_review']
        price = float(request.json['price'])
        rental_rating = float(request.json['rental_rating'])
        rental_review = request.json['rental_review']

        # Add the rental to the database
        firebase_instance.add_rental(address, landlord_rating, landlord_review, price, rental_rating, rental_review)

        # Redirect to the home page or another appropriate page
        return redirect('/')
    else:
        return 'Invalid request method'

@app.route('/get_all_rentals', methods=['GET'])
def get_all_rentals():
    order_by = request.args.get('order_by')
    descending = request.args.get('descending') == 'True'

    # Get all rentals based on user preferences
    rentals = firebase_instance.get_all_rentals(order_by=order_by, descending=descending)

    return jsonify(rentals)

if __name__ == '__main__':
    app.run()