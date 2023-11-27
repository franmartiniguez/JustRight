import {useEffect, useState} from "react";
import Listing from "./components/Listing";
import "./App.css";

function App() {
    const [allRentals, updateAllRentals] = useState([]);

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

    return (
        <div className="App">
            {
                allRentals.map(
                    (rental, index) => {
                        return rentalToListing(rental, index)
                    }
                )
            }
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

export default App;
