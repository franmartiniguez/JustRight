function LabeledInput(props) {
    return (
        <label className="labeled-input">
            {props.label + ": "}
            <input type={props.type}
                   onChange={props.onChange}
                   value={props.value}
                   // For checkboxes
                   checked={props.checked}
            >
            </input>
        </label>
    )
}

export default LabeledInput;