import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { LoaderCircle, Plus, Trash2 } from 'lucide-react'

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
    currentlyWorking: false,
    bulletPoints: []
}

function Experience() {
    const [experienceList, setExperienceList] = useState([ { ...formField } ])
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (resumeInfo?.Experience?.length > 0) {
            // Make sure each experience has a bulletPoints array
            const updatedExperience = resumeInfo.Experience.map(exp => ({
                ...exp,
                bulletPoints: exp.bulletPoints || []
            }))
            setExperienceList(updatedExperience)
        }
    }, [resumeInfo])

    const handleChange = (index, event) => {
        const newEntries = [...experienceList]
        const { name, value, type, checked } = event.target
        newEntries[index][name] = type === 'checkbox' ? checked : value
        setExperienceList(newEntries)
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }])
    }

    const RemoveExperience = () => {
        if (experienceList.length > 1) {
            setExperienceList(experienceList.slice(0, -1))
        }
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList]
        newEntries[index][name] = typeof e.target.value === 'string' ? e.target.value : ''
        setExperienceList(newEntries)
    }

    // Bullet point management
    const addBulletPoint = (expIndex) => {
        const newEntries = [...experienceList]
        if (!newEntries[expIndex].bulletPoints) {
            newEntries[expIndex].bulletPoints = []
        }
        newEntries[expIndex].bulletPoints.push({ bullet_point: '' })
        setExperienceList(newEntries)
    }

    const removeBulletPoint = (expIndex, bulletIndex) => {
        const newEntries = [...experienceList]
        newEntries[expIndex].bulletPoints.splice(bulletIndex, 1)
        setExperienceList(newEntries)
    }

    const handleBulletChange = (expIndex, bulletIndex, value) => {
        const newEntries = [...experienceList]
        newEntries[expIndex].bulletPoints[bulletIndex].bullet_point = value
        setExperienceList(newEntries)
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Experience: experienceList,
        })
    }, [experienceList])

    const onSave = () => {
        setLoading(true)

        const updatedResume = {
            ...resumeInfo,
            Experience: experienceList.map(({ id, ...rest }) => rest)
        }

        api.updateResume(params?.resumeId, updatedResume)
            .then(res => {
                setLoading(false)
                toast('Details updated!')
            })
            .catch(error => {
                setLoading(false)
                toast('Server Error, Try again!')
            })
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>

            <div>
                {experienceList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input
                                name="title"
                                onChange={(e) => handleChange(index, e)}
                                defaultValue={item?.title}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input
                                name="companyName"
                                onChange={(e) => handleChange(index, e)}
                                defaultValue={item?.companyName}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input
                                name="city"
                                onChange={(e) => handleChange(index, e)}
                                defaultValue={item?.city}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input
                                name="state"
                                onChange={(e) => handleChange(index, e)}
                                defaultValue={item?.state}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input
                                type="date"
                                name="startDate"
                                onChange={(e) => handleChange(index, e)}
                                defaultValue={item?.startDate}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between items-center'>
                                <label className='text-xs'>End Date</label>
                                <div className='flex items-center gap-1'>
                                    <label className='text-xs'>Currently Working</label>
                                    <input
                                        type="checkbox"
                                        name="currentlyWorking"
                                        checked={item?.currentlyWorking || false}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                            </div>
                            {!item?.currentlyWorking && (
                                <Input
                                    type="date"
                                    name="endDate"
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.endDate}
                                />
                            )}
                        </div>
                        <div className='col-span-2'>
                            <label className='text-xs'>Work Summary</label>
                            <RichTextEditor
                                index={index}
                                value={item?.workSummery || ''}
                                onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}
                            />
                        </div>
                        
                        {/* Bullet Points Section */}
                        <div className='col-span-2 mt-3'>
                            <div className='flex justify-between items-center mb-2'>
                                <label className='text-xs font-semibold'>Key Achievements & Responsibilities</label>
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => addBulletPoint(index)}
                                    className="text-xs flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add Bullet Point
                                </Button>
                            </div>
                            
                            {item?.bulletPoints && item.bulletPoints.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className='flex gap-2 items-center mb-2'>
                                    <div className='flex-shrink-0'>•</div>
                                    <Input 
                                        value={bullet.bullet_point || ''}
                                        onChange={(e) => handleBulletChange(index, bulletIndex, e.target.value)}
                                        placeholder="Describe an achievement or responsibility"
                                        className="flex-grow"
                                    />
                                    <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => removeBulletPoint(index, bulletIndex)}
                                        className="text-destructive"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewExperience} className="text-primary">
                        + Add Experience
                    </Button>
                    <Button variant="outline" onClick={RemoveExperience} className="text-primary">
                        - Remove
                    </Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Experience
