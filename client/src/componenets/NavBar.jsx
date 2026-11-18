import { Link } from "react-router-dom"
import { BookOpen, House, Settings } from "lucide-react"

function NavBar() {
    return (
        <div className='navbar'>
            <Link className='nav-link' to="/">
                <House size={21} /> 
            </Link>
            <Link className='nav-link' to="/create"></Link>
            <button className='nav-link' aria-label="Settings">
                <BookOpen size={21} />
            </button>
        </div>
    )
}

export default NavBar