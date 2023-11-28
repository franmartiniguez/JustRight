import {useEffect, useState} from "react";
import Listing from "./components/Listing";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Banner from "./components/Banner";
import Popup from "./components/Popup";
import ListingPostForm from "./components/ListingPostForm";
import StickyFooter from "./components/StickyFooter";

function App() {
    const [allRentals, updateAllRentals] = useState([]);
    const [isPostPopupOn, setIsPostPopupOn] = useState(false);
    const [isFilterPopupOn, setIsFilterPopupOn] = useState(false);


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

    function togglePostPopup() {
        if (!isFilterPopupOn) {
            setIsPostPopupOn(prevState => !prevState)
        }
    }

    function toggleFilterPopup() {
        if (!isPostPopupOn) {
            setIsFilterPopupOn(prevState => !prevState);
        }
    }

    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Banner></Banner>
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
            <Popup toggle={isPostPopupOn}
                   close={togglePostPopup}
            >
                <h1 className="title">Post Listing</h1>
                <ListingPostForm togglePopup={togglePostPopup}
                >
                </ListingPostForm>
            </Popup>
            <Popup toggle={isFilterPopupOn}
                   close={toggleFilterPopup}
            >
                <h1 className="title">Filter Listings</h1>
            </Popup>
            <StickyFooter>
                <button onClick={togglePostPopup}>Post Listing</button>
                <button onClick={toggleFilterPopup}>Filter Listings</button>
            </StickyFooter>
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
