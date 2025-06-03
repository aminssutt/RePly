import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeartRateGraph from '../components/HeartRateGraph'
import ZoneStatusBadge from '../components/ZoneStatusBadge'
import RecommendationCard from '../components/RecommendationCard'
import SyncStatusBar from '../components/SyncStatusBar'

const Dashboard = () => {
  const [heartRate, setHeartRate] = useState(75)
  const [age] = useState(30) // To be replaced with logged-in user's age

  useEffect(() => {
    // Simulate heart rate updates
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const change = Math.random() * 10 - 5 // Random variation between -5 and +5
        return Math.max(40, Math.min(200, prev + change))
      })
    }, 1000)

    return () => clearInterval(interval)
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

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your heart rate in real-time</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <HeartRateGraph />
        </motion.div>
        <div className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ZoneStatusBadge heartRate={heartRate} age={age} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <RecommendationCard heartRate={heartRate} age={age} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <SyncStatusBar />
      </motion.div>
    </motion.div>
  )
}

export default Dashboard 