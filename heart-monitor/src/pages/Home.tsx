import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <img src="/img/KakaoTalk_20250522_103344906.png" alt="Logo" className="h-32 w-32 mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Heart Monitor</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">The Challenge</h2>
          <p className="text-gray-700 mb-4">
            Heart disease remains a critical health concern, with 28,043 deaths in Korea alone (11% of total deaths). 
            Current heart rate monitoring solutions are often too expensive or complex for everyday use. 
            There's a clear need for an affordable, user-friendly device that provides real-time feedback and guidance.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Solution</h2>
          <p className="text-gray-700 mb-4">
            Heart Monitor is an intelligent wearable device that combines advanced technology with user-friendly design:
          </p>
          <ul className="text-gray-700 text-left space-y-2">
            <li>• Real-time heart rate monitoring with haptic feedback</li>
            <li>• Machine learning-powered calorie tracking and exercise mode detection</li>
            <li>• Personalized workout recommendations based on your heart rate zones</li>
            <li>• Smart nutrition guidance aligned with your fitness goals</li>
            <li>• Comprehensive health tracking through our mobile app and website</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Smart Monitoring</h3>
              <p className="text-gray-700">
                Our device automatically switches between exercise and rest modes, providing real-time feedback to help you maintain optimal heart rate zones for maximum fat burning.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Personalized Guidance</h3>
              <p className="text-gray-700">
                Get customized workout and nutrition recommendations based on your heart rate data, weight, and fitness goals.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Basic</h3>
              <p className="text-2xl font-bold mb-2">Free</p>
              <ul className="text-gray-700 text-left space-y-2">
                <li>• Real-time heart rate monitoring</li>
                <li>• Basic statistics</li>
                <li>• Exercise mode detection</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Premium</h3>
              <p className="text-2xl font-bold mb-2">$4.99/month</p>
              <ul className="text-gray-700 text-left space-y-2">
                <li>• All Basic features</li>
                <li>• Personalized workout plans</li>
                <li>• Nutrition recommendations</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link to="/auth" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
          <Link to="/auth" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 