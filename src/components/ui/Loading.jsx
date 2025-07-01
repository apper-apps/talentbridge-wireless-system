import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mb-4"
      />
      <div className="space-y-4 w-full max-w-4xl">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="skeleton h-6 w-3/4 rounded-lg"></div>
                <div className="skeleton h-4 w-1/2 rounded-lg"></div>
                <div className="skeleton h-4 w-2/3 rounded-lg"></div>
              </div>
              <div className="skeleton h-8 w-20 rounded-lg"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="skeleton h-4 w-24 rounded-lg"></div>
              <div className="skeleton h-4 w-16 rounded-lg"></div>
              <div className="skeleton h-4 w-32 rounded-lg"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading