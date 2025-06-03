import { motion } from 'framer-motion'

interface RecommendationCardProps {
  heartRate: number
  age: number
}

const RecommendationCard = ({ heartRate, age }: RecommendationCardProps) => {
  const maxHeartRate = 220 - age
  const getRecommendation = (hr: number) => {
    if (hr < maxHeartRate * 0.5) {
      return {
        message: "You are in the rest zone. Perfect for recovery.",
        icon: "💤"
      }
    } else if (hr < maxHeartRate * 0.7) {
      return {
        message: "You are in an optimal zone for endurance.",
        icon: "✅"
      }
    } else if (hr < maxHeartRate * 0.85) {
      return {
        message: "You are in a moderate intensity zone. Keep it up!",
        icon: "👍"
      }
    } else if (hr < maxHeartRate * 0.95) {
      return {
        message: "Warning, you are approaching your maximum zone. Slow down a bit.",
        icon: "⚠️"
      }
    } else {
      return {
        message: "Critical zone! Slow down immediately.",
        icon: "🚨"
      }
    }
  }

  const recommendation = getRecommendation(heartRate)

  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.h2 
        className="text-xl font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Recommendation
      </motion.h2>
      <motion.div 
        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.span 
          className="text-4xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          {recommendation.icon}
        </motion.span>
        <motion.p 
          className="text-lg text-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {recommendation.message}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default RecommendationCard 