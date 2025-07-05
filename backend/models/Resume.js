import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  city: String,
  state: String,
  startDate: String,
  endDate: String,
  workSummery: String,
  currentlyWorking: Boolean
});

const EducationSchema = new mongoose.Schema({
  universityName: String,
  degree: String,
  major: String,
  startDate: String,
  endDate: String,
  description: String
});

const SkillSchema = new mongoose.Schema({
  name: String,
  rating: Number
});

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Untitled Resume'
  },
  
  // Personal details
  firstName: String,
  lastName: String,
  jobTitle: String,
  address: String,
  phone: String,
  email: String,
  
  // Content sections
  summery: String,
  Experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillSchema],
  
  // Theme settings
  themeColor: {
    type: String,
    default: '#6A0DAD' // Default to Royal Purple
  },
  
  // Legacy content field for backward compatibility
  content: {
    type: Object,
    default: {}
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', ResumeSchema);
