import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { authService } from '../config/auth'

interface UserProfile {
  weight: string
  height: string
  age: string
  gender: string
  activityLevel: string
}

const Recommendations = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      const user = await authService.getCurrentUser()
      if (user) {
        const { email, password, ...userProfile } = user
        setProfile(userProfile)
      }
      setIsLoading(false)
    }
    loadProfile()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center text-gray-600">
        Please complete your profile to get personalized recommendations.
      </div>
    )
  }

  const bmi = Number(profile.weight) / Math.pow(Number(profile.height) / 100, 2)
  const maxHeartRate = 220 - Number(profile.age)

  const getRecommendations = () => {
    const recommendations = {
      exercises: [
        {
          name: 'Walking',
          description: 'Perfect for beginners and maintaining cardiovascular health',
          intensity: 'Low',
          duration: '30-45 minutes',
          image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          heartRateZone: `${Math.round(maxHeartRate * 0.5)}-${Math.round(maxHeartRate * 0.6)} BPM`
        },
        {
          name: 'Cycling',
          description: 'Great for building endurance and leg strength',
          intensity: 'Moderate',
          duration: '45-60 minutes',
          image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          heartRateZone: `${Math.round(maxHeartRate * 0.6)}-${Math.round(maxHeartRate * 0.7)} BPM`
        },
        {
          name: 'Swimming',
          description: 'Full-body workout with low impact on joints',
          intensity: 'Moderate to High',
          duration: '30-45 minutes',
          image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          heartRateZone: `${Math.round(maxHeartRate * 0.7)}-${Math.round(maxHeartRate * 0.8)} BPM`
        }
      ],
      nutrition: [
        {
          name: 'Pre-Workout Meal',
          description: 'Complex carbohydrates and lean protein',
          examples: 'Oatmeal with fruits, Greek yogurt with granola',
          image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          name: 'Post-Workout Recovery',
          description: 'Protein and simple carbohydrates',
          examples: 'Protein shake, banana with peanut butter',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          name: 'Daily Hydration',
          description: 'Stay hydrated throughout the day',
          examples: 'Water, electrolyte drinks, herbal teas',
          image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ]
    }

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Personalized Recommendations</h1>
        <p className="text-gray-600">
          Based on your profile: {profile.age} years old, {profile.activityLevel} activity level
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.exercises.map((exercise, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {exercise.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-2">{exercise.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Intensity:</span>
                    <span className="font-medium">{exercise.intensity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{exercise.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Heart Rate Zone:</span>
                    <span className="font-medium">{exercise.heartRateZone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nutrition Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.nutrition.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48">
                <img
                  src={tip.image}
                  alt={tip.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {tip.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-2">{tip.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Examples:</span>
                    <span className="font-medium text-right">{tip.examples}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Recommendations 