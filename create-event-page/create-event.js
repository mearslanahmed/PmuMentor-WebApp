document.getElementById('eventForm').addEventListener('submit', function(e){
    e.preventDefault();
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    let event = {
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        description: document.getElementById('description').value
    };
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    alert('Event created successfully!');
    window.location.href = '../dashboard/dashboard.html';
});
