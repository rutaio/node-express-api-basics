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

// POST: turi sukurti nauja studenta
app.post('/api/students', (req, res) => {
  // norim issitraukti duomenis, kuriuos mums siunte frontend:
  const { name, age } = req.body;

  // return, kad neskaitytu tolesnio kodo:
  if (!name || !age) {
    return res.status(400).json({ error: 'truksta duomenu!' });
  }

  // sukuriame nauja objekta, kur tie duomenys bus talpinami:
  const newStudent = {
    id: students.length + 1,
    name: name,
    age: age,
  };

  // idedame tuos duomenis i masyva:
  students.push(newStudent);
  res.status(201).json({ message: 'success' });
});

// PUT - turi atnaujinti studento duomenis pagal ID
app.put('/api/students/:id', (req, res) => {
  // 0) priimame "editing uzsakyma" is frontend:
  const studentId = req.params.id;
  const { name, age } = req.body;

  // extra step: validacija - tikrinu ar ivede name ir age:
  if (!name && !age) {
    return res.status(400).json({ error: 'Truksta duomenu!' });
  }

  // 1) susirandame studenta pagal ID, kuri reikia atnaujinti:
  const studentData = students.find(
    (student) => student.id === Number(studentId)
  );

  // 2) uzsidedame validacija, kad jeigu nera tokio ID:
  if (!studentData) {
    return res.status(404).json({ error: 'Studentas toks neegzistuoja' });
  }

  // 3) jei toks ID yra, atnaujiname duomenis:
  studentData.name = name || studentData.name; // jei norim keisti tik age, ir palikt esanti name
  studentData.age = age || studentData.age; // taip pat ir cia

  // 4) issiunciame zinute:
  res.json({ message: 'Studentas sekmingai atnaujintas!' });
});



// Listen - paskutinis failas, kuri paleidziame
app.listen(PORT, () => {
  console.log(`Server is on: http://localhost:${PORT}`);
});
