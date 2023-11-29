import dummy from "./images/dummy.png"
import rental from "./images/rental.png"
import landlord from "./images/landlord.png"
import price from "./images/price.png"
import review from "./images/review.png"

// Listing {props} are the same as the parameters for the add_rental function in the backend (minus self)
function Listing(props) {
    return (
        <div className="listing underline">
            <h1 className="address">{props.address}</h1>
            <div className="listing-properties-wrap">
                <ListingProperties listingProperties={props}></ListingProperties>
            </div>
        </div>
    );
}

function ListingProperties(props) {
    const data = props.listingProperties;

    const rateStringGenerator = (rating) => {
        return rating + " (" + "★".repeat(Math.floor(rating)) + ")";
    }

    return (
        <div className="listing-properties">
            <ListingProperty propertyIcon={landlord}
                             propertyName="Landlord Rating"
                             propertyText={rateStringGenerator(data.landlord_rating)}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={review}
                             propertyName="Landlord Review"
                             propertyText={data.landlord_review}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={price}
                             propertyName="Price"
                             propertyText={"$" + data.price}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={rental}
                             propertyName="Rental Rating"
                             propertyText={rateStringGenerator(data.rental_rating)}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={review}
                             propertyName="Rental Review"
                             propertyText={data.rental_review}
            >
            </ListingProperty>
        </div>
    );
}

function ListingProperty(props) {
    return (
        <div className="listing-property">
            <img src={props.propertyIcon}
                 alt=""
                 className="icon"
            >
            </img>
            <div className="listing-property-body">
                <p className="property-name">{props.propertyName + ": "}</p>
                <p className="property-text">{props.propertyText}</p>
            </div>
        </div>
    );
}

export default Listing;
