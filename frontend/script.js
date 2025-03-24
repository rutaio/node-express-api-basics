const API_URL = 'http://localhost:3000/api/students';

document
  .getElementById('get-students-btn')
  .addEventListener('click', async () => {
    const response = await fetch(API_URL);
    const students = await response.json();

    displayStudents(students);
  });

// get:
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

// add:
document
  .getElementById('add-student-btn')
  .addEventListener('click', async () => {
    const name = document.getElementById('new-student-name').value;
    const age = document.getElementById('new-student-age').value;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        age: age,
      }),
    });
  });

// edit:
document
  .getElementById('update-student-btn')
  .addEventListener('click', async () => {
    const id = document.getElementById('update-student-id').value;
    const name = document.getElementById('update-student-name').value;
    const age = document.getElementById('update-student-age').value;
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        age: age,
      }),
    });
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
