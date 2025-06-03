import { Link, useNavigate } from 'react-router-dom'
import { HomeIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { authService } from '../config/auth'

interface NavbarProps {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const Navbar = ({ isAuthenticated, setIsAuthenticated }: NavbarProps) => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    authService.signOut()
    setIsAuthenticated(false)
    navigate('/')
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.nav 
      className="bg-white shadow-lg"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="/img/KakaoTalk_20250522_103344906.png" 
              alt="Logo" 
              className="h-24 w-24 mr-4 object-contain" 
            />
          </motion.div>
          
          <div className="flex space-x-4">
            <motion.div variants={itemVariants}>
              <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                <HomeIcon className="h-6 w-6 mr-1" />
                Home
              </Link>
            </motion.div>
            
            {isAuthenticated && (
              <>
                <motion.div variants={itemVariants}>
                  <Link to="/dashboard" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                    <HomeIcon className="h-6 w-6 mr-1" />
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/stats" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                    <ChartBarIcon className="h-6 w-6 mr-1" />
                    Statistics
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/recommendations" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                    <ChartBarIcon className="h-6 w-6 mr-1" />
                    Sports & Recommendations
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/profile" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                    <UserIcon className="h-6 w-6 mr-1" />
                    Profile
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <motion.button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Out
                  </motion.button>
                </motion.div>
              </>
            )}
            {!isAuthenticated && (
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/auth" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                    Login
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar 