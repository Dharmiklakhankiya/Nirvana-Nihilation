import { Loader2Icon, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

// 💀 Goodbye GlobalApi. We speak fetch now. 💀
function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 Delete resume using custom API
  const onDelete = async () => {
    if (!resume?.documentId) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/resumes/${resume.documentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume. Get wrecked.');
      }

      toast('Resume Deleted!');
      refreshData(); // 👈 Refresh the data after deleting
    } catch (error) {
      console.error('Error deleting resume:', error);
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  return (
    <div className=''>
      {/* ➡️ Clicking this opens the resume for editing */}
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4'
          style={{ borderColor: resume?.themeColor }}
        >
          <div className='flex items-center justify-center h-[180px]'>
            <img src="/cv.png" width={80} height={80} alt="Resume Icon" />
          </div>
        </div>
      </Link>

      {/* ➡️ Resume title and actions */}
      <div
        className='border p-3 flex justify-between text-white rounded-b-lg shadow-lg'
        style={{ background: resume?.themeColor }}
      >
        <h2 className='text-sm'>{resume.title}</h2>

        {/* ➡️ Dropdown for Edit, View, Download, Delete */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ➡️ Alert Dialog for confirming deletion */}
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
