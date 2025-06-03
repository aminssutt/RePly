import { useState, useEffect } from 'react'
import { WifiIcon, Battery100Icon, Battery50Icon, Battery0Icon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const SyncStatusBar = () => {
  const [isConnected, setIsConnected] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [lastSync, setLastSync] = useState(new Date())

  useEffect(() => {
    // Battery level simulation
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 0.1))
    }, 60000) // Decreases by 0.1% every minute

    return () => clearInterval(interval)
  }, [])

  const getBatteryIcon = (level: number) => {
    if (level > 75) return <Battery100Icon className="h-6 w-6 text-green-500" />
    if (level > 25) return <Battery50Icon className="h-6 w-6 text-yellow-500" />
    return <Battery0Icon className="h-6 w-6 text-red-500" />
  }

  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ 
                scale: isConnected ? [1, 1.2, 1] : 1,
                transition: { duration: 0.5, repeat: isConnected ? Infinity : 0 }
              }}
            >
              <WifiIcon className={`h-6 w-6 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
            </motion.div>
            <motion.span 
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isConnected ? 'Connected' : 'Disconnected'}
            </motion.span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ 
                scale: batteryLevel < 20 ? [1, 1.2, 1] : 1,
                transition: { duration: 0.5, repeat: batteryLevel < 20 ? Infinity : 0 }
              }}
            >
              {getBatteryIcon(batteryLevel)}
            </motion.div>
            <motion.span 
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(batteryLevel)}%
            </motion.span>
          </motion.div>
        </div>
        <motion.div 
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Last sync: {lastSync.toLocaleTimeString()}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SyncStatusBar 