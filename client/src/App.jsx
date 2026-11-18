import AddBook from "./componenets/AddBook"
import NavBar from "./componenets/NavBar"
import BooksList from "./componenets/BooksList"
import BookDetails from "./componenets/BookDetails"
import { Route, Routes } from "react-router-dom"
import { Toaster, toast } from '@yusufceng1z/ding-react';
toast.configure({ sound: true, volume: 0.5 })

function App() {
  return (
    <div>
      <>
      <Toaster position="top-center" theme="dark" />
      </>
      <NavBar/>
      <Routes>
        <Route path="/" element={<BooksList/>} />
        <Route path="/create" element={<AddBook/>} />
        <Route path='/book/:id' element= {<BookDetails/>} />
      </Routes>
      
    </div>
  )
}

export default App
