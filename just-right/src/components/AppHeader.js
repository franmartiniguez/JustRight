import logo from "./images/logo.webp";

function AppHeader() {
    return (
        <div className="app-header">
            <img className="icon"
                 alt=""
                 src={logo}
            >
            </img>
            <p className="app-header-text">JustRight.com</p>
        </div>
    )
}

export default AppHeader;
