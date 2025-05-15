import { motion } from 'framer-motion'

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-gray-400 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {action}
    </motion.div>
  )
}

export default EmptyState