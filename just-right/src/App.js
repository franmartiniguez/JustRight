import {useEffect, useState} from "react";
import Listing from "./components/Listing";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Banner from "./components/Banner";
import Popup from "./components/Popup";
import ListingPostForm from "./components/ListingPostForm";
import StickyFooter from "./components/StickyFooter";
import OrderByForm from "./components/OrderByForm";

function App() {
    const [allRentals, updateAllRentals] = useState([]);
    const [isPostPopupOn, setIsPostPopupOn] = useState(false);
    const [isFilterPopupOn, setIsFilterPopupOn] = useState(false);
    const [url, updateURL] = useState("/get_all_rentals")

    // for ordering by
    const [isDescending, updateIsDescending] = useState(false);
    const [orderBy, setOrderBy] = useState("None");

    useEffect(() => {
        fetch(url).then(
            (res) =>
                res.json().then(
                    (data) => {
                        updateAllRentals(data);
                    }
                )
        )
    }, [url]);

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
                <h1 className="title">Order Listings</h1>
                <OrderByForm togglePopup={toggleFilterPopup}
                             updateURL={updateURL}
                             orderBy={orderBy}
                             setOrderBy={setOrderBy}
                             isDescending={isDescending}
                             updateIsDescending={updateIsDescending}
                >
                </OrderByForm>
            </Popup>
            <StickyFooter>
                <button onClick={togglePostPopup}>Post Listing</button>
                <button onClick={toggleFilterPopup}>Order Listings</button>
            </StickyFooter>
        </div>
    );

}

function rentalToListing(rental, key) {
    return (
        <Listing address={rental["Address"]}
                 landlord_rating={rental["LandlordRating"]}
                 landlord_review={rental["LandlordReview"]}
                 price={rental["Price"]}
                 rental_rating={rental["RentalRating"]}
                 rental_review={rental["RentalReview"]}
                 key={key}
        >
        </Listing>
    )
}

export default App;
