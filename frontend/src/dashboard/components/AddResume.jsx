import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

// 🔥 Goodbye Strapi. Hello Custom API Endpoint 🔥
// Example API endpoint: POST /api/resumes -> creates new resume

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🚀 Create resume by POSTing to your custom API
  const onCreate = async () => {
    if (!resumeTitle) return; // Don't waste server energy

    setLoading(true);

    const uuid = uuidv4();
    const newResume = {
      title: resumeTitle,
      resumeId: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResume),
      });

      if (!response.ok) {
        throw new Error('Failed to create resume. Cry harder.');
      }

      const responseData = await response.json();

      // 🔥 Redirect to the newly created resume's edit page
      setLoading(false);
      navigate(`/dashboard/resume/${responseData.documentId}/edit`);
    } catch (error) {
      console.error('Error creating resume:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ➡️ Big Sexy Button to open the Dialog */}
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      {/* ➡️ Dialog for adding a new resume */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
