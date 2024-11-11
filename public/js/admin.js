// let token = '';
// let currentPollId = null;

// // Dummy API endpoints
// const API_URL = 'http://127.0.0.1:8000/api';

// async function authenticate(event) {
//   event.preventDefault();
  
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   try {
//     // Try registering user first
//     let response = await fetch(`${API_URL}/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password })
//     });
    
//     if (!response.ok) {
//       // If registration fails, try login
//       response = await fetch(`${API_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//     }
    
//     const data = await response.json();
//     token = data.token;
//     loadPolls();
//     document.getElementById('auth-section').style.display = 'none';
//     document.getElementById('polls-section').style.display = 'block';

//   } catch (error) {
//     console.error('Error:', error);
//     alert('Authentication failed.');
//   }
// }

// async function loadPolls() {
//   try {
//     const response = await fetch(`${API_URL}/polls`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     const polls = await response.json();
    
//     const pollsList = document.getElementById('polls-list');
//     pollsList.innerHTML = '';
//     polls.forEach(poll => {
//       const pollItem = document.createElement('li');
//       pollItem.textContent = poll.title;
//       pollItem.onclick = () => loadQuestions(poll.id, poll.title);
//       pollsList.appendChild(pollItem);
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async function loadQuestions(pollId, pollTitle) {
//   try {
//     currentPollId = pollId;
//     document.getElementById('poll-title').textContent = pollTitle;
//     document.getElementById('polls-section').style.display = 'none';
//     document.getElementById('questions-section').style.display = 'block';

//     const response = await fetch(`${API_URL}/polls/${pollId}/questions`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     const questions = await response.json();

//     const questionsForm = document.getElementById('questions-form');
//     questionsForm.innerHTML = '';
//     questions.forEach(question => {
//       const questionDiv = document.createElement('div');
//       questionDiv.innerHTML = `<p>${question.question_text}</p>
//         <input type="text" name="${question.id}" placeholder="Your answer">`;
//       questionsForm.appendChild(questionDiv);
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async function submitAnswers() {
//   const answers = {};
//   const formData = new FormData(document.getElementById('questions-form'));
//   formData.forEach((value, key) => {
//     answers[key] = value;
//   });

//   try {
//     await fetch(`${API_URL}/polls/${currentPollId}/responses`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ responses: answers })
//     });
//     alert('Responses submitted successfully');
//     document.getElementById('questions-section').style.display = 'none';
//     document.getElementById('polls-section').style.display = 'block';
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

let token = '';
let currentPollId = null;
let isLogin = false;  // To track the current form (login or register)

// Dummy API endpoints
const API_URL = 'http://127.0.0.1:8000/api';

async function authenticate(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    let response;

    if (isLogin) {
      // Attempt login if the user is on the login form
      response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
    } else {
      // Attempt registration if the user is on the register form
      response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
    }
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    const data = await response.json();
    token = data.token;
    loadPolls();
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('polls-section').style.display = 'block';

  } catch (error) {
    console.error('Error:', error);
    alert('Authentication failed.');
  }
}

async function loadPolls() {
  try {
    const response = await fetch(`${API_URL}/polls`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const polls = await response.json();
    
    const pollsList = document.getElementById('polls-list');
    pollsList.innerHTML = '';
    polls.forEach(poll => {
      const pollItem = document.createElement('li');
      pollItem.textContent = poll.title;
      pollItem.onclick = () => loadResponses(poll.id);
      pollsList.appendChild(pollItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function toggleAuthForm() {
  const authTitle = document.getElementById('auth-title');
  const nameInput = document.getElementById('name');
  const button = document.querySelector('button[type="submit"]');

  if (isLogin) {
    // Switch to the login form
    isLogin = false;
    authTitle.textContent = 'Register';
    nameInput.style.display = 'block';
    button.textContent = 'Register';
    document.querySelector('a').textContent = 'Already have an account? Login';
  } else {
    // Switch to the register form
    isLogin = true;
    authTitle.textContent = 'Login';
    nameInput.style.display = 'none';
    button.textContent = 'Login';
    document.querySelector('a').textContent = 'Don’t have an account? Register';
  }
}


async function loadResponses(pollId) {
    try {
        const response = await fetch(`${API_URL}/polls/${pollId}/responses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const responses = await response.json();

        const responsesTable = document.getElementById('responses-table').querySelector('tbody');
        responsesTable.innerHTML = ''; // Clear previous content
    
        responses.forEach(response => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${response.user.name}</td>
            <td>${response.user.email}</td>
            <td>${response.question.poll.title}</td>
            <td>${response.question.question_text}</td>
            <td>${response.answer_text}</td>
          `;
          responsesTable.appendChild(row);
        });
        document.getElementById('polls-section').style.display = 'none';
        document.getElementById('admin-responses-section').style.display = 'block';
      } catch (error) {
        console.error('Error loading responses:', error);
        alert('Could not load responses.');
      }
  }

  function goBack() {
    // Logic to go back to the previous section or page
    document.getElementById('admin-responses-section').style.display = 'none';
    document.getElementById('polls-section').style.display = 'block';
}
