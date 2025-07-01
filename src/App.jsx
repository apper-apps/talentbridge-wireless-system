import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import JobBoard from '@/components/pages/JobBoard'
import JobDetails from '@/components/pages/JobDetails'
import PostJob from '@/components/pages/PostJob'
import EmployerDashboard from '@/components/pages/EmployerDashboard'
import Applications from '@/components/pages/Applications'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<JobBoard />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/dashboard" element={<EmployerDashboard />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </Router>
  )
}

export default App