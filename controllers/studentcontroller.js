/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

import Student from '../models/Student.js'; // haetaan model
import newStudentObject from '../NewTestStudentObject.js';

// Tietokannan käsittelymetodit tehdään olion sisään
const StudentController = {
  /* 1) findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  async findAll(req, res) {
    const students = await Student.find().catch((err) => {
      console.error(err);
    });
    // saadaan students-taulukko
    console.log(students);
    // response eli vastaus on json-muotoinen
    res.status(200).send(students);
  },
  async findById(req, res) {
    try {
      // Haetaan opiskelija id:n perusteella
      const student = await Student.findById(req.params.id);

      res.status(200).send(student);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  async findByStudentCode(req, res) {
    try {
      const student = await Student.findOne({
        studentcode: req.params.studentcode,
      });
      res.status(200).send(student);
    } catch (err) {
      console.error(err);
    }
  },

  async addStudent(req, res) {
    try {
      const result = await Student.create(req.body);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
    }
  },

  async deleteStudent(req, res) {
    try {
      const result = await Student.findByIdAndDelete(req.params.id);

      res.status(200).send(result);
    } catch (err) {
      console.error(err);
    }
  },

  async updateStudent(req, res) {
    try {
      const result = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
    }
  },

  async findBelowLimit(req, res) {
    try {
      const students = await Student.find({
        studypoints: { $lte: req.params.studypoints },
      });
      res.status(200).send(students);
    } catch (err) {
      console.error(err);
    }
  },

  async newCourse(req, res) {
    try {
      const result = await Student.updateOne(
        {
          studentcode: req.params.studentcode,
        },
        {
          $inc: { studypoints: 5 },
          $push: { grades: { coursecode: 'HTK-8881', grade: 5 } },
        },
      );

      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Virhe lisättäessä kurssia');
    }
  },

  async updateGrade(req, res) {
    try {
      const result = await Student.updateOne(
        {
          studentcode: req.params.studentcode,
          'grades.coursecode': 'HTK-8881',
        },
        {
          $set: { 'grades.$.grade': 3 },
        },
      );

      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Virhe muutettaessa arvosanaa!');
    }
  },

  // Alla oleva tehty tekoälyllä
  async deleteCourse(req, res) {
    try {
      const result = await Student.updateOne(
        { studentcode: req.params.studentcode }, // 1. Etsi oikea opiskelija
        { $pull: { grades: { _id: '69f662318facef106597c311' } } }, // 2. Poista arvosana-taulukosta se kurssi, jolla on tämä id
      );

      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Virhe poistettaessa kurssia!');
    }
  },

  async findStudentsWithCourse(req, res) {
    try {
      const result = await Student.find({
        grades: { $elemMatch: { coursecode: req.params.coursecode } },
      });
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Virhe haettaessa oppilaita!');
    }
  },
};

export default StudentController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:
 
router.get('/', StudentController.findAll);
 
jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
