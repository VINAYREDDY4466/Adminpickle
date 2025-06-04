import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const ReviewList = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/reviews/all')
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || 'Failed to fetch reviews')
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast.error(error.response?.data?.message || 'Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + `/api/reviews/${id}`)

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message || 'Failed to delete review')
      }
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error(error.response?.data?.message || 'Failed to delete review')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return <div className="text-center py-4">Loading reviews...</div>
  }

  return (
    <>
      <p className='mb-2'>All Reviews List</p>
      <div className='flex flex-col gap-2'>
        {/* ------- List Table Title ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Comment</b>
          <b>Rating</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Review List ------ */}
        {list.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No reviews found</div>
        ) : (
          list.map((item) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={item._id}>
              <p>{item.name}</p>
              <p>{item.comment}</p>
              <p>{item.rating}/5</p>
              <p 
                onClick={() => removeProduct(item._id)} 
                className='text-right md:text-center cursor-pointer text-lg hover:text-red-500 transition-colors'
              >
                X
              </p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default ReviewList