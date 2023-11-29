import LabeledInput from "./LabeledInput";

function OrderByForm(props) {

    function boolString(bool) {
        if (bool) {
            return "True";
        }
        return "False";
    }

    function handleDescendingOnChange() {
        if (props.orderBy === "None") {
            props.updateURL("/get_all_rentals")
        } else {
            props.updateURL("/get_all_rentals?order_by=" + props.orderBy + "&descending=" + boolString(!props.isDescending))
        }
        props.updateIsDescending(prevState => !prevState)
    }

    function updateOrderByTo(attribute) {
        props.setOrderBy(attribute);
        if (attribute === "None") {
            props.updateURL("/get_all_rentals")
        } else {
            props.updateURL("/get_all_rentals?order_by=" + attribute + "&descending=" + boolString(props.isDescending))
        }
    }

    return (
        <div>
            <p>Order listings by:</p>
            <form className="popup-form">
                <LabeledInput label="Landlord Rating"
                              onChange={() => updateOrderByTo("LandlordRating")}
                              type="checkbox"
                              checked={props.orderBy === "LandlordRating"}
                >
                </LabeledInput>
                <LabeledInput label="Price"
                              onChange={() => updateOrderByTo("Price")}
                              type="checkbox"
                              checked={props.orderBy === "Price"}
                >
                </LabeledInput>
                <LabeledInput label="Rental Rating"
                              onChange={() => updateOrderByTo("RentalRating")}
                              type="checkbox"
                              checked={props.orderBy === "RentalRating"}
                >
                </LabeledInput>
                <LabeledInput label="No ordering"
                              onChange={() => updateOrderByTo("None")}
                              type="checkbox"
                              checked={props.orderBy === "None"}
                >
                </LabeledInput>
                <LabeledInput label="Descending?"
                              onChange={handleDescendingOnChange}
                              type="checkbox"
                              checked={props.isDescending && !(props.orderBy === "None")}
                >
                </LabeledInput>
            </form>
        </div>
    )

}

export default OrderByForm;
