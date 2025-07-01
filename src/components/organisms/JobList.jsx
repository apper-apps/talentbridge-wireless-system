import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JobCard from '@/components/molecules/JobCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { jobService } from '@/services/api/jobService'

const JobList = ({ filters = {}, searchQuery = '' }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await jobService.getAll()
      
      // Apply filters
      let filteredJobs = data
      
      // Text search
      if (searchQuery) {
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      // Category filter
      if (filters.categories?.length > 0) {
        filteredJobs = filteredJobs.filter(job =>
          filters.categories.includes(job.category)
        )
      }
      
      // Experience level filter
      if (filters.experienceLevels?.length > 0) {
        filteredJobs = filteredJobs.filter(job =>
          filters.experienceLevels.includes(job.experienceLevel)
        )
      }
      
      // Location filter
      if (filters.locations?.length > 0) {
        filteredJobs = filteredJobs.filter(job =>
          filters.locations.includes(job.location)
        )
      }
      
      // Salary range filter
      if (filters.salaryRange?.min || filters.salaryRange?.max) {
        filteredJobs = filteredJobs.filter(job => {
          const jobMin = job.salary?.min || 0
          const jobMax = job.salary?.max || 0
          const filterMin = filters.salaryRange?.min || 0
          const filterMax = filters.salaryRange?.max || 1000000
          
          return jobMax >= filterMin && jobMin <= filterMax
        })
      }
      
      setJobs(filteredJobs)
    } catch (err) {
      setError('Failed to load jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [filters, searchQuery])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadJobs} />
  if (jobs.length === 0) return <Empty message="No jobs found" description="Try adjusting your search or filters" />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid gap-6">
        {jobs.map((job, index) => (
          <motion.div
            key={job.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default JobList