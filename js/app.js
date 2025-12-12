// --- Registration ---
document.addEventListener('DOMContentLoaded', function() {

    // Registration
    let regForm = document.getElementById('registerForm');
    if(regForm){
        regForm.addEventListener('submit', function(e){
            e.preventDefault();
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            let username = document.getElementById('regUsername').value;
            let email = document.getElementById('regEmail').value;
            let password = document.getElementById('regPassword').value;
            let confirmPassword = document.getElementById('regConfirmPassword').value;

            if(password !== confirmPassword){
                alert('Passwords do not match!');
                return;
            }
            if(users.find(u => u.email === email)){
                alert('User already exists!');
                return;
            }
            users.push({username,email,password});
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registered successfully!');
            window.location.href = 'index.html';
        });
    }

    // Login
    let loginForm = document.getElementById('loginForm');
    if(loginForm){
        loginForm.addEventListener('submit', function(e){
            e.preventDefault();
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            let email = document.getElementById('loginEmail').value;
            let password = document.getElementById('loginPassword').value;
            let user = users.find(u => u.email===email && u.password===password);
            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login successful!');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials!');
            }
        });
    }

    // Dashboard
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser && document.getElementById('welcomeMsg')){
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

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', function(){
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });

        // Modal handling for Create Event / Upload Resource
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');

        document.getElementById('createEventBtn').addEventListener('click', function(){
            modal.style.display = 'block';
            modalContent.innerHTML = `
                <h3>Create Event</h3>
                <form id="eventForm">
                    <label>Title</label><input type="text" id="eventTitle" required>
                    <label>Type</label>
                    <select id="eventType">
                        <option>Workshop</option><option>Webinar</option><option>Seminar</option>
                    </select>
                    <label>Date</label><input type="date" id="eventDate" required>
                    <label>Time</label><input type="time" id="eventTime" required>
                    <label>Description</label><textarea id="eventDesc" rows="3" required></textarea>
                    <button type="submit">Create</button>
                </form>
            `;
            document.getElementById('eventForm').addEventListener('submit', function(e){
                e.preventDefault();
                let events = JSON.parse(localStorage.getItem('events') || '[]');
                events.push({
                    title: document.getElementById('eventTitle').value,
                    type: document.getElementById('eventType').value,
                    date: document.getElementById('eventDate').value,
                    time: document.getElementById('eventTime').value,
                    description: document.getElementById('eventDesc').value
                });
                localStorage.setItem('events', JSON.stringify(events));
                alert('Event created!');
                modal.style.display='none';
                location.reload();
            });
        });

        document.getElementById('uploadResourceBtn').addEventListener('click', function(){
            modal.style.display = 'block';
            modalContent.innerHTML = `
                <h3>Upload Resource</h3>
                <form id="resourceForm">
                    <label>Title</label><input type="text" id="resTitle" required>
                    <label>Type</label>
                    <select id="resType">
                        <option>Study Guide</option><option>Article</option><option>Tutorial</option><option>Internship Info</option>
                    </select>
                    <label>Description</label><textarea id="resDesc" rows="3" required></textarea>
                    <button type="submit">Upload</button>
                </form>
            `;
            document.getElementById('resourceForm').addEventListener('submit', function(e){
                e.preventDefault();
                let resources = JSON.parse(localStorage.getItem('resources') || '[]');
                resources.push({
                    title: document.getElementById('resTitle').value,
                    type: document.getElementById('resType').value,
                    description: document.getElementById('resDesc').value
                });
                localStorage.setItem('resources', JSON.stringify(resources));
                alert('Resource uploaded!');
                modal.style.display='none';
                location.reload();
            });
        });

        // Close modal when clicking outside
        window.onclick = function(e){
            if(e.target==modal) modal.style.display='none';
        }
    } else if(document.getElementById('welcomeMsg')){
        alert('Please login first');
        window.location.href='index.html';
    }
});
