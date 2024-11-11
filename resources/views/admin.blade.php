<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Poll System</title>
  <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
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
      <h2>Polls</h2>
      <ul id="polls-list"></ul>
    </div>
  </section>

  <!-- Questions Section -->
  <section id="questions-section" style="display: none;">
    <div class="container">
      <h2 id="poll-title">Poll Questions</h2>
      <form id="questions-form"></form>
      <!-- <button onclick="submitAnswers()">Submit Answers</button> -->
    </div>
  </section>

  <section id="admin-responses-section" style="display: none;">
  <div class="container">
    <h2>All Responses</h2>
    <i class="fa fa-arrow-left" style="color: black;" onClick="goBack()"></i>
    <table id="responses-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Poll</th>
          <th>Question</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</section>

  <script src="{{ asset('js/admin.js') }}"></script>
</body>
</html>