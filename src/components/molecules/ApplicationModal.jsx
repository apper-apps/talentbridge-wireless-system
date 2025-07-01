import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import TextArea from '@/components/atoms/TextArea'
import { applicationService } from '@/services/api/applicationService'

const ApplicationModal = ({ isOpen, onClose, job }) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverLetter: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const applicationData = {
        jobId: job.Id,
        ...formData,
        status: 'Applied',
        appliedDate: new Date().toISOString()
      }

      await applicationService.create(applicationData)
      toast.success('Application submitted successfully!')
      onClose()
      setFormData({
        candidateName: '',
        email: '',
        phone: '',
        resumeUrl: '',
        coverLetter: ''
      })
    } catch (error) {
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Apply for Position
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {job?.title} at {job?.company}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  icon="X"
                  className="text-gray-400 hover:text-gray-600"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.candidateName}
                  onChange={(e) => handleChange('candidateName', e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
                <Input
                  label="Resume URL"
                  type="url"
                  value={formData.resumeUrl}
                  onChange={(e) => handleChange('resumeUrl', e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>

              <TextArea
                label="Cover Letter"
                value={formData.coverLetter}
                onChange={(e) => handleChange('coverLetter', e.target.value)}
                rows={6}
                placeholder="Tell us why you're interested in this position..."
                required
              />

              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  icon={isSubmitting ? "Loader2" : "Send"}
                  className={isSubmitting ? "animate-spin" : ""}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ApplicationModal