import { useState } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import JobList from '@/components/organisms/JobList'

const JobBoard = () => {
  const [filters, setFilters] = useState({
    categories: [],
    experienceLevels: [],
    locations: [],
    salaryRange: { min: 0, max: 0 }
  })
  const [searchParams, setSearchParams] = useState({ query: '', location: '' })

  const handleSearch = (params) => {
    setSearchParams(params)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      experienceLevels: [],
      locations: [],
      salaryRange: { min: 0, max: 0 }
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Connect with top employers and discover opportunities that match your skills and aspirations
            </p>
          </motion.div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <JobList
              filters={filters}
              searchQuery={searchParams.query}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobBoard