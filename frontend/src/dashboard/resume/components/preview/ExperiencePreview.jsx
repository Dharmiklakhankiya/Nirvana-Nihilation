import React from 'react';
import DOMPurify from 'dompurify';

function ExperiencePreview({ resumeInfo }) {
  if (!resumeInfo?.Experience || resumeInfo.Experience.length === 0) {
    return null;
  }

  return (
    <div className='my-4'>
      <h2 className='text-center font-bold text-sm mb-1'
        style={{ color: resumeInfo?.themeColor }}
      >Experience</h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className='mt-3'>
        {resumeInfo.Experience.map((item, index) => (
          <div key={index} className='mb-2'>
            <div className='flex justify-between'>
              <h3 className='font-bold text-xs'>{item.title}</h3>
              <p className='text-xs'>{item.startDate} - {item.currentlyWorking ? 'Present' : item.endDate}</p>
            </div>
            <div className='flex justify-between text-xs'>
              <p>{item.companyName}</p>
              <p>{item.city}, {item.state}</p>
            </div>
            {item.workSummery && (
              <div
                className="text-xs mt-1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.workSummery)
                }}
              />
            )}
            
            {/* Bullet Points */}
            {item.bulletPoints && item.bulletPoints.length > 0 && (
              <ul className="list-disc text-xs pl-5 mt-1">
                {item.bulletPoints.map((bullet, i) => (
                  bullet.bullet_point && (
                    <li key={i} className="mb-0.5">{bullet.bullet_point}</li>
                  )
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperiencePreview;