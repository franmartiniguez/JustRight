import {useEffect, useState} from "react";
import Listing from "./components/Listing";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Banner from "./components/Banner";
import Popup from "./components/Popup";

function App() {
    const [allRentals, updateAllRentals] = useState([]);
    const [isPopupOn, updatePopupStatus] = useState(false);

    console.log(isPopupOn);

    useEffect(() => {
        fetch("/get_all_rentals").then(
            (res) =>
                res.json().then(
                    (data) => {
                        updateAllRentals(data);
                    }
                )
        )
    }, []);

    function togglePopup() {
        updatePopupStatus(prevState => !prevState)
    }

    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Banner></Banner>
            <button onClick={togglePopup}>Post</button>
            <div className="underline">
                <h1 className="title">Available Listings</h1>
            </div>
            <div className="listings">
                {
                    allRentals.map(
                        (rental, index) => {
                            return rentalToListing(rental, index)
                        }
                    )
                }
            </div>
            <Popup toggle={isPopupOn}
                   close={togglePopup}
            >
                <h1 className="title">Post Listing</h1>
                <ListingPostForm togglePopup={togglePopup}
                >
                </ListingPostForm>
            </Popup>
        </div>
    );

}

function rentalToListing(rental, key) {
    return (
        <Listing address={rental["Address"]}
                 landlord_rating={rental["Landlord Rating"]}
                 landlord_review={rental["Landlord Review"]}
                 price={rental["Price"]}
                 rental_rating={rental["Rental Rating"]}
                 rental_review={rental["Rental Review"]}
                 key={key}
        >
        </Listing>
    )
}

function ListingPostForm(props) {

    const [address, updateAddress] = useState("");
    const [landlordRating, updateLandlordRating] = useState(5);
    const [landlordReview, updateLandlordReview] = useState("");
    const [price, updatePrice] = useState(0);
    const [rentalRating, updateRentalRating] = useState(5);
    const [rentalReview, updateRentalReview] = useState("")

    async function listingPostSubmit(e) {
        e.preventDefault()
        console.log(
            {
                "address": address,
                "landlord_rating": landlordRating,
                "landlord_review": landlordReview,
                "price": price,
                "rental_rating": rentalRating,
                "rental_review": rentalReview
            }
        )
        console.log(
            JSON.stringify(
                {
                    "address": address,
                    "landlord_rating": landlordRating,
                    "landlord_review": landlordReview,
                    "price": price,
                    "rental_rating": rentalRating,
                    "rental_review": rentalReview
                }
            )
        )

        let response = await fetch("/add_rental", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(
                {
                    "address": address,
                    "landlord_rating": landlordRating,
                    "landlord_review": landlordReview,
                    "price": price,
                    "rental_rating": rentalRating,
                    "rental_review": rentalReview
                }
            )
        })

        props.togglePopup()
    }

    return (
        <form className="listing-post-form"
              onSubmit={listingPostSubmit}
        >
            <LabeledInput label="Address"
                          type="string"
                          onChange={(e) => {updateAddress(e.target.value)}}
                          value={address}
            >
            </LabeledInput>
            <LabeledInput label="Landlord Rating"
                          type="number"
                          onChange={(e) => {
                              if (e.target.value > 0 && e.target.value <= 5) {
                                  updateLandlordRating(e.target.value);
                              }
                          }}
                          value={landlordRating}
            >
            </LabeledInput>
            <LabeledInput label="Landlord Review"
                          type="string"
                          onChange={(e) => {updateLandlordReview(e.target.value)}}
                          value={landlordReview}
            >
            </LabeledInput>
            <LabeledInput label="Price"
                          type="number"
                          onChange={(e) => {
                              if (e.target.value >= 0) {
                                  updatePrice(e.target.value);
                              }
                          }}
                          value={price}
            >
            </LabeledInput>
            <LabeledInput label="Rental Rating"
                          type="number"
                          onChange={(e) => {
                              if (e.target.value > 0 && e.target.value <= 5) {
                                  updateRentalRating(e.target.value);
                              }
                          }}
                          value={rentalRating}
            >
            </LabeledInput>
            <LabeledInput label="Rental Review"
                          type="string"
                          onChange={(e) => {updateRentalReview(e.target.value)}}
                          value={rentalReview}
            >
            </LabeledInput>
            <input type="submit" value="Post"></input>
        </form>
    )
}

function LabeledInput(props) {
    return (
        <label className="labeled-input">
            {props.label + ": "}
            <input type={props.type}
                   onChange={props.onChange}
                   value={props.value}
            >
            </input>
        </label>
    )
}

export default App;
