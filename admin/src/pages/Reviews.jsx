import React, { useState } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: '',
    topRated: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/reviews/submit', formData);
      setMessage('✅ Product review submitted successfully!');
      setFormData({ name: '', comment: '', rating: '', topRated: false });
    } catch (error) {
      setMessage('❌ Error submitting review. Please try again.');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-indigo-100 to-white shadow-xl rounded-2xl">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">📝 Add a Product Review</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg text-center font-medium transition-all duration-300 ${
          message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-semibold text-gray-800">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-md font-semibold text-gray-800">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Write your comment here..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-md font-semibold text-gray-800">Rating (1 to 5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            min="1"
            max="5"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="topRated"
            checked={formData.topRated}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="text-gray-700 font-medium">Mark as Top Rated</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default Reviews;
