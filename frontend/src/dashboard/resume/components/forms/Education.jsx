import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api';  // Use local API implementation
import { toast } from 'sonner';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  
  // Initialize with a default education entry
  const [educationalList, setEducationalList] = useState([{
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);

  useEffect(() => {
    // Check if resumeInfo and education array exist before setting state
    if (resumeInfo?.education && resumeInfo.education.length > 0) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList, {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  }

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList => educationalList.slice(0, -1));
    }
  }

  const onSave = () => {
    setLoading(true);
    
    // Format data for MongoDB backend
    const updatedResume = {
      ...resumeInfo,
      education: educationalList.map(({ id, ...rest }) => rest)
    };

    api.updateResume(params.resumeId, updatedResume).then(resp => {
      console.log(resp);
      setLoading(false);
      toast('Details updated!');
    }, (error) => {
      setLoading(false);
      toast('Server Error, Please try again!');
    });
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    });
  }, [educationalList]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input 
                  name="universityName" 
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input 
                  name="degree" 
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree} 
                />
              </div>
              <div>
                <label>Major</label>
                <Input 
                  name="major" 
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major} 
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input 
                  type="date" 
                  name="startDate" 
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate} 
                />
              </div>
              <div>
                <label>End Date</label>
                <Input 
                  type="date" 
                  name="endDate" 
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate} 
                />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea 
                  name="description" 
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}    
        </Button>
      </div>
    </div>
  );
}

export default Education;