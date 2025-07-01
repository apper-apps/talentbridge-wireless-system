import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import TextArea from '@/components/atoms/TextArea'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import { jobService } from '@/services/api/jobService'

const JobPostingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    salaryMin: '',
    salaryMax: '',
    location: '',
    category: '',
    experienceLevel: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categoryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Design', label: 'Design' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Human Resources', label: 'Human Resources' }
  ]

  const experienceOptions = [
    { value: 'Entry Level', label: 'Entry Level' },
    { value: 'Mid Level', label: 'Mid Level' },
    { value: 'Senior Level', label: 'Senior Level' },
    { value: 'Executive', label: 'Executive' }
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const jobData = {
        ...formData,
        salary: {
          min: parseInt(formData.salaryMin) || 0,
          max: parseInt(formData.salaryMax) || 0
        },
        requirements: formData.requirements.split('\n').filter(req => req.trim()),
        postedDate: new Date().toISOString(),
        status: 'Active'
      }

      await jobService.create(jobData)
      toast.success('Job posted successfully!')
      onSuccess?.()
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        description: '',
        requirements: '',
        salaryMin: '',
        salaryMax: '',
        location: '',
        category: '',
        experienceLevel: ''
      })
    } catch (error) {
      toast.error('Failed to post job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Post a New Job
        </h2>
        <p className="text-gray-600">
          Fill out the details below to post your job opening
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Job Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            required
          />
          <Input
            label="Company Name"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="e.g. TechCorp Inc."
            required
          />
        </div>

        <TextArea
          label="Job Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the role, responsibilities, and what you're looking for..."
          rows={6}
          required
        />

        <TextArea
          label="Requirements"
          value={formData.requirements}
          onChange={(e) => handleChange('requirements', e.target.value)}
          placeholder="List each requirement on a new line..."
          rows={4}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Min salary"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => handleChange('salaryMin', e.target.value)}
                required
              />
              <Input
                placeholder="Max salary"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => handleChange('salaryMax', e.target.value)}
                required
              />
            </div>
          </div>
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g. New York, NY or Remote"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            options={categoryOptions}
            placeholder="Select a category"
            required
          />
          <Select
            label="Experience Level"
            value={formData.experienceLevel}
            onChange={(e) => handleChange('experienceLevel', e.target.value)}
            options={experienceOptions}
            placeholder="Select experience level"
            required
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="ghost"
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            icon={isSubmitting ? "Loader2" : "Send"}
            className={isSubmitting ? "animate-spin" : ""}
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default JobPostingForm