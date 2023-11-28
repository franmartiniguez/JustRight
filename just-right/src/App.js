import {useEffect, useState} from "react";
import Listing from "./components/Listing";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Banner from "./components/Banner";

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
            <AppHeader></AppHeader>
            <Banner></Banner>
            <div className="listings">
                {
                    allRentals.map(
                        (rental, index) => {
                            return rentalToListing(rental, index)
                        }
                    )
                }
            </div>
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
