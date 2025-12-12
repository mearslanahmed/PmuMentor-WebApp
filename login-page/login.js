document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(u => u.email === email && u.password === password);
    if(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = '../dashboard/dashboard.html';
    } else {
        alert('Invalid credentials!');
    }
});
