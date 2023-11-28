import dummy from "./images/dummy.png"

// Listing {props} are the same as the parameters for the add_rental function in the backend (minus self)
function Listing(props) {
    return (
        <div className="listing">
            <h1 className="address">{props.address}</h1>
            <div className="listing-properties-wrap">
                <ListingProperties listingProperties={props}></ListingProperties>
            </div>
        </div>
    );
}

function ListingProperties(props) {
    const data = props.listingProperties;

    return (
        <div className="listing-properties">
            <ListingProperty propertyIcon={dummy}
                             propertyName="Landlord Rating"
                             propertyText={data.landlord_rating}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={dummy}
                             propertyName="Landlord Review"
                             propertyText={data.landlord_review}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={dummy}
                             propertyName="Price"
                             propertyText={"$" + data.price}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={dummy}
                             propertyName="Rental Rating"
                             propertyText={data.rental_rating}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={dummy}
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
