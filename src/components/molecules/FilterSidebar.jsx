import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  className = '' 
}) => {
  const filterSections = [
    {
      title: 'Job Categories',
      key: 'categories',
      options: [
        'Technology',
        'Marketing',
        'Sales',
        'Design',
        'Finance',
        'Operations',
        'Customer Service',
        'Human Resources'
      ]
    },
    {
      title: 'Experience Level',
      key: 'experienceLevels',
      options: [
        'Entry Level',
        'Mid Level',
        'Senior Level',
        'Executive'
      ]
    },
    {
      title: 'Locations',
      key: 'locations',
      options: [
        'New York, NY',
        'San Francisco, CA',
        'Los Angeles, CA',
        'Chicago, IL',
        'Austin, TX',
        'Seattle, WA',
        'Boston, MA',
        'Remote'
      ]
    }
  ]

  const handleCheckboxChange = (section, option) => {
    const currentValues = filters[section] || []
    const newValues = currentValues.includes(option)
      ? currentValues.filter(item => item !== option)
      : [...currentValues, option]
    
    onFilterChange({ ...filters, [section]: newValues })
  }

  const handleSalaryChange = (field, value) => {
    onFilterChange({
      ...filters,
      salaryRange: {
        ...filters.salaryRange,
        [field]: parseInt(value) || 0
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-white rounded-xl shadow-lg p-6 space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-bold text-gray-900">
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          icon="X"
        >
          Clear All
        </Button>
      </div>

      {/* Salary Range */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 flex items-center">
          <ApperIcon name="DollarSign" className="w-4 h-4 mr-2" />
          Salary Range
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min</label>
            <input
              type="number"
              placeholder="0"
              value={filters.salaryRange?.min || ''}
              onChange={(e) => handleSalaryChange('min', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max</label>
            <input
              type="number"
              placeholder="200000"
              value={filters.salaryRange?.max || ''}
              onChange={(e) => handleSalaryChange('max', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Filter Sections */}
      {filterSections.map((section, index) => (
        <motion.div
          key={section.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-3"
        >
          <h4 className="font-semibold text-gray-800 flex items-center">
            <ApperIcon 
              name={section.key === 'categories' ? 'Briefcase' : section.key === 'experienceLevels' ? 'TrendingUp' : 'MapPin'} 
              className="w-4 h-4 mr-2" 
            />
            {section.title}
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {section.options.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={filters[section.key]?.includes(option) || false}
                  onChange={() => handleCheckboxChange(section.key, option)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FilterSidebar