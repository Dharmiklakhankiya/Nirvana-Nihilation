import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { Loader2, Plus, FileText, Eye, Edit, Trash } from 'lucide-react'
import { toast } from 'sonner'

export function DashBoard() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isSignedIn, user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/auth/sign-in')
      return
    }
    fetchResumes()
  }, [isSignedIn, navigate])

  const fetchResumes = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.getResumes()
      if (response?.data) {
        setResumes(response.data)
      } else {
        throw new Error("Unexpected API response format")
      }
    } catch (err) {
      setError(err.message || "Failed to load your resumes. Please try again.")
      toast.error("Failed to load resumes")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteResume = async (id, event) => {
    event.stopPropagation()
    if (confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.deleteResume(id)
        setResumes(resumes.filter(resume => resume._id !== id))
        toast.success("Resume deleted successfully")
      } catch (err) {
        toast.error("Failed to delete resume")
      }
    }
  }

  const createNewResume = () => {
    navigate('/dashboard/resume/new/edit')
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <Button onClick={createNewResume} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" /> Create New Resume
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading your resumes...</span>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-red-700">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={fetchResumes}
          >
            Try Again
          </Button>
        </div>
      )}
      {!loading && !error && resumes.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-medium mb-2">No Resumes Found</h2>
          <p className="mb-8 text-gray-500">Get started by creating your first resume</p>
          <Button onClick={createNewResume}>
            <Plus className="w-4 h-4 mr-2" /> Create Resume
          </Button>
        </div>
      )}
      {!loading && resumes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map(resume => (
            <div key={resume._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">{resume.title || "Untitled Resume"}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/dashboard/resume/${resume._id}/edit`}>
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/my-resume/${resume._id}/view`}>
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => handleDeleteResume(resume._id, e)}
                  >
                    <Trash className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashBoard