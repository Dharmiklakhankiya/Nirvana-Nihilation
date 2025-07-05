const ResumeModel = {
  title: String,
  firstName: String,
  lastName: String,
  jobTitle: String,
  address: String,
  phone: String,
  email: String,
  summery: String,
  Experience: [
    {
      title: String,
      companyName: String,
      city: String,
      state: String,
      startDate: String,
      endDate: String,
      workSummery: String,
      currentlyWorking: Boolean
    }
  ],
  education: [
    {
      universityName: String,
      degree: String,
      major: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],
  skills: [
    {
      name: String,
      rating: Number
    }
  ],
  themeColor: String,
  createdAt: Date,
  updatedAt: Date
};

export default ResumeModel;
