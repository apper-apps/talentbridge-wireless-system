import { jobData } from '@/services/mockData/jobs.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const jobService = {
  async getAll() {
    await delay(300)
    return [...jobData]
  },

  async getById(id) {
    await delay(200)
    const job = jobData.find(item => item.Id === id)
    if (!job) {
      throw new Error('Job not found')
    }
    return { ...job }
  },

  async create(jobData) {
    await delay(400)
    const newJob = {
      Id: Math.max(...jobData.map(j => j.Id), 0) + 1,
      ...jobData,
      postedDate: new Date().toISOString(),
      status: 'Active'
    }
    jobData.push(newJob)
    return { ...newJob }
  },

  async update(id, updateData) {
    await delay(300)
    const index = jobData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Job not found')
    }
    jobData[index] = { ...jobData[index], ...updateData }
    return { ...jobData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = jobData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Job not found')
    }
    jobData.splice(index, 1)
    return true
  }
}