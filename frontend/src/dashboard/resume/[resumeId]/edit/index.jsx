import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { debounce } from 'lodash';

function EditResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();
    
    useEffect(() => {
        // Redirect to sign-in if not authenticated
        if (!isSignedIn) {
            navigate('/auth/sign-in');
            return;
        }
        
        // If resumeId is 'new', we're creating a new resume
        if (resumeId === 'new') {
            createNewResume();
        } else {
            getResumeInfo();
        }
    }, [resumeId, isSignedIn, navigate]);

    // Create a new empty resume
    const createNewResume = async () => {
        try {
            setLoading(true);
            const defaultResume = {
                title: `New Resume - ${new Date().toLocaleDateString()}`,
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.primaryEmailAddress?.emailAddress || '',
                phone: '',
                address: '',
                jobTitle: '',
                summery: '',
                Experience: [],
                education: [],
                skills: [],
                themeColor: '#6A0DAD' // Default purple theme
            };
            
            setResumeInfo(defaultResume);
            
            // Auto-save the new resume to get an ID
            const result = await api.createResume(defaultResume);
            if (result?.data) {
                const createdResume = result.data;
                
                // Update URL to include the new resume ID
                navigate(`/dashboard/resume/${createdResume._id}/edit`, { replace: true });
                
                // Update state with the saved resume that now has an ID
                setResumeInfo(createdResume);
                toast.success("New resume created successfully!");
            }
        } catch (err) {
            console.error("Error creating new resume:", err);
            setError("Failed to create a new resume. Please try again.");
            toast.error("Failed to create new resume");
        } finally {
            setLoading(false);
        }
    };

    // Get existing resume info
    const getResumeInfo = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await api.getResumeById(resumeId);
            if (response?.data) {
                setResumeInfo(response.data);
                console.log("Loaded resume data:", response.data);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error("Error fetching resume:", err);
            setError("Failed to load resume. It may have been deleted or you don't have permission to view it.");
            toast.error("Failed to load resume");
        } finally {
            setLoading(false);
        }
    };
    
    // Save resume changes with debounce to prevent excessive API calls
    const saveResume = async (updatedData) => {
        try {
            setSaving(true);
            
            console.log("Saving resume data:", updatedData);
            const response = await api.updateResume(resumeId, updatedData);
            
            if (response?.data) {
                // Update local state with the saved changes
                setResumeInfo(response.data);
                return true; // Indicate save success
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error("Error saving resume:", err);
            toast.error("Failed to save resume");
            return false; // Indicate save failure
        } finally {
            setSaving(false);
        }
    };

    // Debounced version of saveResume
    const debouncedSaveResume = useCallback(
        debounce(async (data) => {
            return saveResume(data);
        }, 500),
        [resumeId]
    );

    return (
        <ResumeInfoContext.Provider value={{ 
            resumeInfo, 
            setResumeInfo, 
            saveResume: debouncedSaveResume, 
            saving 
        }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-4 md:p-10 gap-6 md:gap-10'>
                {/* Form Section */}
                <FormSection />
                {/* Preview Section */}
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;