//Student-dokumentin skeema
import mongoose from 'mongoose';
import GradeSchema from './Grade.js'; //Alidokumentin skeema

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const StudentSchema = new mongoose.Schema({
  studentcode: {
    /* Määritykset tänne */
    type: String,
    required: true,
    trim: true,
    match: /^[a-z]\d{4}$/, // e.g. t1234
    unique: true,
  },
  name: {
    /* Määritykset tänne */
    type: String,
    required: true,
    trim: true,
  },
  email: {
    /* Määritykset tänne */
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  studypoints: {
    /* Määritykset tänne */
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  grades: { type: [GradeSchema], required: true }, //Alidokumentin tyyppinä on sen skeema
});

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisältää skeeman
const Student = mongoose.model('Student', StudentSchema);
// exportataan model
export default Student;
