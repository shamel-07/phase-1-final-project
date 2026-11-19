import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from '@yusufceng1z/ding-react'

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
    creatorDesc: '',
    bookDesc: '',
    category: '',
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
      toast.success('Book created')
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
            placeholder='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            placeholder='date'
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
            placeholder='your avatar..'
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </label>

        <label className='full'>
          Description
          <textarea
            name="description"
            value={formData.description}
            placeholder="What's the book about?"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            placeholder='price'
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          image
          <input
            type="url"
            name="image"
            placeholder='Book cover..'
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Rating
          <input
            type="number"
            name="rating"
            placeholder='?/5'
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contact
          <input
            type="text"
            name="contact"
            placeholder='abc123@example.com'
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Creator
          <input
            type="text"
            name="creator"
            placeholder='creator'
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
            placeholder='language'
            value={formData.language}
            onChange={handleChange}
            required
          />
        </label>

        <label className='full'>
          Creator Description
          <input
            type="text"
            name="creatorDesc"
            placeholder='who is the creator'
            value={formData.creatorDesc}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <input
            type="text"
            name="category"
            placeholder='Category'
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>

        <label className='full'>
          Book Description
          <input
            type="text"
            name="bookDesc"
            placeholder='Book description...'
            value={formData.bookDesc}
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