window.addEventListener('load', function(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser){
        alert('Please login first');
        window.location.href = '../login/login.html';
        return;
    }
    document.getElementById('welcomeMsg').innerText = `Welcome, ${currentUser.username}!`;

    let events = JSON.parse(localStorage.getItem('events') || '[]');
    let eventsList = document.getElementById('eventsList');
    events.forEach(ev => {
        let li = document.createElement('li');
        li.textContent = `${ev.title} (${ev.type}) on ${ev.date} ${ev.time}`;
        eventsList.appendChild(li);
    });

    let resources = JSON.parse(localStorage.getItem('resources') || '[]');
    let resourcesList = document.getElementById('resourcesList');
    resources.forEach(res => {
        let li = document.createElement('li');
        li.textContent = `${res.title} - ${res.type}`;
        resourcesList.appendChild(li);
    });

    document.getElementById('logoutBtn').addEventListener('click', function(){
        localStorage.removeItem('currentUser');
        window.location.href = '../login/login.html';
    });
});
