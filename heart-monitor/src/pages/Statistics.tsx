import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface WorkoutSession {
  date: string
  duration: number
  avgHeartRate: number
  caloriesBurned: number
}

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('week')

  const mockData = {
    week: {
      average: 72,
      min: 65,
      max: 85,
      zones: {
        rest: 45,
        light: 30,
        moderate: 15,
        intense: 10
      }
    },
    month: {
      average: 70,
      min: 62,
      max: 88,
      zones: {
        rest: 50,
        light: 25,
        moderate: 15,
        intense: 10
      }
    },
    year: {
      average: 68,
      min: 60,
      max: 90,
      zones: {
        rest: 55,
        light: 20,
        moderate: 15,
        intense: 10
      }
    }
  }

  const currentData = mockData[timeRange as keyof typeof mockData]

  // Données simulées pour les calories
  const calorieData = [
    { date: 'Lun', calories: 320 },
    { date: 'Mar', calories: 450 },
    { date: 'Mer', calories: 280 },
    { date: 'Jeu', calories: 520 },
    { date: 'Ven', calories: 380 },
    { date: 'Sam', calories: 600 },
    { date: 'Dim', calories: 290 },
  ]

  // Données simulées pour l'historique des entraînements
  const [workoutHistory] = useState<WorkoutSession[]>([
    {
      date: '2024-05-22',
      duration: 45,
      avgHeartRate: 142,
      caloriesBurned: 320,
    },
    {
      date: '2024-05-20',
      duration: 60,
      avgHeartRate: 155,
      caloriesBurned: 450,
    },
    {
      date: '2024-05-18',
      duration: 30,
      avgHeartRate: 138,
      caloriesBurned: 280,
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Heart Rate Statistics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'week'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'month'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'year'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Average Heart Rate</h3>
          <p className="text-3xl font-bold text-blue-500">{currentData.average} BPM</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Minimum Heart Rate</h3>
          <p className="text-3xl font-bold text-green-500">{currentData.min} BPM</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Maximum Heart Rate</h3>
          <p className="text-3xl font-bold text-red-500">{currentData.max} BPM</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Time in Heart Rate Zones</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Rest Zone</span>
              <span className="text-sm font-medium text-gray-700">{currentData.zones.rest}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-200 h-2 rounded-full"
                style={{ width: `${currentData.zones.rest}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Light Zone</span>
              <span className="text-sm font-medium text-gray-700">{currentData.zones.light}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-200 h-2 rounded-full"
                style={{ width: `${currentData.zones.light}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Moderate Zone</span>
              <span className="text-sm font-medium text-gray-700">{currentData.zones.moderate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-200 h-2 rounded-full"
                style={{ width: `${currentData.zones.moderate}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Intense Zone</span>
              <span className="text-sm font-medium text-gray-700">{currentData.zones.intense}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-200 h-2 rounded-full"
                style={{ width: `${currentData.zones.intense}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Calories Burned (Week)</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="calories"
                stroke="#2196F3"
                fill="#2196F3"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Workout History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration (min)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Heart Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calories Burned
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workoutHistory.map((workout, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(workout.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.avgHeartRate} BPM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.caloriesBurned} kcal
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Statistics 