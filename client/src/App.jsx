import AddBook from "./components/jsx/AddBook"
import NavBar from "./components/jsx/NavBar"
import BooksList from "./components/jsx/BooksList"
import BookDetails from "./components/jsx/BookDetails"
import SavePage from "./components/jsx/SavePage"
import { Route, Routes } from "react-router-dom"
import { Toaster, toast } from '@yusufceng1z/ding-react';
import StockPage from "./components/jsx/StockPage"
import Dashboard from "./components/jsx/Dashboard"

toast.configure({ sound: true, volume: 0.5 })

function App() {
  return (
    <>
      <Toaster position="top-center" theme="dark" />
      <div className="app">
        <NavBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<BooksList />} />
            <Route path="/create" element={<AddBook />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/saved" element={<SavePage />} />
            <Route path="/book/:id/stock" element={<StockPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App