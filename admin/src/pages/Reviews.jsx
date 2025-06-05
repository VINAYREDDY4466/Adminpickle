import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

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
      await axios.post(`${backendUrl}/api/reviews/submit`, formData);
      setMessage('✅ Review submitted successfully!');
      setFormData({ name: '', comment: '', rating: '', topRated: false });
    } catch (error) {
      setMessage('❌ Failed to submit. Try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Submit a Review</h2>

      {message && (
        <div className={`mb-4 text-sm text-center py-2 px-4 rounded ${
          message.includes('❌') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Your comment"
          rows="3"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="topRated"
            checked={formData.topRated}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>Mark as Top Rated</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Reviews;


