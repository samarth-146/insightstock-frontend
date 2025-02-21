import React, { useState } from "react"

export default function EditProfile({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    username: profile.username,
    bio: profile.bio,
    membershipPrice: profile.membershipPrice,
    monetized: profile.monetized,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "isMonetized") {
      setFormData({ ...formData, monetized: e.target.checked })
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const validateForm = () => {
    const formErrors = {}

    if (!formData.username) {
      formErrors.username = "Username is required"
    }

    if (!formData.bio) {
      formErrors.bio = "Bio is required"
    }

    if (formData.monetized) {
      if (!formData.membershipPrice) {
        formErrors.membershipPrice = "Membership price is required"
      } else if (isNaN(formData.membershipPrice) || formData.membershipPrice <= 0) {
        formErrors.membershipPrice = "Membership price must be a positive number"
      }
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave({
        ...profile,
        ...formData,
        membershipPrice: Number.parseFloat(formData.membershipPrice),
      })
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
          </div>

          <div className="col-span-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            ></textarea>
            {errors.bio && <p className="mt-2 text-sm text-red-600">{errors.bio}</p>}
          </div>

          {profile.subscribersCount >= 1000 && (
            <div className="col-span-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isMonetized"
                    name="isMonetized"
                    type="checkbox"
                    checked={formData.monetized}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isMonetized" className="font-medium text-gray-700">
                    Monetize Profile
                  </label>
                  <p className="text-gray-500">Enable paid membership for your followers</p>
                </div>
              </div>
            </div>
          )}

          {formData.monetized && (
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="membershipPrice" className="block text-sm font-medium text-gray-700">
                Membership Price ($ / month)
              </label>
              <input
                type="number"
                name="membershipPrice"
                id="membershipPrice"
                value={formData.membershipPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.membershipPrice && <p className="mt-2 text-sm text-red-600">{errors.membershipPrice}</p>}
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
