import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApplicationModal from '@/components/molecules/ApplicationModal'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { jobService } from '@/services/api/jobService'

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  const loadJob = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await jobService.getById(parseInt(id))
      setJob(data)
    } catch (err) {
      setError('Failed to load job details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJob()
  }, [id])

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified'
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadJob} />
  if (!job) return <Error message="Job not found" />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center text-blue-100">
                    <ApperIcon name="Building" className="w-5 h-5 mr-2" />
                    <span className="text-lg font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <ApperIcon name="Clock" className="w-5 h-5 mr-2" />
                    <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success" className="bg-white/20 text-white border-white/30">
                    {job.category}
                  </Badge>
                  <Badge variant="info" className="bg-white/20 text-white border-white/30">
                    {job.experienceLevel}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-300 mb-2">
                  {formatSalary(job.salary)}
                </div>
                <Button
                  variant="ghost"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  onClick={() => setShowApplicationModal(true)}
                  icon="Send"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Job Description */}
            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="FileText" className="w-6 h-6 mr-3 text-primary" />
                Job Description
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="CheckCircle" className="w-6 h-6 mr-3 text-primary" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <ApperIcon name="Check" className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </section>

            {/* Job Details */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
                <ApperIcon name="Info" className="w-6 h-6 mr-3 text-primary" />
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="DollarSign" className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-sm text-gray-500">Salary Range</p>
                      <p className="font-semibold text-gray-900">{formatSalary(job.salary)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Briefcase" className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold text-gray-900">{job.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="TrendingUp" className="w-5 h-5 text-warning" />
                    <div>
                      <p className="text-sm text-gray-500">Experience Level</p>
                      <p className="font-semibold text-gray-900">{job.experienceLevel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Apply Section */}
            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                Ready to Apply?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Take the next step in your career. Submit your application and we'll connect you with the hiring team.
              </p>
              <Button
                size="lg"
                onClick={() => setShowApplicationModal(true)}
                icon="Send"
                className="text-lg px-8 py-4"
              >
                Apply for This Position
              </Button>
            </section>
          </div>
        </motion.div>
      </div>

      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        job={job}
      />
    </div>
  )
}

export default JobDetails