import {Link} from "react-router-dom";

function Footer() {
    return <footer>
        <Link to={'/about'}><h3>&copy; 2025 Copyright by Loża Szyderców - Akademia Tarnowska</h3></Link>
    </footer>
}

export default Footer;
