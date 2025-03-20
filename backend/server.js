const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

// express.json - reiskia, kad mes galime naudoti .json formata ir is jo issitraukti duomenis:
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API
// Musu laikina duomenu baze:
const students = [
  {
    id: 1,
    name: 'Ruta',
    age: 99,
  },
  {
    id: 2,
    name: 'Mary',
    age: 39,
  },
  {
    id: 3,
    name: 'Sunny',
    age: 29,
  },
];

// GET: turi grazinti visu studentu duomenis
app.get('/api/students', (req, res) => {
  res.json(students);
});

// GET: turi grazinti 1 studento duomenis pagal ID
// :id - reiskia, kad mes gausime ID is URL parametro
// :id - tampa ta reiksme, kurios mes ieskome (id)
// req - request, is zmogaus
// res - response is serverio
app.get('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const studentData = students.find(
    (student) => student.id === Number(studentId)
  );

  if (!studentData) {
    res.status(404).json({ error: 'Studentas nerastas' });
    return;
  }

  res.json(studentData);
});

// Listen - paskutinis failas, kuri paleidziame
app.listen(PORT, () => {
  console.log(`Server is on: http://localhost:${PORT}`);
});
