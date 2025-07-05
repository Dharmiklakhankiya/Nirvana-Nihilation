import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from '@/service/AIModal'
import { toast } from 'sonner'

const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume. Format as HTML with <ul> and <li> tags, not as JSON. Each bullet point should highlight different skills or achievements relevant to this position.'

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '')
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.Experience[index]?.title) {
      toast('Please Add Position Title')
      return
    }

    setLoading(true)
    try {
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title)
      const result = await AIChatSession.sendMessage(prompt)
      const responseText = result.response.text()
      let processedResponse = responseText

      try {
        const jsonData = JSON.parse(responseText)
        if (jsonData && Array.isArray(jsonData.bullet_points)) {
          processedResponse = '<ul>' +
            jsonData.bullet_points.map(item => `<li>${item}</li>`).join('') +
            '</ul>'
        } else if (Array.isArray(jsonData) && jsonData.every(item => item && typeof item.point === 'string')) {
          processedResponse = '<ul>' +
            jsonData.map(item => `<li>${item.point}</li>`).join('') +
            '</ul>'
        } else {
          processedResponse = responseText
        }
      } catch (jsonError) {
        if (responseText.includes('"point"')) {
          processedResponse = responseText
            .replace(/\{"point":/g, '<li>')
            .replace(/\},\s*\{/g, '</li>')
            .replace(/\}/g, '</li>')
            .replace(/"/g, '')
            .replace(/\[/g, '<ul>')
            .replace(/\]/g, '</ul>')
        } else {
          processedResponse = responseText
        }
      }

      setValue(processedResponse)
      onRichTextEditorChange({ target: { value: processedResponse } })
      toast.success('Experience points generated')
    } catch (error) {
      toast.error("Failed to generate experience points. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button variant="outline" size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary">
          {loading ?
            <LoaderCircle className='animate-spin' /> :
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          }
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          const newValue = e.target.value
          setValue(newValue)
          onRichTextEditorChange(e)
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor