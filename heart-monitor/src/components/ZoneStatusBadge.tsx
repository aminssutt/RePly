import { motion } from 'framer-motion'

interface ZoneStatusBadgeProps {
  heartRate: number
  age: number
}

const ZoneStatusBadge = ({ heartRate, age }: ZoneStatusBadgeProps) => {
  const maxHeartRate = 220 - age
  const getZoneInfo = (hr: number) => {
    if (hr < maxHeartRate * 0.5) {
      return {
        name: 'Rest',
        color: 'bg-resting',
        emoji: '😴'
      }
    } else if (hr < maxHeartRate * 0.6) {
      return {
        name: 'Warm-up',
        color: 'bg-optimal',
        emoji: '🏃'
      }
    } else if (hr < maxHeartRate * 0.7) {
      return {
        name: 'Fat Burning Zone',
        color: 'bg-optimal',
        emoji: '🔥'
      }
    } else if (hr < maxHeartRate * 0.8) {
      return {
        name: 'Aerobic Zone',
        color: 'bg-exercising',
        emoji: '💪'
      }
    } else if (hr < maxHeartRate * 0.9) {
      return {
        name: 'Anaerobic Zone',
        color: 'bg-exercising',
        emoji: '⚡'
      }
    } else {
      return {
        name: 'Red Zone',
        color: 'bg-warning',
        emoji: '⚠️'
      }
    }
  }

  const zoneInfo = getZoneInfo(heartRate)

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
        Current Zone
      </motion.h2>
      <motion.div 
        className={`${zoneInfo.color} text-white p-4 rounded-lg flex items-center justify-between`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <div>
          <motion.p 
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {zoneInfo.name}
          </motion.p>
          <motion.p 
            className="text-sm opacity-90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {heartRate} BPM
          </motion.p>
        </div>
        <motion.span 
          className="text-4xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          {zoneInfo.emoji}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

export default ZoneStatusBadge 