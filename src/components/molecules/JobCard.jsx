import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const JobCard = ({ job, className = '' }) => {
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified'
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden ${className}`}
    >
      <Link to={`/job/${job.Id}`} className="block p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2 line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <ApperIcon name="Building" className="w-4 h-4 mr-2" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center text-gray-500 mb-3">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>
          </div>
          <Badge variant="primary" className="ml-4">
            {job.category}
          </Badge>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-success">
              <ApperIcon name="DollarSign" className="w-4 h-4 mr-1" />
              <span className="font-semibold">{formatSalary(job.salary)}</span>
            </div>
            <Badge variant="secondary" size="sm">
              {job.experienceLevel}
            </Badge>
          </div>
          
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center text-primary font-medium">
              <span className="mr-2">View Details</span>
              <ApperIcon name="ArrowRight" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default JobCard