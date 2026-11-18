import { Link } from "react-router-dom"
import { BookOpen, House, Save } from "lucide-react"

function NavBar() {
    return (
        <div className='navbar'>
            <Link className='nav-link' to="/">
                <House size={21} /> 
            </Link>
            <Link className='nav-link' to="/create">
                <BookOpen size={21} />
            </Link>
            <Link className='nav-link' to="/saved">
                <Save size={21} />
            </Link>
        </div>
    )
}

export default NavBar