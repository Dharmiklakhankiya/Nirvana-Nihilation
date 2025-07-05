import React, { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import HeaderPreview from './preview/HeaderPreview'
import AboutPreview from './preview/AboutPreview'
import EducationPreview from './preview/EducationPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import SkillsPreview from './preview/SkillsPreview'
import ThemeColor from './ThemeColor'
import { cn } from '@/lib/utils'

function ResumePreview({ isPreviewMode = false }) {
  const { resumeInfo } = useContext(ResumeInfoContext)

  const containerClasses = cn(
    'bg-white',
    isPreviewMode
      ? 'shadow-none rounded-none py-4 md:py-6 px-2 md:px-3'
      : 'shadow-2xl rounded-md sticky top-5 h-[1200px] overflow-auto py-6 px-3'
  )

  return (
    <div id="resume-preview-container" className={containerClasses}>
      {!isPreviewMode && (
        <div className='flex justify-end mb-4' id="no-print">
          <ThemeColor />
        </div>
      )}
      <div id="resume-preview" className='px-2 pb-6 md:px-3 md:pb-8 bg-white'>
        <div>
          <HeaderPreview resumeInfo={resumeInfo} />
          <AboutPreview resumeInfo={resumeInfo} />
          <ExperiencePreview resumeInfo={resumeInfo} />
          <EducationPreview resumeInfo={resumeInfo} />
          <SkillsPreview resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ResumePreview)