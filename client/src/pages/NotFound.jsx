import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome } from 'react-icons/fi'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <motion.div 
      className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-9xl font-bold text-primary-300"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 10, 
          delay: 0.2 
        }}
      >
        404
      </motion.div>
      
      <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-2 text-center">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        We couldn't find the page you're looking for. Let's get you back on track.
      </p>
      
      <Link to="/">
        <Button variant="primary" size="lg">
          <FiHome className="mr-2" />
          Back to Home
        </Button>
      </Link>
    </motion.div>
  )
}

export default NotFound