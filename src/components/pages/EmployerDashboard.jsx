import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { jobService } from '@/services/api/jobService'
import { applicationService } from '@/services/api/applicationService'

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [jobsData, applicationsData] = await Promise.all([
        jobService.getAll(),
        applicationService.getAll()
      ])
      setJobs(jobsData)
      setApplications(applicationsData)
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteJob = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return

    try {
      await jobService.delete(jobId)
      setJobs(jobs.filter(job => job.Id !== jobId))
      toast.success('Job deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete job. Please try again.')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getJobApplicationCount = (jobId) => {
    return applications.filter(app => app.jobId === jobId.toString()).length
  }

  const stats = [
    {
      title: 'Active Jobs',
      value: jobs.filter(job => job.status === 'Active').length,
      icon: 'Briefcase',
      color: 'primary'
    },
    {
      title: 'Total Applications',
      value: applications.length,
      icon: 'FileText',
      color: 'secondary'
    },
    {
      title: 'Pending Reviews',
      value: applications.filter(app => app.status === 'Applied').length,
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Hired Candidates',
      value: applications.filter(app => app.status === 'Hired').length,
      icon: 'UserCheck',
      color: 'success'
    }
  ]

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Employer Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your job postings and track applications
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 card-elevation hover:card-elevation-hover transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color} to-${stat.color}-600 rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Your Job Postings
            </h2>
            <Button
              onClick={() => window.location.href = '/post-job'}
              icon="Plus"
            >
              Post New Job
            </Button>
          </div>

          {jobs.length === 0 ? (
            <Empty
              message="No job postings yet"
              description="Start by posting your first job to attract candidates"
              action={
                <Button
                  onClick={() => window.location.href = '/post-job'}
                  icon="Plus"
                >
                  Post Your First Job
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-6 hover:border-primary/30 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <Badge variant={job.status === 'Active' ? 'success' : 'warning'}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <ApperIcon name="Tag" className="w-4 h-4 mr-1" />
                          <span>{job.category}</span>
                        </div>
                        <div className="flex items-center">
                          <ApperIcon name="Users" className="w-4 h-4 mr-1" />
                          <span>{getJobApplicationCount(job.Id)} applications</span>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/job/${job.Id}`}
                        icon="Eye"
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteJob(job.Id)}
                        icon="Trash2"
                        className="text-error hover:text-error hover:bg-error/10"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default EmployerDashboard