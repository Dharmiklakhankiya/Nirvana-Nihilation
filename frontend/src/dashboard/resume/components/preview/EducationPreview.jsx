import React from 'react'

function EducationPreview({resumeInfo}) {
  if (!resumeInfo?.education || resumeInfo.education.length === 0) {
    return null;
  }
  
  return (
    <div className='my-4'>
      <h2 className='text-center font-bold text-sm mb-1'
      style={{color:resumeInfo?.themeColor}}
      >Education</h2>
      <hr style={{
          borderColor:resumeInfo?.themeColor
      }} />

      <div className='mt-3'>
        {resumeInfo?.education.map((item,index)=>(
          <div key={index} className='mb-2'>
            <div className='flex justify-between'>
              <h3 className='font-bold text-xs'>{item.degree} - {item.major}</h3>
              <p className='text-xs'>{item.startDate} - {item.endDate}</p>
            </div>
            <h3 className='text-xs'>{item.universityName}</h3>
            <p className='text-xs'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(EducationPreview);
