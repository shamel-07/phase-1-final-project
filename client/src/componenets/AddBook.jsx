import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL =
 "https://6afb5186730c1d152f337677.mockapi.io/api/v1/books"

function AddBook() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    date: '',
    name: '',
    avatar: '',
    description: '',
    price: '',
    image: '',
    rating: '',
    contact: '',
    creator: '',
    language: '',
    creatorDescription: '',
    bookDescription: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await axios.post(API_URL, formData)
      navigate('/')
    } catch (err) {
      setError('Please try again Cannot add book.')
      setSubmitting(false)
    }
  }

  return (
    <div className="addbook">
      <h1 className="form-title">HELP EXPLORE A NEW BOOK </h1>

      <form className="country-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Avatar
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

         <label>
          Avatar
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </label>

         <label>
          Price
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

         <label>
          image
          <input
            type="url"
            name="coverimage"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </label>

         <label>
          Rating
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </label>

          <label>
          Contact
          <input
            type="text"
            name="rating"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>

          <label>
          Creator
          <input
            type="url"
            name="creator"
            value={formData.creator}
            onChange={handleChange}
            required
          />
        </label>

          <label>
          Language
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          />
        </label>

          <label>
          CreatorDescription
          <input
            type="text"
            name="creatordescription"
            value={formData.creatordescription}
            onChange={handleChange}
            required
          />
        </label>

          <label>
          bookdescription
          <input
            type="text"
            name="bookdescription"
            value={formData.bookdescription}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button
            type="submit"
            className="submit button"
            disabled={submitting}
          >
            {submitting ? 'Adding…' : 'Add book'}
          </button>

          <button
            type="button"
            className="cancel button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBook;