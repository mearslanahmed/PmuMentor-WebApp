document.getElementById('resourceForm').addEventListener('submit', function(e){
    e.preventDefault();
    let resources = JSON.parse(localStorage.getItem('resources') || '[]');
    let resource = {
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        description: document.getElementById('description').value,
        fileName: document.getElementById('file').files[0]?.name || ''
    };
    resources.push(resource);
    localStorage.setItem('resources', JSON.stringify(resources));
    alert('Resource uploaded successfully!');
    window.location.href = '../dashboard/dashboard.html';
});
