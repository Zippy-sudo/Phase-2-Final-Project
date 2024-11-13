import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                className="nav-link"
            > Home </NavLink>
            <NavLink
                to="/addGame"
                className="nav-link"
            >Add A Game</NavLink>
            <NavLink
                to="/savedGames"
                className="nav-link">
                Saved Games
            </NavLink>
        </nav>
    )
}

export default NavBar;