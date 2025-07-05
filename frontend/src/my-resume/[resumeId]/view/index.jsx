import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import Header from '@/components/custom/Header';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef();

  useEffect(() => {
    getResumeInfo();
  }, [resumeId]);

  const getResumeInfo = useCallback(async () => {
    let isMounted = true;
    try {
      setLoading(true);
      const response = await api.getResumeById(resumeId);
      const resumeData = response?.data?.data || response?.data || response;
      if (isMounted) {
        setResumeInfo(resumeData || {});
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      if (isMounted) {
        setResumeInfo({});
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [resumeId]);

  useEffect(() => {
    const fetchData = getResumeInfo();
    return () => fetchData;
  }, [getResumeInfo]);

  const handlePreview = () => {
    setIsPreviewMode(true);
  };

  const handleExitPreview = () => {
    setIsPreviewMode(false);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p>Loading resume...</p>
      </div>
    );
  }

  if (isPreviewMode) {
    return (
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <p>Ctrl + P → More settings → Uncheck "Headers and footers" → Preview → Full-screen mode → Print</p>
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-start pt-10 pb-10"
          onClick={handleExitPreview}
        >
          <div
            className="my-10 mx-auto max-w-4xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {resumeInfo ? <ResumePreview isPreviewMode={isPreviewMode} /> : <p>Loading Preview...</p>}
          </div>
        </div>
      </ResumeInfoContext.Provider>
    );
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button 
          onClick={handlePreview}
          className="bg-purple-700 hover:bg-purple-800 text-white"
        >
          <Download className="mr-2 w-4 h-4" />
          Full Screen Preview
        </Button>
      </div>
      <div ref={resumeRef} className="my-10 mx-auto max-w-4xl">
        {resumeInfo ? <ResumePreview isPreviewMode={isPreviewMode} /> : <p>Loading Preview...</p>}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
