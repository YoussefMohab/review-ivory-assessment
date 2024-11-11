<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Survey System</title>
  <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>

  <!-- Registration/Login Section -->
  <!-- <section id="auth-section">
    <div class="container">
      <h2>Register or Login</h2>
      <form id="auth-form">
        <input type="text" id="name" placeholder="Name" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit" onclick="authenticate(event)">Register/Login</button>
      </form>
    </div>
  </section> -->

  <section id="auth-section">
    <div class="container">
      <h2 id="auth-title">Register</h2>
      <form id="auth-form">
        <input type="text" id="name" placeholder="Name" required style="display: none;">
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit" onclick="authenticate(event)">Register</button>
      </form>
      <a onclick="toggleAuthForm()"gister>Already have an account? Login</a>
    </div>
  </section>

  <!-- Poll List Section -->
  <section id="polls-section" style="display: none;">
    <div class="container">
      <h2>Survey Topics</h2>
      <h4 style="color: grey;">Please pick any survey topic and answer its questions</h4>
      <ul id="polls-list"></ul>
    </div>
  </section>

  <!-- Questions Section -->
  <section id="questions-section" style="display: none;">
    <div class="container">
      <h2 id="poll-title">Survey Questions</h2>
      <form id="questions-form"></form>
      <button onclick="submitAnswers()">Submit Answers</button>
    </div>
  </section>

  <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>
