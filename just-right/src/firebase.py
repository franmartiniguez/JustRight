import firebase_admin
from firebase_admin import credentials, firestore

class Firebase:
    def __init__(self):
        cred = credentials.Certificate('key.json')
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def add_rental(self, address, landlord_rating, landlord_review, price, rental_rating, rental_review):
        """
        Add a rental to the Firestore database.

        Parameters:
        - address: str, the address of the rental
        - landlord_rating: float, the rating for the landlord
        - landlord_review: str, the review for the landlord
        - price: float, the rental price
        - rental_rating: float, the rating for the rental property
        - rental_review: str, the review for the rental property
        """
        # Reference to the "Rentals" collection
        rentals_ref = self.db.collection('Rentals')

        # Create a document with auto-generated ID
        new_rental_ref = rentals_ref.add({
            'Address': address,
            'Landlord Rating': landlord_rating,
            'Landlord Review': landlord_review,
            'Price': price,
            'Rental Rating': rental_rating,
            'Rental Review': rental_review
        })
    
    def get_all_rentals(self, order_by=None, descending=False):
        """
        Retrieve all rentals from the Firestore database.

        Parameters:
        - order_by: str, the field to order by (e.g., 'Price', 'LandlordRating')
        - descending: bool, True for descending order, False for ascending order

        Returns:
        A list of rental documents (dictionaries) from the "Rentals" collection.
        """
        # Reference to the "Rentals" collection
        rentals_ref = self.db.collection('Rentals')

        # Query to get all rentals
        query = rentals_ref

        # Order the query if 'order_by' is specified
        if order_by:
            order_direction = firestore.Query.DESCENDING if descending else firestore.Query.ASCENDING
            query = query.order_by(order_by, direction=order_direction)

        # Execute the query
        rentals = query.get()

        # Convert the query results to a list of dictionaries
        rentals_list = [rental.to_dict() for rental in rentals]

        return rentals_list
