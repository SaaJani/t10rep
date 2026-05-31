import express from 'express';
import StudentController from '../controllers/studentcontroller.js';
import authorize from '../verifytoken.js';
const router = express.Router();

router.get('/', StudentController.findAll);

router.get('/id/:id', authorize, StudentController.findById);
router.get(
  '/studentcode/:studentcode',
  authorize,
  StudentController.findByStudentCode,
);
router.post('/', authorize, StudentController.addStudent);
router.delete('/:id', authorize, StudentController.deleteStudent);
router.put('/:id', authorize, StudentController.updateStudent);
router.get(
  '/studentsbelow/studypoints/:studypoints',
  authorize,
  StudentController.findBelowLimit,
);
router.patch(
  '/addcourse/studentcode/:studentcode',
  authorize,
  StudentController.newCourse,
);
router.patch(
  '/updategrade/studentcode/:studentcode',
  authorize,
  StudentController.updateGrade,
);
router.patch(
  '/deletecourse/studentcode/:studentcode',
  authorize,
  StudentController.deleteCourse,
);
router.get(
  '/findstudentswithcourse/coursecode/:coursecode',
  authorize,
  StudentController.findStudentsWithCourse,
);

export default router;

// router.post('/', authorize, StudentController.addStudent);
