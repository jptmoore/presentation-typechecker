document.getElementById('jsonForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const jsonData = document.getElementById('jsonData').value;

    fetch('/pretty-print', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jsonData })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('prettyJson').value = data;
    })
    .catch(error => {
        document.getElementById('prettyJson').value = 'Error: ' + error;
    });
});