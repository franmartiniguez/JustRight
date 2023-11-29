function Popup(props) {
    return (props.toggle) ? (
        <div className="popup">
            <div className="popup-body">
                <button className="close-button" onClick={props.close}>Close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;