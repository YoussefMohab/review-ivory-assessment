let token = '';
let currentPollId = null;
let isLogin = false;  // To track the current form (login or register)

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
      pollItem.onclick = () => loadQuestions(poll.id, poll.title);
      pollsList.appendChild(pollItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function loadQuestions(pollId, pollTitle) {
  try {
    const icon = document.createElement('i');
    icon.className = 'fa fa-arrow-left';
    icon.style = "color: black";
    icon.onclick = () => {
      // Go back to the polls section when the icon is clicked
      document.getElementById('polls-section').style.display = 'block';
      document.getElementById('questions-section').style.display = 'none';
    };
    currentPollId = pollId;
    document.getElementById('poll-title').textContent = pollTitle;
    document.getElementById('polls-section').style.display = 'none';
    document.getElementById('questions-section').style.display = 'block';

    const response = await fetch(`${API_URL}/polls/${pollId}/questions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const questions = await response.json();

    const questionsForm = document.getElementById('questions-form');
    questionsForm.innerHTML = '';
    questionsForm.append(icon);
    questions.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `<p>${question.question_text}</p>
        <input type="text" name="${question.id}" placeholder="Your answer">`;
      questionsForm.appendChild(questionDiv);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function submitAnswers() {
  const answers = {};
  const formData = new FormData(document.getElementById('questions-form'));
  formData.forEach((value, key) => {
    answers[key] = value;
  });

  try {
    await fetch(`${API_URL}/polls/${currentPollId}/responses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ responses: answers })
    });
    alert('Responses submitted successfully');
    document.getElementById('questions-section').style.display = 'none';
    document.getElementById('polls-section').style.display = 'block';
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


  
