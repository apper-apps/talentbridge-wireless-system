import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Select from '@/components/atoms/Select'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { applicationService } from '@/services/api/applicationService'
import { jobService } from '@/services/api/jobService'

const Applications = () => {
  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [applicationsData, jobsData] = await Promise.all([
        applicationService.getAll(),
        jobService.getAll()
      ])
      setApplications(applicationsData)
      setJobs(jobsData)
    } catch (err) {
      setError('Failed to load applications. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationService.update(applicationId, { status: newStatus })
      setApplications(applications.map(app => 
        app.Id === applicationId ? { ...app, status: newStatus } : app
      ))
      toast.success('Application status updated successfully!')
    } catch (err) {
      toast.error('Failed to update application status.')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.Id.toString() === jobId)
    return job ? job.title : 'Unknown Job'
  }

  const getJobCompany = (jobId) => {
    const job = jobs.find(j => j.Id.toString() === jobId)
    return job ? job.company : 'Unknown Company'
  }

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status.toLowerCase() === filter.toLowerCase()
  })

  const statusOptions = [
    { value: 'all', label: 'All Applications' },
    { value: 'applied', label: 'Applied' },
    { value: 'reviewing', label: 'Reviewing' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'hired', label: 'Hired' }
  ]

  const applicationStatusOptions = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Reviewing', label: 'Reviewing' },
    { value: 'Interviewing', label: 'Interviewing' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Hired', label: 'Hired' }
  ]

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'applied': return 'info'
      case 'reviewing': return 'warning'
      case 'interviewing': return 'primary'
      case 'rejected': return 'error'
      case 'hired': return 'success'
      default: return 'default'
    }
  }

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
            Applications
          </h1>
          <p className="text-xl text-gray-600">
            Review and manage candidate applications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Candidate Applications
              </h2>
              <div className="w-64">
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  options={statusOptions}
                  placeholder="Filter by status"
                />
              </div>
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="p-8">
              <Empty
                message="No applications found"
                description={filter === 'all' ? "No applications have been submitted yet" : `No applications with status "${filter}"`}
              />
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application, index) => (
                <motion.div
                  key={application.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.candidateName}
                        </h3>
                        <Badge variant={getStatusVariant(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <ApperIcon name="Briefcase" className="w-4 h-4 mr-2" />
                          <span className="font-medium">{getJobTitle(application.jobId)}</span>
                          <span className="mx-2">•</span>
                          <span>{getJobCompany(application.jobId)}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <div className="flex items-center">
                            <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                            <span>{application.email}</span>
                          </div>
                          <div className="flex items-center">
                            <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                            <span>{application.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                          <span>Applied {formatDistanceToNow(new Date(application.appliedDate), { addSuffix: true })}</span>
                        </div>
                      </div>

                      {application.coverLetter && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-1">Cover Letter:</p>
                          <p className="text-gray-700 line-clamp-3 bg-gray-50 p-3 rounded-lg">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 ml-6">
                      <div className="w-48">
                        <Select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.Id, e.target.value)}
                          options={applicationStatusOptions}
                          placeholder="Update status"
                        />
                      </div>
                      
                      {application.resumeUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(application.resumeUrl, '_blank')}
                          icon="ExternalLink"
                        >
                          Resume
                        </Button>
                      )}
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

export default Applications