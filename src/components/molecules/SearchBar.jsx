import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search jobs...", className = '' }) => {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ query, location })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-xl p-6 border border-gray-100 ${className}`}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-lg"
          />
        </div>
        
        <div className="flex-1 relative">
          <ApperIcon name="MapPin" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-lg"
          />
        </div>
        
        <Button
          type="submit"
          size="xl"
          className="lg:px-8"
          icon="Search"
        >
          Search Jobs
        </Button>
      </div>
    </motion.form>
  )
}

export default SearchBar