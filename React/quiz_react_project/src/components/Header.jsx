import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <h1> Which Element are You? </h1>
            <h3> (based on completely random things) </h3>
            <div id="nav-links">
                <Link to="/"> Home </Link>
                <Link to="/quiz"> Quiz </Link>
            </div>
        </nav>
    );
}