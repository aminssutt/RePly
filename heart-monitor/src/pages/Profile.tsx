import { useState, useEffect } from 'react'
import { authService } from '../config/auth'

interface UserProfile {
  email: string
  weight: string
  height: string
  age: string
  gender: string
  activityLevel: string
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const user = await authService.getCurrentUser()
      if (user) {
        const { password, ...userProfile } = user
        setProfile(userProfile)
      }
    }
    loadProfile()
  }, [])

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Weight</h2>
              <p className="text-gray-600">{profile.weight} kg</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Height</h2>
              <p className="text-gray-600">{profile.height} cm</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Age</h2>
            <p className="text-gray-600">{profile.age} years</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Gender</h2>
            <p className="text-gray-600 capitalize">{profile.gender}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Activity Level</h2>
            <p className="text-gray-600 capitalize">{profile.activityLevel.replace(/_/g, ' ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 