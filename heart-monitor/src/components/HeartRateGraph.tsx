import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

interface HeartRateData {
  time: string
  value: number
}

const HeartRateGraph = () => {
  const [data, setData] = useState<HeartRateData[]>([])

  useEffect(() => {
    // Real-time data simulation
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * (180 - 60) + 60) // Heart rate simulation between 60 and 180
      }
      
      setData(prevData => {
        const updatedData = [...prevData, newData]
        if (updatedData.length > 20) {
          return updatedData.slice(-20)
        }
        return updatedData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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
        Real-time Heart Rate
      </motion.h2>
      <motion.div 
        className="h-[300px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[40, 200]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2196F3"
              strokeWidth={2}
              dot={false}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}

export default HeartRateGraph 