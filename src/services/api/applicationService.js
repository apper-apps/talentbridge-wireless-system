import { applicationData } from '@/services/mockData/applications.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const applicationService = {
  async getAll() {
    await delay(300)
    return [...applicationData]
  },

  async getById(id) {
    await delay(200)
    const application = applicationData.find(item => item.Id === id)
    if (!application) {
      throw new Error('Application not found')
    }
    return { ...application }
  },

  async create(appData) {
    await delay(400)
    const newApplication = {
      Id: Math.max(...applicationData.map(a => a.Id), 0) + 1,
      ...appData,
      appliedDate: new Date().toISOString(),
      status: 'Applied'
    }
    applicationData.push(newApplication)
    return { ...newApplication }
  },

  async update(id, updateData) {
    await delay(300)
    const index = applicationData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Application not found')
    }
    applicationData[index] = { ...applicationData[index], ...updateData }
    return { ...applicationData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = applicationData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Application not found')
    }
    applicationData.splice(index, 1)
    return true
  }
}