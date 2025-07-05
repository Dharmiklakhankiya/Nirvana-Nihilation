import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from '@/service/AIModal'

const AI_PROMPT = "Job Title: {jobTitle}, Depends on job title give me list of summaries for Senior Level, Mid Level, and Entry Level in 3-4 lines each. Format as JSON array with 'summary' and 'experience_level' fields."

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summery, setSummery] = useState(resumeInfo?.summery || '')
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([])

  useEffect(() => {
    if (resumeInfo?.summery) {
      setSummery(resumeInfo.summery)
    }
  }, [resumeInfo?.summery])

  useEffect(() => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      summery: summery,
    }))
  }, [summery, setResumeInfo])

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please add a job title first")
      return
    }

    setLoading(true)
    try {
      const PROMPT = AI_PROMPT.replace('{jobTitle}', resumeInfo.jobTitle)
      const result = await AIChatSession.sendMessage(PROMPT)
      const responseText = result.response.text()

      let parsedData
      try {
        parsedData = JSON.parse(responseText)
      } catch (e) {
        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          try {
            parsedData = JSON.parse(jsonMatch[0])
          } catch (e2) {
            throw new Error("Could not parse AI response")
          }
        } else {
          throw new Error("Invalid response format")
        }
      }

      if (Array.isArray(parsedData)) {
        setAiGenerateSummeryList(parsedData)
      } else if (typeof parsedData === 'object' && parsedData !== null) {
        setAiGenerateSummeryList(
          Object.entries(parsedData).map(([key, value]) => {
            if (typeof value === 'object' && value.summary) {
              return value
            }
            return {
              experience_level: key,
              summary: value,
            }
          })
        )
      } else {
        throw new Error("Unexpected response format")
      }
    } catch (error) {
      console.error("AI error:", error)
      toast("Failed to generate summaries. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    const updatedResume = {
      ...resumeInfo,
      summery: summery,
    }

    api.updateResume(params?.resumeId, updatedResume).then(
      (resp) => {
        enabledNext(true)
        setLoading(false)
        toast("Details updated")
      },
      (error) => {
        setLoading(false)
        toast('Server Error, Try again!')
      }
    )
  }
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add a professional summary for your resume</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className='h-4 w-4' /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            placeholder="Enter a professional summary that highlights your skills and experience"
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50'
            >
              <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summery