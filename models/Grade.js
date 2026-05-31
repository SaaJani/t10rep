// Grades-alidokumentin skeema
import mongoose from 'mongoose';

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const GradeSchema = new mongoose.Schema({
  coursecode: {
    /* Määritykset tänne */
    type: String,
    required: true,
    match: /^[A-Za-z]{3}-\d{4}$/,
    uppercase: true,
    trim: true,
    unique: true,
  },
  grade: {
    /* Määritykset tänne */
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

// Skeema exportataan sellaisenaan ja model luodaan Student.js-tiedostossa
export default GradeSchema;
