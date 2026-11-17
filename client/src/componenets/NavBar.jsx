import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div>
            <div className='navbar'>
                <Link className='nav-link' to="/">Books</Link>
                <Link className='nav-link' to="/create">Add Book</Link>
            </div>
        </div>
    )
}

export default NavBar
