import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: String,
  endDate: String,
  current: Boolean,
  description: String
});

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  field: String,
  startDate: String,
  endDate: String,
  current: Boolean
});

const cvSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    website: String
  },
  summary: String,
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [String],
  template: {
    type: String,
    default: 'modern'
  }
}, {
  timestamps: true
});

const CV = mongoose.model('CV', cvSchema);
export default CV;
