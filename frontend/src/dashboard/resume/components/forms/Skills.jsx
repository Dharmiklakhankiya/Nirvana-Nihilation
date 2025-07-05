import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { api } from '@/lib/api'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
  const [skillsList, setSkillsList] = useState([{ name: '', rating: 0 }])
  const { resumeId } = useParams()
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const initialLoadDone = useRef(false)

  // Only load initial skills data from resumeInfo once
  useEffect(() => {
    if (!initialLoadDone.current && resumeInfo?.skills && resumeInfo.skills.length > 0) {
      setSkillsList(resumeInfo.skills)
      initialLoadDone.current = true
    }
  }, [resumeInfo])

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList]
    newEntries[index][name] = value
    setSkillsList(newEntries)
  }

  const AddNewSkills = () => {
    setSkillsList(prevList => [...prevList, { name: '', rating: 0 }])
  }

  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList(prevList => prevList.slice(0, -1))
    }
  }

  const onSave = () => {
    setLoading(true)

    // Update context first to ensure UI consistency
    const updatedSkills = skillsList.map(({ id, ...rest }) => rest)
    
    setResumeInfo(prev => ({
      ...prev,
      skills: updatedSkills,
    }))

    const updatedResume = {
      ...resumeInfo,
      skills: updatedSkills,
    }

    api.updateResume(resumeId, updatedResume).then(
      (resp) => {
        console.log(resp)
        setLoading(false)
        toast('Details updated!')
      },
      (error) => {
        setLoading(false)
        toast('Server Error, Try again!')
      }
    )
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={`skill-${index}`} className='flex justify-between mb-2 border rounded-lg p-3'>
            <div>
              <label className='text-xs'>Name</label>
              <Input
                className="w-full"
                value={item.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating || 0}
              onChange={(v) => handleChange(index, 'rating', v)}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="text-primary">
            + Add More Skill
          </Button>
          <Button variant="outline" onClick={RemoveSkills} className="text-primary">
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  )
}

export default Skills