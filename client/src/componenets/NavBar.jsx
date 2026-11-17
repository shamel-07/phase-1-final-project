import { Link } from "react-router-dom"
import { Home,BookOpen,BellRing,Bookmark,Settings } from 'lucide-react'; 

function NavBar() {
    return (
        <div>
            <div className='navbar'>
                <Link className='nav-link' to="/">Books</Link>
                <Link className='nav-link' to="/create">Add Book</Link>
                <Link to="/" className="p-3 hover:bg-gray-200 rounded-xl transition-colors">
        <Home size={24} />
      </Link>
                <BookOpen size={24} />
                <BellRing size={24} />
                <Bookmark size={24} />
                <Settings size={24} />  
            </div>
        </div>
    )
}

export default NavBar
