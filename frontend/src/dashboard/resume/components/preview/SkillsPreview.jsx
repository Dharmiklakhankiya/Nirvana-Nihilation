import React from 'react'

function SkillsPreview({resumeInfo}) {
  if (!resumeInfo?.skills || resumeInfo.skills.length === 0) {
    return null;
  }
  
  // Filter out empty skills (those without names)
  const validSkills = resumeInfo.skills.filter(skill => skill.name && skill.name.trim() !== '');
  
  if (validSkills.length === 0) {
    return null;
  }
  
  return (
    <div className='my-4'>
      <h2 className='text-center font-bold text-sm mb-1'
        style={{
          color: resumeInfo?.themeColor || '#000000'
        }}
      >Skills</h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor || '#000000'
      }} />

      <div className='grid grid-cols-2 gap-3 my-3'>
        {validSkills.map((skill, index) => (
          <div key={`skill-preview-${index}`} className='flex items-center justify-between'>
            <h2 className='text-xs font-medium'>{skill.name}</h2>
            <div className='h-2 bg-gray-200 w-[120px] rounded-full overflow-hidden'>
              <div 
                className='h-2 transition-all duration-300'
                style={{
                  backgroundColor: resumeInfo?.themeColor || '#000000',
                  width: `${(skill?.rating || 0) * 20}%` // Convert 0-5 rating to percentage
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(SkillsPreview);