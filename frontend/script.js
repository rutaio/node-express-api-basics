const API_URL = 'http://localhost:3000/api/students';

document
  .getElementById('get-students-btn')
  .addEventListener('click', async () => {
    const response = await fetch(API_URL);
    const students = await response.json();

    displayStudents(students);
  });

document
  .getElementById('get-student-btn')
  .addEventListener('click', async () => {
    const studentIdValue = document.getElementById('student-id').value;
    const response = await fetch(`${API_URL}/${studentIdValue}`);
    const student = await response.json();

    if (student.error) {
      alert(student.error);
      return;
    }

    displayStudents([student]);
  });

function displayStudents(students) {
  const studentsLists = document.getElementById('students-list');
  studentsLists.innerHTML = '';

  students.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.age}</td>`;
    studentsLists.appendChild(row);
  });
}
