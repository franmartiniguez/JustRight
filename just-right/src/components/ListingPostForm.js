import {useState} from "react";

function ListingPostForm(props) {

    const [address, updateAddress] = useState("");
    const [landlordRating, updateLandlordRating] = useState(5);
    const [landlordReview, updateLandlordReview] = useState("");
    const [price, updatePrice] = useState(0);
    const [rentalRating, updateRentalRating] = useState(5);
    const [rentalReview, updateRentalReview] = useState("")

    async function listingPostSubmit(e) {
        e.preventDefault()

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

export default ListingPostForm;