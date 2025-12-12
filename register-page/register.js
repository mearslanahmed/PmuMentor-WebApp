document.getElementById('registerForm').addEventListener('submit', function(e){
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if(password !== confirmPassword){
        alert('Passwords do not match!');
        return;
    }
    if(users.find(u => u.email === email)){
        alert('User already exists!');
        return;
    }
    users.push({username, email, password});
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully!');
    window.location.href = '../login/login.html';
});
