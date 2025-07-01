import { motion } from 'framer-motion'
import JobPostingForm from '@/components/organisms/JobPostingForm'

const PostJob = () => {
  const handleSuccess = () => {
    // Could navigate to dashboard or show success message
    console.log('Job posted successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Post a Job Opening
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reach thousands of qualified candidates and find your next great hire
          </p>
        </motion.div>

        <JobPostingForm onSuccess={handleSuccess} />
      </div>
    </div>
  )
}

export default PostJob