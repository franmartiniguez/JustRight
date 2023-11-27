// Listing {props} are the same as the parameters for the add_rental function in the backend (minus self)
function Listing(props) {
    return (
        <div className="listing">
            <h1>{props.address}</h1>
            <div className="listing-properties-wrap">
                <ListingProperties listingProperties={props}></ListingProperties>
            </div>
        </div>
    );
}

function ListingProperties(props) {
    return (
        <div className="listing-properties">
            <ListingProperty propertyIcon={}
                             propertyName="Landlord Rating"
                             propertyText={props.landlord_rating}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={}
                             propertyName="Landlord Review"
                             propertyText={props.landlord_review}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={}
                             propertyName="Price"
                             propertyText={props.price}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={}
                             propertyName="Rental Rating"
                             propertyText={props.rental_rating}
            >
            </ListingProperty>
            <ListingProperty propertyIcon={}
                             propertyName="Rental Review"
                             propertyText={props.rental_review}
            >
            </ListingProperty>
        </div>
    );
}

function ListingProperty(props) {
    return (
        <div className="listing-property">
            <img src={props.propertyIcon} alt=""></img>
            <div className="listing-property-body">
                <h2>{props.propertyName + ": "}</h2>
                <h3>{props.propertyText}</h3>
            </div>
        </div>
    );
}

export default Listing;
