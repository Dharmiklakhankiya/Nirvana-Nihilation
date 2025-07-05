const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

function getAuthToken() {
  if (process.env.NODE_ENV !== 'production') {
    return 'development-token'
  }
  return localStorage.getItem('authToken') || ''
}

async function fetchWithAuth(endpoint, options = {}) {
  try {
    const token = getAuthToken()
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'X-User-ID': localStorage.getItem('userId') || 'test-user-123',
      'Content-Type': options.headers?.["Content-Type"] || "application/json",
    }
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    })
    if (!response.ok) {
      let errorMessage = `API error: ${response.statusText}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch (e) {}
      throw new Error(errorMessage)
    }
    if (response.status === 204) {
      return { success: true }
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export const api = {
  async getResumes() {
    return fetchWithAuth('/resumes')
  },
  async getResumeById(id) {
    if (!id) {
      throw new Error("Resume ID is required")
    }
    return fetchWithAuth(`/resumes/${id}`)
  },
  async createResume(resumeData) {
    return fetchWithAuth('/resumes', {
      method: "POST",
      body: JSON.stringify(resumeData)
    })
  },
  async updateResume(id, resumeData) {
    const dataToSend = resumeData.data ? resumeData : { data: resumeData }
    return fetchWithAuth(`/resumes/${id}`, {
      method: "PUT",
      body: JSON.stringify(dataToSend)
    })
  },
  async deleteResume(id) {
    return fetchWithAuth(`/resumes/${id}`, {
      method: "DELETE"
    })
  },
}

export default {
  GetResumeById: api.getResumeById,
  GetResumes: api.getResumes,
  CreateResume: api.createResume,
  UpdateResume: api.updateResume,
  DeleteResume: api.deleteResume
}
