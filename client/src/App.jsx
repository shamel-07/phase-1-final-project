import AddBook from "./componenets/AddBook"
import NavBar from "./componenets/NavBar"
import BooksList from "./componenets/booksList"


import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<BooksList/>} />
        <Route path="/create" element={<AddBook/>} />

      </Routes>
    </div>
  )
}

export default App
