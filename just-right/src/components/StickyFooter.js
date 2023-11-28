function StickyFooter(props) {
    return (
        <footer className="sticky-footer">
            {props.children}
        </footer>
    )
}

export default StickyFooter;